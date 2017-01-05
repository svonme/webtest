import pdfkit from "pdfkit";
import fs from "fs";

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

class createpdf {
	// let logs = {
	// 	"text" : [],          //消息日志
	// 	"info" : [],          //重要的测试日志
	// 	"network"      : [],  //网络资源
	// 	"loadStarted"  : [],  //请求开始时间
	// 	"loadFinished" : []   //请求结束时间
	// };
	constructor(info, logs, routerData){
		let { viewportSize, pathname, router, location, url, image, time } = info;

		let { 
			loadStarted,  // 请求开始时间
			loadFinished, // 请求结束时间
			network,      // 所有网络资源
			text,         // 所有消息日志
			info : infoMessage         // 重要的测试日志
		} = logs; 
		let routeritem = {
			text : "",
			hash : router['pathname']
		};
		for(let i = 0 , len = routerData.length; i < len; i++){
			let item = routerData[i];
			if(item['hash'] == router['pathname']){
				Object.assign(routeritem, item);
				break;
			}
		}
		let basis = [
			`报告时间 : ${Format(time)}`,
			`测试地址 : ${url}`,
			`快照名称 : ${image}`,
			`测试模块 : ${routeritem['text']} / ${routeritem['hash']}`,
			`请求开始时间 : ${Format(loadStarted[0])}`,
			`请求结束时间 : ${Format(loadFinished[0])}`,
			`请求总过用时 : ${(loadFinished[0] - loadStarted[0]) / 1000}秒`,
		];
		return new Promise(function(resolve){
			let src = image.replace(/jpg$/,"pdf");
			const doc = new pdfkit();
			doc.pipe(fs.createWriteStream(`./save/${src}`));
			doc.font('fonts/msyh.ttf')
				.fontSize(14)
				.text(basis.join("\n\n"), 50, 50 );
			
			doc.addPage()
				.fontSize(14)
			    .image(`./save/${image}`,{
			   	 	fit: [500, 600],
			   		align: 'center',
			   		valign: 'center'
			   	});

			const page = doc.addPage();
			page.fontSize(14);
			// 所有网络资源
			network.forEach(function(data){
				let { url, startTime, endTime } = data;
				page.text([
					`网络资源 : ${url}`,
					`           开始时间 : ${Format(startTime)}`,
					`           结束时间 : ${Format(endTime)}`,
					`           请求用时 : ${(endTime - startTime) / 1000}秒\n\n`
				].join("\n"));
			});
			// 所有消息日志
			text.forEach(function(data){
				if(data instanceof Object){
					data = JSON.stringify(data);
				}
				page.text(`消息 : ${data}\n\n`);
			});
			setTimeout(function(){
				doc.end();
				resolve(src);
			}, 0);
		});
	}
}
export { createpdf };