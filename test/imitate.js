import viewSize from "./viewsize";
import netWork from "./network";

class imitate extends viewSize{
	constructor(instance){
		super();
		this.instance = instance;
	}
	async start(url, callback){
		await this.open(url, callback);
		return this.page;
	}
	async open(url, callback){
		//构造网页
		const page = await this.instance.createPage();
		//当前网页对象
		this.page = page;

		//监听网络
		new netWork(page, {
			//一段时间下网络停止加载，执行的回调函数
			"stop" : callback
		});
		//随机获取一个尺寸
	    let size = this.randomViewSize(); 
	    await page.property('viewportSize', size); 
	    //打开网页
	    return await page.open(url);
	}
}

export default imitate;