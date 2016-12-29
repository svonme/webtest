

function main(info, page){
	console.log("测试模块为 首页");
	page.evaluate(function(){
		console.log("url :", window.location.href);
		if(!window['_index'] && window['_index']!=0){
			var $daterangepicker = $(".daterangepicker").last();
			window['_index'] = $(".ranges li", $daterangepicker).length - 1;
		}
		if(window['_index'] > 0){
			var i = window['_index']--;
			console.log("i : ", i);
			var $item = $(".ranges li:nth-child("+ i +")");
			var text = $item.html();
			console.log("尝试触发日历插件");
				$("#reportrange").trigger("click");
				setTimeout(function(){
					console.log("抓图");
					console.log("save");
					setTimeout(function(){
						console.log("模拟点击查询 "+ text +" 数据");
						$item.trigger('click');
						console.log(text + " 数据 查询完毕");
					}, 1500);
				},500);
		}else{
			console.log('测试完毕!!!!!');
			console.log('next');
		}
	});
		// let { title, url } = task.shift();
		// let code = `function(){
		// 	window.location.hash = ${url};
		// }`;
  // 		page.evaluateJavaScript(code);
}

export default main;

