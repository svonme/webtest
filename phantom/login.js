import imitate from "./imitate";

class _Login extends imitate{
	constructor(instance, log){
		super(instance, log);
	}
	//重写 start 方法
	async start(url){
		// await page.includeJs("http://cdn.svon.org/js/promise.min.js");
//      	await page.includeJs("http://cdn.svon.org/libs/jquery.min.js");
    	//注入数据，模拟登录
    	// this.page.evaluate(this.login);
	    return await this.open(url);
	}
}

export default _Login;