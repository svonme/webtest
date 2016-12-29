import { Router } from "express";

class Test{
	constructor(){
		const router = Router();
		// 该路由使用的中间件
		router.use(function timeLog(req, res, next) {
		  console.log('Time: ', Date.now());
		  next();
		});
		// 定义网站主页的路由
		router.get('/', this.home.bind(this));
		router.get('/data/save',this.dataSave.bind(this));
		router.get('/data/select',this.dataSelect.bind(this));
		return router;
	}
	home(req, res){
		return res.render("index");
	}
	dataSave(req, res){
		
	}
	dataSelect(req, res){
		
	}
}

export { Test };