define(["$"],function($){
	class Socket{
		constructor(socket){
			//定义接收服务器的消息推送
			socket.on("get/message", (data)=>{
			    this.getMessage(data);
			});

			socket.on("router", (data)=>{
				if(data){
					let html = [];
				  	data.forEach(function({ hash, text }, i){
						html.push(`<a href="#/${hash}" class="list-group-item">${i+1} : ${text}</a>`);
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
					"url" : "http://192.168.1.227:8080/index_82c7ee8.html"
				});
			});

			$("#test-stop").on("click", function(){
				$(this).prop("disabled", true);
				$("#test-start").prop("disabled", false);
				//告诉服务器停止测试
				socket.emit("phantom/stop");
			});
		}
		getMessage(data){
			try{
				if(typeof data == "string"){
					data = JSON.parse(data);
				}
			} catch(e){
				// console.error(e);
				// $("table","#message").append("<tr><td>"+ data +"</td></tr>");
				let value = data.replace(/}(.*){/,"}#split#{").split(/#split#/);
				value.forEach(item => this.getMessage(item));
				return false;
			}
			let { type = "" } = data;
			if(data){
				switch(type){
					case "info":
						let { info } = data;
						let { image, url } = info;
						let html = `<p>url : ${url}</p><p><a href="/save/${image}" target="_blank">${image}</a></p>`;
						$("table","#message").append("<tr><td>"+ html +"</td></tr>");
						break;
					case "networt":
						$("table","#console").append("<tr><td>"+ data['id'] + " : " + data['url'] +"</td></tr>");
						break;
					case "text":
						let { text } = data;
						$("table","#console").append("<tr><td>"+ text +"</td></tr>");
						break;
					default:
						console.log(data);
						break;
				}
			}
			
		}
	}
	return Socket;
});