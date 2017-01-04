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
		function onLoadStarted(time = new Date().getTime()){
	    	log.loadStarted(time);
		}
		//获取结束时间
		function onLoadFinished(time = new Date().getTime()){
	    	log.loadFinished(time);
		}
		onLoadStarted(); //进来时默认调用一次，表示网络开始加载

		page.on("onResourceRequested", function(requestData) {
			let { id, url } = requestData;
	        res[id] = {
	        	"id"  : id,
	        	"url" : url,
	        	"startTime" : new Date().getTime()
	        };
	        list.push(requestData.id);
	    });
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
                	log.text("页面控制台输入内容 : " + (typeof msg == "object" ? JSON.stringify(msg) : msg));
                	break;
	    	}
	        
	    });
	}
	
}

export default network;