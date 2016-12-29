
const data = new Map();
class viewSize{
	constructor(){
		this.setViewSize(960  , 768);
		this.setViewSize(1024 , 768);
		this.setViewSize(1280 , 960);
		this.setViewSize(1280 , 1024);
		this.setViewSize(1366 , 768);
		this.setViewSize(1400 , 1050);
	}
	randomViewSize(){
		let len = data.size;
		let key = parseInt(Math.random() * len, 10);
		return this.getViewSize(key);
	}
	getViewSize(key){
		return data.get(key);
	}
	setViewSize(width, height){
		let key = data.size;
		data.set(key, {
			"width"  : width,
			"height" : height
		});
		return key;
	}
}

export default viewSize;