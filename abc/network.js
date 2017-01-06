'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _saveImage = require('./saveImage');

var _saveImage2 = _interopRequireDefault(_saveImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var network = function network(page, log) {
	//延迟队列 id

	//获取开始请求的时间
	//如果没有传入参数，将默认使用调用该方法时的时间
	var onLoadStarted = function () {
		var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
			var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
			var url = arguments[1];
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.t0 = url;

							if (_context.t0) {
								_context.next = 5;
								break;
							}

							_context.next = 4;
							return page.property('url');

						case 4:
							url = _context.sent;

						case 5:
							log.loadStarted(time, url);

						case 6:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		return function onLoadStarted() {
			return _ref.apply(this, arguments);
		};
	}();
	//获取结束时间


	var onLoadFinished = function () {
		var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
			var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
			var url = arguments[1];
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.t0 = url;

							if (_context2.t0) {
								_context2.next = 5;
								break;
							}

							_context2.next = 4;
							return page.property('url');

						case 4:
							url = _context2.sent;

						case 5:
							log.loadFinished(time, url);

						case 6:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this);
		}));

		return function onLoadFinished() {
			return _ref2.apply(this, arguments);
		};
	}();

	var testStop = function () {
		var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
			var url;
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.next = 2;
							return page.property('url');

						case 2:
							url = _context3.sent;

							log.stop(url, res, page);

						case 4:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, this);
		}));

		return function testStop() {
			return _ref3.apply(this, arguments);
		};
	}();

	//网络请求开始


	(0, _classCallCheck3.default)(this, network);

	var res = {};
	var list = [];
	var success = [];
	var delayId = void 0;page.on("onResourceRequested", function (requestData) {
		var id = requestData.id,
		    url = requestData.url;

		res[id] = {
			"id": id,
			"url": url,
			"startTime": new Date().getTime()
		};
		list.push(requestData.id);
	});
	//网络请求结束
	page.on("onResourceReceived", function () {
		var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(received) {
			var id, _received$stage, stage, time;

			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							id = received.id, _received$stage = received.stage, stage = _received$stage === undefined ? "" : _received$stage;
							time = new Date().getTime();
							_context4.t0 = stage + "";
							_context4.next = _context4.t0 === "end" ? 5 : 8;
							break;

						case 5:
							res[id]['endTime'] = time;
							success.push(received.id);
							return _context4.abrupt('break', 9);

						case 8:
							return _context4.abrupt('break', 9);

						case 9:
							// 有新的请求进来
							// 删除前面的队列
							clearTimeout(delayId);
							if (stage == "end") {
								log.network(res[id]);
								// let loading = await page.property('loading');
								if (success.length == list.length) {
									//准备延迟 2 秒后加载网页
									delayId = setTimeout(function () {
										onLoadFinished(time);
										//执行回调函数
										testStop();
									}, 2000);
								}
							}

						case 11:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, this);
		}));

		return function (_x3) {
			return _ref4.apply(this, arguments);
		};
	}());

	// page.on('onLoadStarted',async function(){
	// 	let time = new Date().getTime();
	// 	let url = await page.property('url');
	// 	log.loadStarted(page, url, time);
	// });
	// page.on('onLoadFinished',async function(){

	// });

	//当发生 url 变化时 触发一次，表示开始请求了
	page.on('onUrlChanged', function () {
		var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(url) {
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							log.info('Url change : ' + url);
							onLoadStarted(void 0, url); //进来时默认调用一次，表示网络开始加载

						case 2:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, this);
		}));

		return function (_x4) {
			return _ref5.apply(this, arguments);
		};
	}());

	var that = this;
	//消息输出
	page.on('onConsoleMessage', function (msg, lineNum, sourceId) {
		//约定内容
		switch (msg) {
			case "stop":
				//执行回调函数
				stop.call(page, res, "stop");
				break;
			case "next":
				//执行下一个测试
				stop.call(page, res, "next");
				break;
			default:
				if (msg instanceof Object) {
					msg = (0, _stringify2.default)(msg);
				}
				log.text('\u9875\u9762\u63A7\u5236\u53F0\u8F93\u5165\u5185\u5BB9 : ' + msg);
				break;
		}
	});
	//程序错误日志
	page.on("onError", function (msg, trace) {
		var msgStack = [msg];
		if (trace && trace.length) {
			msgStack.push("跟踪:");
			trace.forEach(function (t) {
				var file = t.file,
				    line = t.line,
				    _t$function = t.function,
				    fun = _t$function === undefined ? "" : _t$function;

				msgStack.push('&nbsp;&nbsp;&nbsp;-> ' + file + ' : ' + line + (fun && 'in function : ' + fun));
			});
		}
		// console.log(trace);
		log.error(msgStack.join("<br/>"));
	});
};

exports.default = network;
module.exports = exports['default'];