"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _viewsize = require("./viewsize");

var _viewsize2 = _interopRequireDefault(_viewsize);

var _network = require("./network");

var _network2 = _interopRequireDefault(_network);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imitate = function (_viewSize) {
	(0, _inherits3.default)(imitate, _viewSize);

	function imitate(instance, log) {
		(0, _classCallCheck3.default)(this, imitate);

		var _this = (0, _possibleConstructorReturn3.default)(this, (imitate.__proto__ || (0, _getPrototypeOf2.default)(imitate)).call(this, log));

		_this.instance = instance;
		return _this;
	}

	(0, _createClass3.default)(imitate, [{
		key: "start",
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url) {
				var page;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.open(url);

							case 2:
								page = _context.sent;
								return _context.abrupt("return", page);

							case 4:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function start(_x) {
				return _ref.apply(this, arguments);
			}

			return start;
		}()
	}, {
		key: "open",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url) {
				var page, size, status;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.instance.createPage();

							case 2:
								page = _context2.sent;

								//当前网页对象
								this.page = page;
								//监听网络
								new _network2.default(page, this.log);
								//随机获取一个尺寸
								size = this.randomViewSize();
								_context2.next = 8;
								return page.property('viewportSize', size);

							case 8:
								_context2.next = 10;
								return page.open(url);

							case 10:
								status = _context2.sent;

								if (!(status == "success")) {
									_context2.next = 13;
									break;
								}

								return _context2.abrupt("return", page);

							case 13:
								throw "致命错误，打开网页出现异常";

							case 14:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function open(_x2) {
				return _ref2.apply(this, arguments);
			}

			return open;
		}()
	}]);
	return imitate;
}(_viewsize2.default);

exports.default = imitate;
module.exports = exports["default"];