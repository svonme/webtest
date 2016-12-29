import express from "express";
import swig from "swig";
import path from "path";
import bodyparser from "body-parser";
import { tidy } from "htmltidy";
import { Test } from "./router/test";

import socket from "socket.io";
import http from 'http';

const NODE_ENV = process.env.NODE_ENV || "development";
const port = process.env.port || 8080;

const app = new express();
const server = http.Server(app);
require('./router/socket')(socket(server));

//获取当前运行的目录
const cwd = process.cwd();

app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({
	limit: "50mb",
	extended: true
}));

//配置 swig
swig.setDefaults({
	autoescape : false,
  	cache : false 
});
app.engine('swig', (src, option, callback)=>{
	let opt = Object.assign({}, option);
	swig.renderFile(src, opt, (error, html) => {
		if(error){
			callback(error, html);
		}else{
			let opts = {
			    doctype: 'html5',
			    //隐藏注释，一定要设置为 false，否则 ie 的 hack 就会自动被过滤
			    hideComments: false,
			    //缩进
			    indent: true
			};
			// callback(error, html);
			try{
				tidy(html, opts, callback);
			}catch(e){
				callback(error, html);
			}
		}
	});
});

//设置 cms 后台管理系统路由
app.use(new Test());


//设置 页面的后缀  配置 render 输出文件的默认后缀
app.set('view engine', 'swig');
//设置 页面的 跟目录  配置 render 输出文件的 根目录
app.set("views",path.join(cwd, "views"));

//影射静态资源
app.use("/develop", express.static(path.join(cwd, "develop")));
app.use("/save", express.static(path.join(cwd, "save")));


//开启端口
server.listen(port, "0.0.0.0",() => {
	console.log(`open http://127.0.0.1:${port}`);
});