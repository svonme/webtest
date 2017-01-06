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
	
	function scrollTop(){
		setTimeout(function(){
			let top = $(".list-group", "#console").height();
			$("#console").stop().animate({
				"scrollTop":  (top + 50) + "px"
			});
		}, 0);
	}
	class Socket{
		constructor(socket){
			//定义接收服务器的消息推送
			socket.on("message/text", data =>{
				if(data instanceof Object){
					data = JSON.stringify(data);	
				}
				$(".list-group","#console").append(`<li class="list-group-item text">消息 : ${data}</li>`);
				scrollTop();
			});
			socket.on("message/info", data =>{
				if(data instanceof Object){
					switch(data.type){
						case "pdf":
						case "image":
							let { url } = data;
							$(".list-group","#console").append(`<li class="list-group-item info">
								文件报告 : <a href="/save/${url}" target="_blank">${url}</a>
							</li>`);
							return false;
							break;
						default:
							data = JSON.stringify(data);
							break;
					}
				}
				$(".list-group","#console").append(`<li class="list-group-item info">${data}</li>`);
				
				scrollTop();
			});
			socket.on("message/network", data =>{
				let { url, startTime, endTime } = data;
				$(".list-group","#console").append(`<li class="list-group-item network">
					<p>静态资源 : ${url}</p>
					<p>开始时间 : ${Format(startTime)} / 结束时间 : ${Format(endTime)} / 请求用时 : ${(endTime - startTime) / 1000}秒</p>
				</li>`);
				scrollTop();
			});
			socket.on("message/error", data =>{
				if(data instanceof Object){
					data = JSON.stringify(data);
				}
				$(".list-group","#console").append(`<li class="list-group-item error">错误 : ${data}</li>`);
				scrollTop();
			});
			let loadStartedTime, loadFinishedTime;
			//有网络资源开始请求
			socket.on("message/loadStarted", data =>{
				let { url, time } = data;
				loadStartedTime = time;
				$(".list-group","#console").append(`<li class="list-group-item loading">
					<p>开始请求 : ${Format(time)} - ${time} / 当前 url : ${url}</p>
				</li>`);
				scrollTop();
			});
			//网络资源停止请求
			socket.on("message/loadFinished", data =>{
				let { url, time } = data;
				loadFinishedTime = time;
				$(".list-group","#console").append(`<li class="list-group-item loading">
					<p>停止请求 : ${Format(time)} - ${time} / 总过用时 : ${(loadFinishedTime - loadStartedTime) / 1000}秒 / 当前 url : ${url}</p>
				</li>`);

				scrollTop();
			});

			socket.on("router", data => {
				if(data){
					let html = [], r = Math.random();
					let list = [];
				  	data.forEach(function({ hash, text }, i){
						html.push(`<a href="#/${hash}?r=${r}" class="list-group-item">${i + 1} : ${text}</a>`);
						list.push(hash);
				  	});
				  	$(".list-group","#message").html(html);	

				  	//添加批量测试
		  			$("#test-start").parent().append(`<button type="button" class="pull-left btn btn-primary" style="margin-left: 15px;" id="test-list">
						<span>批量测试</span>
		  			</button>`);


		  			$("body").on('click',"#test-list",function(){
		  				socket.emit("phantom/list/test", list);
					});
				}
			});

			let statusCount = 1;
			socket.on("phantom/test/stop", url => {
				switch(statusCount){
					//表示未登录
					case 1:
						//把用户名与密码传过去
						socket.emit("phantom/test/login",{
							//测试地址
							"username" : "qianxun",
							"password" : "kuandd2016"
						});
						break;
					// 已经登录
					case 2:
						//获取模块路由
						socket.emit("phantom/getrouter");
						break;
				}
				statusCount++;
			});

			//接收保存快照的命令，在转发给程序 执行保测试报告
			socket.on("message/save", url => {
				socket.emit("page/save");
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



			let confirmStatus = false;
			$("#test-stop").on("click", function(){
				confirmStatus = confirm("是否确认停止");
				if(confirmStatus){
					$(this).prop("disabled", true);
					$("#test-start").prop("disabled", false);
					//告诉服务器停止测试
					socket.emit("phantom/stop");
				}
			});

			$("#test-save").on("click",function(e){
				if(confirmStatus){
					alert("你已经停止了测试服务，无法进行保存");
				}else{
					//告诉服务器保存当前测试数据
					socket.emit("page/save");
				}
			});


			//模块测试
			$(window).on("hashchange", function(){
				let url = window.location.hash;
				let module = url.replace(/^#+\//i,""); //清除开头的 # 字符
				if(module.indexOf("?") > 0){
					module = module.substr(0, module.indexOf("?"));
				}
				socket.emit("module/change", module);
			});
		}
	}
	return Socket;
});