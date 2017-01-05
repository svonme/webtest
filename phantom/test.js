import createPhantomPool from 'phantom-pool';
//登录模块
import Login from "./login";
//抓图
import capture from "./capture";

import cheerio from 'cheerio';
import fs from "fs";
import path from "path";

let routers = [];

// 连接池
const pool = createPhantomPool({
    max: 10, // 最多 10 个
    min: 2,  // 最少 2  个
    idleTimeoutMillis: 30000, // 空闲时间
});



function main(home, log, callback){
    //入口地址
    pool.use( instance => {
        const login = new Login(instance, log);
        let loginStatus;
        return new Promise(async function(resolve){
            const page = await login.start(home, async function(res, fill){
                if(!loginStatus){
                    loginStatus = true; //标识登录成功
                    log.text("登录成功 !!!!");
                    const content = await this.property('content');
                    return resolve({ content, res, page : this });
                }
            });
        });
    }).then(function({ content, res, page }){
        log.text("分析页面数据 开始抓取模块路由数据");
        let $ = cheerio.load(content);
        let $menu = $(".side-menu","#sidebar-menu");
        let $as = $("a",$menu);
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
        log.text("抓取完毕，即将输出到页面中，提供给模块测试");
        return { 
            "page" : page,
            "router" : routers
        };
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
        };
        const _console = this.console;
        this.log = {};
        Object.keys(_console).forEach(key => {
            this.log[key] = function(...args){
                _console[key].forEach( item => item(...args));
            };
        });
    }
    
    async phStart({ url }){
        this.log.info(`开始测试 ： ${url}`);
        return new Promise((resolve)=>{
            new main(url, this.log, (res)=>{
                const { page } = res;
                this.page = page;
                resolve(res);
            });
        });
    }
    async phSave(){
        if(this.page){
            return new capture(this.page, this.log);
        }else{
            return false;
        }
    }
    async phStop(){
        await pool.drain();
        await pool.clear();
        return true;
    }
    async phModuleChange(module){
        const that = this;
        this.log.text(`测试模块 ： ${module}`);
        if(this.page){
            let filePath = path.join(__dirname,`modules/${module}`);
            this.page.evaluate(function(key, r){
                // 通过修改 hash 值来切换路由
                // 添加一个随机数，避免页面不重新加载资源
                window.location.hash = "#/" + key + "?random=" + r;
            }, module, parseInt(Math.random() * 10000, 10));

            fs.exists(filePath, function(exists){
                if(exists){
                    const module = require(filePath);
                    // new module(info, page);
                }else{
                    that.log.info(`模块 ${module} 没有对应的测试脚本, 无法单元测试，目前只能保存快照`);
                }
            });
        }else{
            return false;
        }
        
    }    
}




// function task(page){
//     let url = routers.shift();
//     if(url){
//         console.log({
//             "type" : "text",
//             "text" : `开始测试 url ${url}`
//         });
//         page.evaluate(function(key, r){
//             window['console']['log']("key : ", key, "random : ", r);
//             window['console']['log']("准备切换页面");
//             window.location.hash = "#/" + key + "?random=" + r;
//         },url, parseInt(Math.random() * 10000, 10));
//     } else {
//         (async function(){
//             await pool.drain();
//             await pool.clear();
//         })();
//     }
// }