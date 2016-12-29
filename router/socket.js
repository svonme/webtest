import { phantom } from "./phantom"

class IO{
	constructor(socket, io){
		this.socket = socket;
		this.io = io;

		//接收查询数据事件
	  	socket.on("get/data",  ()=>{
	  		//向客户端推送消息
		    this.getMessage({
		    	type : "text",
		    	text : "hello world"
		    });
		});
		//开始测试
	  	socket.on("phantom/start",  (data) => {
	  		setTimeout(()=>{
	  			let ph = new phantom( message =>{
	  				this.message(message);
	  			});
	  			ph.start(data);
	  		}, 0);
	  		return true;
		});

		//开始测试
	  	socket.on("phantom/stop", () => {
	  		return true;
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