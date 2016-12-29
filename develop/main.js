(function(){
	window.config &&　require.config(window.config);
})();


require(["$","io","./socket"],function($, io, Socket){
	let { host, protocol } = window.location;
	var socket = io.connect(`${protocol}//${host}`);
	new Socket(socket);
});