import { phantom } from "./phantom"
import { createpdf } from "./createpdf";

class IO extends phantom{
	constructor(socket, io){
		super();
		this.socket = socket;
		this.io = io;
		
		let logs = [];

		//开始测试
	  	socket.on("phantom/start",  (data) => {
  			this.phStart(data).then(({page, router})=>{
				this.socket.emit("router", router);
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

	  	// 监听日志输出
		this.on('text', message => {
			this.messageText(message);
			logs.push(message);
		});
		this.on('info', message => {
			this.messageInfo(message);
			logs.push(message);
		});
		this.on('network', message => {
			this.messageNetwork(message);
			logs.push(message);
		});

		this.on('loadStarted', (page, url, time) => {
			this.messageLoadStarted(page, url, time);
		});
		this.on('loadFinished', (page, url, time) => {
			this.messageLoadFinished(page, url, time);
		});

		//准备保存
	  	socket.on("page/save", () => {
			this.messageText("准备快照与把相信信息输出到 pdf 文件");
	  		this.phSave().then( info => {
	  			new createpdf(info, logs).then( path => {
		  			logs = [];
					this.messageInfo({
						"type" : "pdf",
						"url" : path
					});
		  		});
	  		});
		});
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
	messageLoadStarted(page, url, time){
		this.socket.emit("message/loadStarted", {
			url  : url, 
			time : time
		});
	}
	messageLoadFinished(page, url, time){
		this.socket.emit("message/loadFinished", {
			url  : url, 
			time : time
		});
	}

}



export default function(io){
	io.on('connection', function (socket) {
	 	new IO(socket, io);
	});
};