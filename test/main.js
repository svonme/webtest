import createPhantomPool from 'phantom-pool';
//登录模块
import Login from "./login";
//抓图
import capture from "./capture";

import consoler from 'consoler';
import cheerio from 'cheerio';
import fs from "fs";

let routers = [];

// 连接池
const pool = createPhantomPool({
    max: 10, // 最多 10 个
    min: 2,  // 最少 2  个
    idleTimeoutMillis: 30000, // 空闲时间
});

function task(page){
    let url = routers.shift();
    if(url){
        consoler.loading("开始测试 url " + url);
        page.evaluate(function(key, r){
            console.log("key : ", key, "random : ", r);
            console.log("准备切换页面");
            window.location.hash = "#/" + key + "?random=" + r;
        },url, parseInt(Math.random() * 10000, 10));
    } else {
        (async function(){
            await pool.drain();
            await pool.clear();
        })();
    }
}

function main(home){
    //入口地址
    pool.use( instance => {
        const login = new Login(instance);
        let loginStatus;
        return new Promise(async function(resolve){
            const page = await login.start(home, async function(res, fill){
                if(!loginStatus){
                    loginStatus = true; //标识登录成功
                    consoler.success("登录成功 !!!!");
                    const content = await page.property('content');
                    return resolve({ content, res, page });
                }
                // 
                switch(fill){
                    case "next":
                        consoler.loading("测试下一个页面");
                        task(page); //执行任务
                        break;
                    case "stop":
                        //当前模块测试完毕
                        consoler.success(`页面测试完毕`);
                        resolve();
                        break;
                    default:
                        new capture(this).then(async function(info){
                            // curInfo = Object.assign({}, info);
                            let { pathname : moduleName } = info['router'];
                            console.log("准备加载模块 %s, 开始测试该模块", moduleName);
                            // console.log(info);
                            console.log("image : ", info['image']);
                            let filePath = `../modules/${moduleName}`;
                            fs.exists(filePath, function(exists){
                                if(exists){
                                    const module = require(filePath);
                                    new module(info, page);
                                }else{
                                    console.log("没有对应的测试脚本 %s", moduleName);
                                    consoler.loading("测试下一个页面");
                                    task(page); //执行任务
                                }
                            });
                        });
                        break;
                }
            });
            page.property('url').then(function(url){
                console.log("当前 url : ", url);
            });
        });
    }).then(function({ content, res, page }){
        let $ = cheerio.load(content);
        let $menu = $(".side-menu","#sidebar-menu");
        let $as = $("a",$menu);
       
        //把所有的路由地址获取到
        $as.each(function(i,ele){
            let href = $as.eq(i).attr('href') || void 0;
            if(href){
                routers.push(href.replace(/^#+\//,""));
            }
        });
        task(page); //执行任务
    }).catch(async function(e){
        console.log(e);
        //关闭测试环境
        await pool.drain();
        await pool.clear();
    });
}

console.log("11111");
main('http://192.168.1.227:8080/index_82c7ee8.html');



 
