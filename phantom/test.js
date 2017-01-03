import createPhantomPool from 'phantom-pool';
//登录模块
import Login from "./login";
//抓图
import capture from "./capture";

import cheerio from 'cheerio';
import fs from "fs";

let routers = [];

// 连接池
const pool = createPhantomPool({
    max: 10, // 最多 10 个
    min: 2,  // 最少 2  个
    idleTimeoutMillis: 30000, // 空闲时间
});

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
                // // 
                // switch(fill){
                //     case "next":
                //         log({
                //             "type" : "text",
                //             "text" : "测试下一个页面"
                //         });
                //         task(page); //执行任务
                //         break;
                //     case "stop":
                //         //当前模块测试完毕
                //         log({
                //             "type" : "text",
                //             "text" : "页面测试完毕"
                //         });
                //         resolve();
                //         break;
                //     default:
                        // new capture(this).then(async function(info){
                        //     // curInfo = Object.assign({}, info);
                        //     let { pathname : moduleName } = info['router'];
                        //     log({
                        //         "type" : "text",
                        //         "text" : `准备加载模块 ${moduleName}, 开始测试该模块`
                        //     });
                        //     log({
                        //         "type" : "info",
                        //         "info" : info
                        //     });
                        //     log({
                        //         "type" : "text",
                        //         "text" : `image : ${info['image']}`
                        //     });
                        //     let filePath = `../modules/${moduleName}`;
                        //     fs.exists(filePath, function(exists){
                        //         if(exists){
                        //             const module = require(filePath);
                        //             new module(info, page);
                        //         }else{
                        //             log({
                        //                 "type" : "text",
                        //                 "text" : `没有对应的测试脚本 ${moduleName}`
                        //             });
                        //             log({
                        //                 "type" : "text",
                        //                 "text" : "测试下一个页面"
                        //             });
                        //             task(page); //执行任务
                        //         }
                        //     });
                        // });
                //         break;
                // }
            });
            // page.property('url').then(function(url){
            //     log({
            //         "type" : "text",
            //         "text" : `当前 url : ${url}`
            //     });
            // });
        });
    }).then(function({ content, res, page }){
        log.text("分析页面数据 检索路由");
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
        // task(page); //执行任务
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
            text     : [],
            info    : [],
            network : [],
            loadStarted : [],
            loadFinished : [],
        };
        const console = this.console;
        this.log = {};
        Object.keys(console).forEach(key => {
            this.log[key] = function(...args){
                console[key].forEach( item => item(...args));
            };
        });
    }
    
    async phStart({ url }){
        this.log.text(`开始测试 ： ${url}`);
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
    
}


