import Url from "url";
import Query from "./query";

class saveImage{
	constructor(page, log){
		this.page = page;
		this.log = log;
	}
	async basis(){
		let url = await this.page.property('url');
		//当前页面 url 值
		let location = Url.parse(url, true);
		let size = await this.page.property('viewportSize');
		//拿到 hash 部分
		let { hash = "" } = location;
		if(typeof hash == "object"){
			hash = "";
		}
		hash = hash.replace(/^#+\//,"");
		//根据 hash 处理路由
		let router = Url.parse(hash);
		let { pathname } = location;
        return {
        	"url"          : url,
        	"pathname"     : pathname,
        	"viewportSize" : size,
        	"router"       : router,
        	"location"     : location,
        }
	}
	async render(info){
		let time = new Date().getTime();
		let { router, viewportSize : size } = info;
		//当前网页 hash 地址
		let { pathname = "", query = "" } = router;
        pathname = `${pathname.replace(/^\//,"")}_w-${size.width}_h-${size.height}_${time}.jpg`;
        let path = `${pathname.replace(/\//g,"-")}`;

        //图片保存参数
        let option = {
            format : "jpeg",  //类型
            quality: 100      //质量
        };
		await this.page.render(`./save/${path}`, option);
		this.log.text(`image :  ${path}`);

		return Object.assign({
			"time"     : time,
			"image"    : path,
			"pathname" : pathname,
			"query"    : new Query(query).getAll()
		}, info);
	}
	async save(){
		return new Promise((callback) => {
			this.basis().then( info => {
				//延迟一秒抓图，保证页面内容渲染完毕
				setTimeout(async () => {
					//执行继承的保存图片方法
					let result = await this.render(info);
					callback(result);
				}, 1000);
			});
		});
	}
}

export default saveImage;