import saveImage from "./saveImage";

class capture extends saveImage{
	constructor(page, log){
		super(page, log);
		return this.save();
	}
}

export default capture;