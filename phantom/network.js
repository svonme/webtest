import saveImage from "./saveImage";

class network{
	constructor(page, log, option){
		let { stop } = option;
		let res = {};
		let list = [];
		let success = [];
		let delayId; //延迟队列 id

		//获取开始请求的时间
		//如果没有传入参数，将默认使用调用该方法时的时间
		async function onLoadStarted(time = new Date().getTime(), url){
			url || (url = await page.property('url'));
	    	log.loadStarted(time, url);
		}
		//获取结束时间
		async function onLoadFinished(time = new Date().getTime(), url){
			url || (url = await page.property('url'));
	    	log.loadFinished(time, url);
		}
		
		//网络请求开始
		page.on("onResourceRequested", function(requestData) {
			let { id, url } = requestData;
	        res[id] = {
	        	"id"  : id,
	        	"url" : url,
	        	"startTime" : new Date().getTime()
	        };
	        list.push(requestData.id);
	    });
	    //网络请求结束
	    page.on("onResourceReceived", async function(received) {
	    	let { id, stage = "" } = received;
	    	let time = new Date().getTime();
		    switch(stage + ""){
		    	// case "start":
		    	// 	res[id]['startTime'] = time;
		    	// 	break;
		    	case "end":
		    		res[id]['endTime'] = time;
		    		success.push(received.id);
		    		break;
		    	default:
		    		break;
		    }
		    // 有新的请求进来
		    // 删除前面的队列
		    clearTimeout(delayId);
	     	if(stage == "end"){
		        log.network(res[id]);
	     		// let loading = await page.property('loading');
	     		if(success.length == list.length){
	        		//准备延迟 2 秒后加载网页
	        		delayId = setTimeout(function(){
	        			onLoadFinished(time);
	        			//执行回调函数
	        			stop.call(page, res, "finished"); //页面加载完
	        		},2000);
	        	}
	     	}
	    });

	    // page.on('onLoadStarted',async function(){
	    // 	let time = new Date().getTime();
	    // 	let url = await page.property('url');
	    // 	log.loadStarted(page, url, time);
	    // });
	    // page.on('onLoadFinished',async function(){

	    // });
	    
	    //当发生 url 变化时 触发一次，表示开始请求了
	    page.on('onUrlChanged',async function(url){
	    	onLoadStarted(void 0, url); //进来时默认调用一次，表示网络开始加载
	    });
	    
	    const that = this;
	    //消息输出
	    page.on('onConsoleMessage', function(msg, lineNum, sourceId){
	    	//约定内容
	    	switch(msg){
	    		case "stop":
                    //执行回调函数
	        		stop.call(page, res, "stop");
                    break;
                case "next":
                	//执行下一个测试
	        		stop.call(page, res, "next");
	        		break;
                default:
                	if(msg instanceof Object){
						msg = JSON.stringify(msg);	
					}
                	log.text(`页面控制台输入内容 : ${msg}`);
                	break;
	    	}
	    });
	    //程序错误日志
	    page.on("onError",  (msg, trace) =>{
	    	let msgStack = [msg];
			if (trace && trace.length) {
				msgStack.push("跟踪:");
				trace.forEach(function(t) {
					let { file, line, function : fun = "" } = t;
					msgStack.push(`&nbsp;&nbsp;&nbsp;-> ${file} : ${line}` + (fun && `in function : ${fun}`));
				});
			}
			// console.log(trace);
	    	log.error(msgStack.join("<br/>"));
	    });
	    
	}
	
}

export default network;