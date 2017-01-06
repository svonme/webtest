import viewSize from "./viewsize";
import netWork from "./network";

class imitate extends viewSize{
	constructor(instance, log){
		super(log);
		this.instance = instance;
	}
	async start(url){
		const page = await this.open(url);
		return page;
	}
	async open(url){
		//构造网页
		const page = await this.instance.createPage();
		//当前网页对象
		this.page = page;
		//监听网络
		new netWork(page, this.log);
		//随机获取一个尺寸
	    let size = this.randomViewSize(); 
	    await page.property('viewportSize', size); 
	    //打开网页
	    let status = await page.open(url);
	    if(status == "success"){
	    	return page;
	    }
        throw "致命错误，打开网页出现异常"
	}
}

export default imitate;