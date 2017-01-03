
const data = new Map();
class viewSize{
	constructor(log){
		this.log = log;
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
		let size = data.get(key);
		this.log.text(`测试尺寸 : ${JSON.stringify(size)}`);
		return size;
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