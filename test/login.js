import imitate from "./imitate";

class _Login extends imitate{
	constructor(instance){
		super(instance);
	}
	//重写 start 方法
	async start(url, callback){
		let status = await this.open(url, callback);
		if(status == "success"){
	    	//注入数据，模拟登录
	    	this.page.evaluate(this.login);
	    }
	    return this.page;
	}
	//页面加载完成后执行在页面中的代码片段
	login(){
		document.querySelector("#username").value = "qianxun";
        document.querySelector("#password").value = "kuandd2016";
        console.log("模拟登录");
        var login = new Login('#username' , '#password' , '#loginSubmit');
        //模拟登陆
        login.getData();
	}
}

export default _Login;