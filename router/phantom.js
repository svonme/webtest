import { spawn } from "child_process";

class phantom{
	constructor(message){
		this.message = message
	}
	async start({ url }){
		this.message({
			type : "text",
			text :　`开始测试 测试地址为 : ${url}`
		});
		const test = spawn('node', ['--harmony','./bin/test.js',url]);
		test.stdout.on('data', (data) => {
			//输出测试时打印的日志
		  	this.message(data.toString());
		});

		test.stderr.on('data', (data) => {
			console.log("error : ",data.toString());
		});

		test.on('close', (code) => {
		  	this.message({
				type : "text",
				text : `网页 ${url} 测试完毕`
			});
		  	this.stop();
		});
	}
	async stop(){
		this.message({
			type : "text",
			text : "停止测试"
		});
	}
}

export { phantom };