import { phantom } from "./phantom"
import { createpdf } from "./createpdf";

class IO extends phantom{
	constructor(socket, io){
		super();
		this.socket = socket;
		this.io = io;
		let logs = {};

		let curModule;

		function createLog(module = "main"){
			curModule = module;
			if(module in logs){
				return logs[module];
			}else{
				logs[module] = {
					"text" : [],          //消息日志
					"info" : [],          //重要的测试日志
					"error": [],          //错误日志
					"network"      : [],  //网络资源
					"loadStarted"  : [],  //请求开始时间
					"loadFinished" : []   //请求结束时间
				};
				return logs[module];
			}
		}
		

	  	// 监听日志输出
		this.on('text', message => {
			this.messageText(message);
			logs[curModule].text.push(message);
		});
		this.on('info', message => {
			this.messageInfo(message);
			logs[curModule].info.push(message);
		});
		this.on('network', message => {
			this.messageNetwork(message);
			logs[curModule].network.push(message);
		});

		this.on('error', message => {
			this.messageError(message);
			logs[curModule].error.push(message);
		});

		this.on('loadStarted', (time, url) => {
			this.messageLoadStarted(time, url);
			logs[curModule].loadStarted.push(time);
		});
		this.on('loadFinished', (time, url) => {
			this.messageLoadFinished(time, url);
			logs[curModule].loadFinished.push(time);
		});

		let routerData = [];

		//开始测试
	  	socket.on("phantom/start",  (data) => {
	  		createLog();
  			this.phStart(data).then(({page, router})=>{
				this.socket.emit("router", router);
				routerData.push(...router);
			});
	  		return true;
		});

		//停止测试
	  	socket.on("phantom/stop", () => {
	  		this.phStop().then(()=>{
			    this.socket.emit("message/text", "测试服务已经停止");
	  		});
	  		return true;
		});
		//准备保存
	  	socket.on("page/save", () => {
			this.messageText("准备快照与把相信信息输出到 pdf 文件");
	  		this.phSave().then( info => {
	  			if(info === false){
	  				this.messageError("测试出问题了，上一次的未停止，请稍候再试");
	  			}else{
		 			new createpdf(info, logs[curModule], routerData).then( path => {
			  			// Object.keys(logs).map(key => logs[key] = []);
						this.messageInfo({
							"type" : "pdf",
							"url" : path
						});
			  		});
	  			}
	  		});
		});

		socket.on('module/change',  module =>{
			createLog(module);
			this.phModuleChange(module);
		});
	}
	messageError(message){
		this.socket.emit("message/error", message);
	}
	messageText(message){
		this.socket.emit("message/text", message);
	}
	messageInfo(message){
		this.socket.emit("message/info", message);
	}
	messageNetwork(message){
		this.socket.emit("message/network", message);
	}
	messageLoadStarted(time, url){
		this.socket.emit("message/loadStarted", {
			time : time,
			url  : url
		});
	}
	messageLoadFinished(time, url){
		this.socket.emit("message/loadFinished", {
			time : time,
			url  : url
		});
	}

}



export default function(io){
	io.on('connection', function (socket) {
	 	new IO(socket, io);
	});
};