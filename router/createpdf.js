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

class createpdf{
	constructor(info, logs){
		let { viewportSize, pathname, router, location, url, image, time } = info;
		let basis = [
			`当前时间 : ${Format(time)}`,
			`url : ${url}`,
			`快照 : ${image}`,
			`location : ${JSON.stringify(location)}`,
			`router : ${JSON.stringify(router)}`
		];
		return new Promise(function(resolve){
			let src = image.replace(/jpg$/,"pdf");
			const doc = new pdfkit();
			doc.pipe(fs.createWriteStream(`./save/${src}`));
			let text = logs.map(item => {
				let str = "";
				let { type = "" } = item
				switch(type){
					case "networt":
						let url = item["url"];
						str += `newwork : ${url}`;
						break;
					case "text":
						let { text } = item;
						str += `log : ${text}`
						break;
					default:
						// console.log(data);
						break;
				}
				return str;
			});

			// doc.font('fonts/SourceCodePro-Regular.ttf')
			doc.font('fonts/msyh.ttf')
				.fontSize(14)
				.text(basis.concat(text).join("\n\n"), 50, 50 );
			
			doc.addPage()
				.fontSize(14)
			    .image(`./save/${image}`,{
			   	 	fit: [500, 600],
			   		align: 'center',
			   		valign: 'center'
			   	});
			doc.end();
			resolve(src);
		});
	}
}
export { createpdf };