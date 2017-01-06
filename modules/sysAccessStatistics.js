var i = 0;
function main(_ref, log, page) {
	var location = _ref.location,
	    router = _ref.router;
	var pathname = router.pathname,
	    query = router.query;

	page.evaluate(function (index) {
		$(function () {
			switch(index * 1){
				case 0:
					console.log("save"); // 保存当前快照
					console.log("next"); // 继续测试当前模块
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					$("#reportrange").trigger("click");
					setTimeout(function(){
						var $action = $(".ranges li:nth-child(" + index + ")",".daterangepicker:last");
						var text = $action.html();
						setTimeout(function(){
							console.log("模拟用户点击 : " + text);
							$action.trigger("click");
							setTimeout(function(){
								console.log("save");
								console.log("next");
							}, 3000);
						}, 0);
					}, 0);
					break;
				default:
					console.log("stop"); // 测试完毕
			}
			
		});
	}, i++);
}

export default main;