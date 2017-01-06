import createPhantomPool from 'phantom-pool';
//登录模块
import Login from "./login";
//抓图
import capture from "./capture";

import cheerio from 'cheerio';
import fs from "fs";
import path from "path";
import _Url from "url";

let routers = [];

// 连接池
const pool = createPhantomPool({
    max: 10, // 最多 10 个
    min: 2,  // 最少 2  个
    idleTimeoutMillis: 30000, // 空闲时间
});



function main(url, log, callback){
    //入口地址
    pool.use( async instance => {
        const login = new Login(instance, log);
        const page = await login.start(url);
        return page
    }).then(function(res){
        callback(res);
    }).catch(async function(e){
        //关闭测试环境
        await pool.drain();
        await pool.clear();
    });
}

export class test{
    constructor(){
        this.console = {
            text    : [],
            info    : [],
            error   : [],
            network : [],
            loadStarted : [],
            loadFinished : [],
            stop : [],
            next : [],
            save : []
        };
        const _console = this.console;
        this.log = {};
        Object.keys(_console).forEach(key => {
            this.log[key] = function(...args){
                _console[key].forEach( item => item(...args));
            };
        });
    }
    //开始测试
    async phStart({ url }){
        this.log.info(`开始测试 ： ${url}`);
        return new Promise((resolve)=>{
            new main(url, this.log, (res)=>{
                if(res){
                    this.page = res;
                }
                resolve(!!res);
            });
        });
    }
    //保存快照信息
    async phSave(){
        if(this.page){
            return new capture(this.page, this.log);
        }else{
            return false;
        }
    }
    //停止测试
    async phStop(){
        await pool.drain();
        await pool.clear();
        return true;
    }
    //切换路由模块
    async phModuleChange(module){
        const that = this;
        this.log.text(`测试模块 ： ${module}`);
        if(this.page){
            let filePath = path.join(__dirname,`../modules/${module}`);
            let info = await that.getInfo();
            let { query = {} } = info['router'];
            let search = "?random=" + parseInt(Math.random() * 10000, 10);
            Object.keys(query).forEach(function(key){
                if(key != "random"){
                    search += `&${key}=${query[key]}`;
                }
            });
            this.page.evaluate(function(key, r){
                // 通过修改 hash 值来切换路由
                // 添加一个随机数，避免页面不重新加载资源
                window.location.hash = "#/" + key + r;
            }, module, search);
            fs.exists(`${filePath}.js`, function(exists){
                if(exists){
                    setTimeout(async function(){
                        that.log.info(`模块 ${module} 加载完毕，开始执行测试用列`);
                        //延迟 1 秒 等待页面切换完毕
                        const moduleUnit = new require(filePath);
                        moduleUnit(info, that.log, that.page);
                    }, 1000);
                }else{
                    that.log.info(`模块 ${module} 没有对应的测试脚本, 无法单元测试，目前只能保存快照`);
                }
            });
        }else{
            return false;
        }
    }    
    //登录模块
    phLogin(username, password){
        if(this.page){
            this.log.info("模拟登录");
            this.log.info(`用户名 : ${username}  密码 : ${password}`);
            this.page.evaluate(function(name, pass){
                window['$'](function(){
                    document.querySelector("#username").value = name;
                    document.querySelector("#password").value = pass;
                    console.log("开始模拟登录");
                    var _Login = window['Login'];
                    var _login = new _Login('#username' , '#password' , '#loginSubmit');
                    //模拟登陆
                    _login.getData();
                });
            }, username, password);
        }else{
            this.log.error(`模块加载错误，请稍候再试`);
        }
    }
    //获取页面路由模块
    phGetRouter(){
        return new Promise(async (resolve)=>{
           if(this.page){
                const content = await this.page.property('content');
                this.log.text("分析页面数据 开始抓取模块路由数据");
                let $ = cheerio.load(content);
                let $menu = $(".side-menu","#sidebar-menu");
                let $as = $("a", $menu);
                //把所有的路由地址获取到
                $as.each(function(i,ele){
                    let href = $as.eq(i).attr('href') || void 0;
                    if(href){
                        routers.push({
                            "hash" : href.replace(/^#+\//,""),
                            "text" : $as.eq(i).text()
                        });
                    }
                });
                this.log.text("抓取完毕，即将输出到页面中，提供给模块测试");
                resolve(routers);
            }else{
                this.log.error(`模块加载错误，请稍候再试`);
                resolve(false);
            }
        });
    }
    async getInfo(){
        if(this.page){
            let href = await this.page.property('url');
            let size = await this.page.property('viewportSize');
            let location = _Url.parse(href, true);
            let hash = location['hash'] || "";
            hash = hash.replace(/^#+\//,"");
            let router = _Url.parse(hash, true);
            return { location, router };
        }
        return void 0;
    }
}


