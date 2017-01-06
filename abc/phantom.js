"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.phantom = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _test2 = require("../phantom/test");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phantom = function (_test) {
	(0, _inherits3.default)(phantom, _test);

	function phantom() {
		(0, _classCallCheck3.default)(this, phantom);
		return (0, _possibleConstructorReturn3.default)(this, (phantom.__proto__ || (0, _getPrototypeOf2.default)(phantom)).call(this));
	}
	/**
  * [on description]
  * @param  {[type]} key  [text, info, network]
  * @param  {[type]} fun  [description]
  * @return {[type]}      [description]
  */


	(0, _createClass3.default)(phantom, [{
		key: "on",
		value: function on(key, fun) {
			if (key && fun && this.console[key]) {
				this.console[key].push(fun);
			}
		}
	}]);
	return phantom;
}(_test2.test); // import { spawn } from "child_process";

// class phantom{
// 	constructor(message){
// 		this.message = message
// 	}
// 	async start({ url }){
// 		this.message({
// 			type : "text",
// 			text :　`开始测试 测试地址为 : ${url}`
// 		});
// 		const test = spawn('node', ['--harmony','./bin/test.js',url]);
// 		test.stdout.on('data', (data) => {
// 			//输出测试时打印的日志
// 		  	this.message(data.toString());
// 		});

// 		test.stderr.on('data', (data) => {
// 			console.log("error : ",data.toString());
// 		});

// 		test.on('close', (code) => {
// 		  	this.message({
// 				type : "text",
// 				text : `网页 ${url} 测试完毕`
// 			});
// 		  	this.stop();
// 		});
// 	}
// 	async stop(){
// 		this.message({
// 			type : "text",
// 			text : "停止测试"
// 		});
// 	}
// }

// export { phantom };

exports.phantom = phantom;