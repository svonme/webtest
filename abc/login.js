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

var _imitate2 = require("./imitate");

var _imitate3 = _interopRequireDefault(_imitate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Login = function (_imitate) {
	(0, _inherits3.default)(_Login, _imitate);

	function _Login(instance, log) {
		(0, _classCallCheck3.default)(this, _Login);
		return (0, _possibleConstructorReturn3.default)(this, (_Login.__proto__ || (0, _getPrototypeOf2.default)(_Login)).call(this, instance, log));
	}
	//重写 start 方法


	(0, _createClass3.default)(_Login, [{
		key: "start",
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url) {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.open(url);

							case 2:
								return _context.abrupt("return", _context.sent);

							case 3:
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
	}]);
	return _Login;
}(_imitate3.default);

exports.default = _Login;
module.exports = exports["default"];