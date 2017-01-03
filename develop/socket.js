//时间格式化
function Format(time, format) {
	let date = new Date(time);
	format || (format = 'yyyy-MM-dd hh:mm:ss');
	var map = {
	    "M": date.getMonth() + 1, //月
	    "d": date.getDate(), //日
	    "h": date.getHours(), //小时
	    "m": date.getMinutes(), //分
	    "s": date.getSeconds(), //秒
	    "q": Math.floor((date.getMonth() + 3) / 3), //季度
	    "S": date.getMilliseconds() //毫秒
	};
	format = format.replace(/([yMdhmsqS])+/g, function(all, t){
	    var v = map[t];
	    if(v !== undefined){
	        if(all.length > 1){
	            v = '0' + v;
	            v = v.substr(v.length-2);
	        }
	        return v;
	    }
	    else if(t === 'y'){
	        return (date.getFullYear() + '').substr(4 - all.length);
	    }
	    return all;
	});
	return format;
}

define(["$"],function($){
	class Socket{
		constructor(socket){
			//定义接收服务器的消息推送
			socket.on("message/text", data =>{
				$(".list-group","#console").append(`<li class="list-group-item">network : ${data}</li>`);
			});
			socket.on("message/info", data =>{
				// $("table","#console").append("<tr><td>"+ data +"</td></tr>");
				console.log(data);
			});
			socket.on("message/network", data =>{
				let { url } = data;
				$(".list-group","#console").append(`<li class="list-group-item">network : ${url}</li>`);
			});

			//有网络资源开始请求
			socket.on("message/loadStarted", data =>{
				let { url, time } = data;
				$(".list-group","#console").append(`<li class="list-group-item">开始请求 : ${Format(time)} - ${time}</li>`);
			});
			//网络资源停止请求
			socket.on("message/loadFinished", data =>{
				let { url, time } = data;
				$(".list-group","#console").append(`<li class="list-group-item">停止请求 : ${Format(time)} - ${time}</li>`);
			});

			socket.on("router", data => {
				if(data){
					let html = [];
				  	data.forEach(function({ hash, text }, i){
						html.push(`<a href="#/${hash}" class="list-group-item">${i + 1} : ${text}</a>`);
				  	});
				  	$(".list-group","#message").html(html);	
				}
			});

			$("#test-start").on("click",function(e){
				$(this).prop("disabled", true);
				$("#test-stop").prop("disabled", false);

				//告诉服务器开始测试
				socket.emit("phantom/start",{
					//测试地址
					"url" : $("#url").val()
				});
			});

			$("#test-stop").on("click", function(){
				$(this).prop("disabled", true);
				$("#test-start").prop("disabled", false);
				// //告诉服务器停止测试
				// socket.emit("phantom/stop");

				socket.emit("page/save");
			});
		}
	}
	return Socket;
});