"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = new _map2.default();

var viewSize = function () {
	function viewSize(log) {
		(0, _classCallCheck3.default)(this, viewSize);

		this.log = log;
		this.setViewSize(960, 768);
		this.setViewSize(1024, 768);
		this.setViewSize(1280, 960);
		this.setViewSize(1280, 1024);
		this.setViewSize(1366, 768);
		this.setViewSize(1400, 1050);
	}

	(0, _createClass3.default)(viewSize, [{
		key: "randomViewSize",
		value: function randomViewSize() {
			var len = data.size;
			var key = parseInt(Math.random() * len, 10);
			return this.getViewSize(key);
		}
	}, {
		key: "getViewSize",
		value: function getViewSize(key) {
			var size = data.get(key);
			this.log.text("\u6A21\u62DF\u6D4F\u89C8\u5668\u5C3A\u5BF8\u5927\u5C0F : \u5BBD=" + size["width"] + "px \u9AD8=" + size["height"] + "px");
			return size;
		}
	}, {
		key: "setViewSize",
		value: function setViewSize(width, height) {
			var key = data.size;
			data.set(key, {
				"width": width,
				"height": height
			});
			return key;
		}
	}]);
	return viewSize;
}();

exports.default = viewSize;
module.exports = exports["default"];