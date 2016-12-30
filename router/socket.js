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
	  			this.getMessage({
			    	type : "text",
			    	text : "测试服务已经停止"
			    });
	  		});
	  		return true;
		});

	  	// 监听日志输出
		this.on('console',(message)=>{
			// console.log(message);
			this.message(message);
			logs.push(message);
		});

		//准备保存
	  	socket.on("page/save", () => {
			this.message({
				"type" : "text",
				"text" : "准备快照与把相信信息输出到 pdf 文件"
			});
	  		this.phSave().then( info => {
	  			new createpdf(info, logs).then( path => {
		  			logs = [];
					this.message({
						"type" : "pdf",
						"url" : path
					});
		  		});
	  		});
		});
	}
	//重写 phantom 消息输出日志
	message(message){
		this.getMessage(message);
	}
	getMessage(data){
		this.socket.emit("get/message", data);
	}

}

export default function(io){
	io.on('connection', function (socket) {
	 	new IO(socket, io);
	});
};