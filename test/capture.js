
import saveImage from "./saveImage";

class capture extends saveImage{
	constructor(page){
		super(page);
		return new Promise((callback)=>{
			// this.init().then( info => {
			// 	//延迟一秒抓图，保证页面内容渲染完毕
			// 	setTimeout(async () => {
			// 		//执行继承的保存图片方法
			// 		let result = await this.render(info);
			// 		await callback(result);
			// 	}, 1000);
			// });
			this.save().then(function(result){
				callback(result);
			});
		});
	}
}

export default capture;