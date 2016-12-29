function log(data){
	setTimeout(function(){
		let res = JSON.stringify(data);
		console.log(res);
	}, Math.random() * 1000);
}

export default { log };