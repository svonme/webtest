import console from "./console";
import saveImage from "./saveImage";

class capture extends saveImage{
	constructor(page){
		super(page);
		return new Promise((callback)=>{
			this.save().then(function(result){
				callback(result);
			});
		});
	}
}

export default capture;