"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _saveImage2 = require("./saveImage");

var _saveImage3 = _interopRequireDefault(_saveImage2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var capture = function (_saveImage) {
	(0, _inherits3.default)(capture, _saveImage);

	function capture(page, log) {
		var _ret;

		(0, _classCallCheck3.default)(this, capture);

		var _this = (0, _possibleConstructorReturn3.default)(this, (capture.__proto__ || (0, _getPrototypeOf2.default)(capture)).call(this, page, log));

		return _ret = _this.save(), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	return capture;
}(_saveImage3.default);

exports.default = capture;
module.exports = exports["default"];