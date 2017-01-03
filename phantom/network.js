import saveImage from "./saveImage";

class network{
	constructor(page, log, option){
		let { stop } = option;
		let res = [];
		let list = [];
		let success = [];

		let delayId; //延迟队列 id

		page.on("onResourceRequested", function(requestData) {
	        res.push(requestData);
	        list.push(requestData.id);
	        let { id, url } = requestData;
	        log.network({
                "id"   : id,
                "url"  : url
            });
	    });
	    page.on("onResourceReceived", async function(received) {
	     //    if (received.stage === 'start') {
		    // }
		    // 有新的请求进来
		    // 删除前面的队列
		    // clearTimeout(delayId);
	     //    if (received.stage === 'end') {
	     //    	success.push(received.id);
	     //    	if(success.length == list.length){
	     //    		log({
		    //             "type" : "text",
		    //             "text" : "received ok : 即将调用回调函数"
		    //         });
	     //    		//准备延迟 2 秒后加载网页
	     //    		delayId = setTimeout(function(){
	     //    			//执行回调函数
	     //    			stop.call(page, res, false);
	     //    		},2000);
	     //    	}
	     //    }
	     	if(received.stage == "end"){
	     		let time = new Date().getTime();
	     		log.text(`请求结束时间：　${time}`);
	     		
	     		let loading = await page.property('loading');
	     		 console.log("loading : ", loading);

	     	}
	     	
	    });

	   

	    page.on('onLoadStarted',async function(){
	    	let time = new Date().getTime();
	    	let url = await page.property('url');
	    	log.loadStarted(page, url, time);
	    });
	    page.on('onLoadFinished',async function(){
	    	let time = new Date().getTime();
	    	let url = await page.property('url');
	    	log.loadFinished(page, url, time);
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
                	log.text("页面控制台输入内容 : " + (typeof msg == "object" ? JSON.stringify(msg) : msg));
                	break;
	    	}
	        
	    });
	}
}

export default network;