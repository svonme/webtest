import { phantom } from "./phantom"

class IO extends phantom{
	constructor(socket, io){
		super();
		this.socket = socket;
		this.io = io;

		
		//开始测试
	  	socket.on("phantom/start",  (data) => {
  			this.phStart(data).then(({page, router})=>{
				this.socket.emit("router", router);
			});
	  		return true;
		});

		//开始测试
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