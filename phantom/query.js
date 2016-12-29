function toStr(value = ""){
	return value + "";
}

class Query{
	constructor(string,space = "&"){
		this._data = new Map();
		if(string){
			let keys = [];
			// 获取所有 key 值
			string.replace(new RegExp(`(^|${space})([a-zA-Z0-9_])*`,'ig'),key => {
				key && keys.push(toStr(key.replace(new RegExp(`^${space}`,'g'),"")));
				return key;
			});
			//根据 可以 值匹配 value
			keys.forEach( key => {
				let reg = new RegExp(`(${space}|^)${key}=([^${space}].*?)(${space}|$)`);
		     	let r = string.match(reg);

		     	let value = void 0;
		     	r && (value = r[2] && unescape(decodeURI(r[2])));
		     	// try{
		     	// 	//如果是对象，将会进行转换
		     	// 	value = JSON.parse(value);
		     	// }
		     	// catch(e){

		     	// }
		     	this._data.set(key,value);
			});
		}
	}
	/**
	 * 判断键名是否存在
	 * @param  {[type]} 键名
	 * @return {[boolean]}     
	 */
	has(key){
		return (key || key == 0) && this._data.has(toStr(key));
	}
	/**
	 * 根据键名获取键值
	 * @param  {[string]} 键名
	 * @return {[Object]} 键值
	 */
	get(key,...args){
		if(args.length > 0){
			var obj = {};
			[key].concat(args).forEach(item => {
				obj[item] = this._data.get(toStr(item));
			});
			return obj;
		}

		if(this.has(key) && this._data.get(toStr(key)) !== undefined){
			return this._data.get(toStr(key)).toString() ;
		}else{
			return "" ;
		}

		//return this.has(key) ? this._data.get(toStr(key)) || "" : void 0;
	}
	/**
	 * [getAll 获取所有键值对]
	 * @return {[Object]} 字典格式数据
	 */
	getAll(){
		var json = {};
		this.forEach((value, key) => {
			json[toStr(key)] = value;
		});
		return json;
	}
	/**
	 * [keys 返回所有键名]
	 * @return {[Array]} [键名集合]
	 */
	keys(fun = void 0){
		let [ ...keys ] = this._data.keys();
		if(fun && typeof fun == "function"){
			keys.forEach(fun);
		}
		return keys;
	}
	/**
	 * [values 返回所有键值]
	 * @return {[Array]} [键值集合]
	 */
	values(fun = void 0){
		let [ ...values ] = this._data.values();
		if(fun && typeof fun == "function"){
			values.forEach(fun);
		}
		return values;
	}
	/**
	 * [size 键名总数]
	 * @return {[number]} [键名总数]
	 */
	size(){
		return this._data.size;
	}
	/**
	 * [forEach 遍历键值对]
	 * @param  {[type]} fun [回调函数]
	 */
	forEach(fun){
		fun && this._data.forEach(fun);
	}
}

export default Query;