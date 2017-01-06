"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

exports.default = function (io) {
	io.on('connection', function (socket) {
		new IO(socket, io);
	});
};

var _phantom2 = require("./phantom");

var _createpdf = require("./createpdf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IO = function (_phantom) {
	(0, _inherits3.default)(IO, _phantom);

	function IO(socket, io) {
		(0, _classCallCheck3.default)(this, IO);

		var _this = (0, _possibleConstructorReturn3.default)(this, (IO.__proto__ || (0, _getPrototypeOf2.default)(IO)).call(this));

		_this.socket = socket;
		_this.io = io;
		var logs = {};

		var curModule = void 0;

		function createLog() {
			var module = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "main";

			curModule = module;
			if (module in logs) {
				return logs[module];
			} else {
				logs[module] = {
					"text": [], //消息日志
					"info": [], //重要的测试日志
					"error": [], //错误日志
					"network": [], //网络资源
					"loadStarted": [], //请求开始时间
					"loadFinished": [] //请求结束时间
				};
				return logs[module];
			}
		}

		// 监听日志输出
		_this.on('text', function (message) {
			_this.messageText(message);
			logs[curModule].text.push(message);
		});
		_this.on('info', function (message) {
			_this.messageInfo(message);
			logs[curModule].info.push(message);
		});
		_this.on('network', function (message) {
			_this.messageNetwork(message);
			logs[curModule].network.push(message);
		});

		_this.on('error', function (message) {
			_this.messageError(message);
			logs[curModule].error.push(message);
		});

		_this.on('loadStarted', function (time, url) {
			_this.messageLoadStarted(time, url);
			logs[curModule].loadStarted.push(time);
		});
		_this.on('loadFinished', function (time, url) {
			_this.messageLoadFinished(time, url);
			logs[curModule].loadFinished.push(time);
		});

		_this.on('stop', function (url, res, page) {
			_this.socket.emit("phantom/test/stop", url);
		});

		var routerData = [];

		//开始测试
		socket.on("phantom/start", function (data) {
			createLog();
			_this.phStart(data).then(function (status) {
				if (status) {
					_this.messageInfo("页面正常打开");
				} else {
					_this.error("致命错误，网页打开失败");
				}
			});
			return true;
		});
		//用户登录
		socket.on("phantom/test/login", function (_ref) {
			var username = _ref.username,
			    password = _ref.password;

			_this.phLogin(username, password);
		});
		socket.on("phantom/getrouter", function () {
			_this.phGetRouter().then(function (router) {
				if (router) {
					_this.socket.emit("router", router);
					routerData.push.apply(routerData, (0, _toConsumableArray3.default)(router));
				}
			});
		});

		//停止测试
		socket.on("phantom/stop", function () {
			_this.phStop().then(function () {
				_this.socket.emit("message/text", "测试服务已经停止");
			});
			return true;
		});
		//准备保存
		socket.on("page/save", function () {
			_this.messageText("准备快照与把相信信息输出到 pdf 文件");
			_this.phSave().then(function (info) {
				if (info === false) {
					_this.messageError("测试出问题了，上一次的未停止，请稍候再试");
				} else {
					new _createpdf.createpdf(info, logs[curModule], routerData).then(function (path) {
						// Object.keys(logs).map(key => logs[key] = []);
						_this.messageInfo({
							"type": "pdf",
							"url": path
						});
					});
				}
			});
		});

		socket.on('module/change', function (module) {
			createLog(module);
			_this.phModuleChange(module);
		});

		socket.on("phantom/list/test", function (list) {
			var that = _this;
			function app(i) {
				var key = list[i];
				if (key) {
					that.phModuleChange(key);
				}
			}

			app(0);
		});
		return _this;
	}

	(0, _createClass3.default)(IO, [{
		key: "messageError",
		value: function messageError(message) {
			this.socket.emit("message/error", message);
		}
	}, {
		key: "messageText",
		value: function messageText(message) {
			this.socket.emit("message/text", message);
		}
	}, {
		key: "messageInfo",
		value: function messageInfo(message) {
			this.socket.emit("message/info", message);
		}
	}, {
		key: "messageNetwork",
		value: function messageNetwork(message) {
			this.socket.emit("message/network", message);
		}
	}, {
		key: "messageLoadStarted",
		value: function messageLoadStarted(time, url) {
			this.socket.emit("message/loadStarted", {
				time: time,
				url: url
			});
		}
	}, {
		key: "messageLoadFinished",
		value: function messageLoadFinished(time, url) {
			this.socket.emit("message/loadFinished", {
				time: time,
				url: url
			});
		}
	}]);
	return IO;
}(_phantom2.phantom);

;
module.exports = exports["default"];