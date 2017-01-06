"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toArray2 = require("babel-runtime/helpers/toArray");

var _toArray3 = _interopRequireDefault(_toArray2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toStr() {
	var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

	return value + "";
}

var Query = function () {
	function Query(string) {
		var _this = this;

		var space = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "&";
		(0, _classCallCheck3.default)(this, Query);

		this._data = new _map2.default();
		if (string) {
			(function () {
				var keys = [];
				// 获取所有 key 值
				string.replace(new RegExp("(^|" + space + ")([a-zA-Z0-9_])*", 'ig'), function (key) {
					key && keys.push(toStr(key.replace(new RegExp("^" + space, 'g'), "")));
					return key;
				});
				//根据 可以 值匹配 value
				keys.forEach(function (key) {
					var reg = new RegExp("(" + space + "|^)" + key + "=([^" + space + "].*?)(" + space + "|$)");
					var r = string.match(reg);

					var value = void 0;
					r && (value = r[2] && unescape(decodeURI(r[2])));
					// try{
					// 	//如果是对象，将会进行转换
					// 	value = JSON.parse(value);
					// }
					// catch(e){

					// }
					_this._data.set(key, value);
				});
			})();
		}
	}
	/**
  * 判断键名是否存在
  * @param  {[type]} 键名
  * @return {[boolean]}     
  */


	(0, _createClass3.default)(Query, [{
		key: "has",
		value: function has(key) {
			return (key || key == 0) && this._data.has(toStr(key));
		}
		/**
   * 根据键名获取键值
   * @param  {[string]} 键名
   * @return {[Object]} 键值
   */

	}, {
		key: "get",
		value: function get(key) {
			var _this2 = this;

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (args.length > 0) {
				var obj = {};
				[key].concat(args).forEach(function (item) {
					obj[item] = _this2._data.get(toStr(item));
				});
				return obj;
			}

			if (this.has(key) && this._data.get(toStr(key)) !== undefined) {
				return this._data.get(toStr(key)).toString();
			} else {
				return "";
			}

			//return this.has(key) ? this._data.get(toStr(key)) || "" : void 0;
		}
		/**
   * [getAll 获取所有键值对]
   * @return {[Object]} 字典格式数据
   */

	}, {
		key: "getAll",
		value: function getAll() {
			var json = {};
			this.forEach(function (value, key) {
				json[toStr(key)] = value;
			});
			return json;
		}
		/**
   * [keys 返回所有键名]
   * @return {[Array]} [键名集合]
   */

	}, {
		key: "keys",
		value: function keys() {
			var fun = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;

			var _data$keys = this._data.keys(),
			    _data$keys2 = (0, _toArray3.default)(_data$keys),
			    keys = _data$keys2;

			if (fun && typeof fun == "function") {
				keys.forEach(fun);
			}
			return keys;
		}
		/**
   * [values 返回所有键值]
   * @return {[Array]} [键值集合]
   */

	}, {
		key: "values",
		value: function values() {
			var fun = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;

			var _data$values = this._data.values(),
			    _data$values2 = (0, _toArray3.default)(_data$values),
			    values = _data$values2;

			if (fun && typeof fun == "function") {
				values.forEach(fun);
			}
			return values;
		}
		/**
   * [size 键名总数]
   * @return {[number]} [键名总数]
   */

	}, {
		key: "size",
		value: function size() {
			return this._data.size;
		}
		/**
   * [forEach 遍历键值对]
   * @param  {[type]} fun [回调函数]
   */

	}, {
		key: "forEach",
		value: function forEach(fun) {
			fun && this._data.forEach(fun);
		}
	}]);
	return Query;
}();

exports.default = Query;
module.exports = exports["default"];