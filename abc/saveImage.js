"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _query = require("./query");

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveImage = function () {
	function saveImage(page, log) {
		(0, _classCallCheck3.default)(this, saveImage);

		this.page = page;
		this.log = log;
	}

	(0, _createClass3.default)(saveImage, [{
		key: "basis",
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var url, location, size, _location$hash, hash, router, pathname;

				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.page.property('url');

							case 2:
								url = _context.sent;

								//当前页面 url 值
								location = _url2.default.parse(url, true);
								_context.next = 6;
								return this.page.property('viewportSize');

							case 6:
								size = _context.sent;

								//拿到 hash 部分
								_location$hash = location.hash, hash = _location$hash === undefined ? "" : _location$hash;

								if ((typeof hash === "undefined" ? "undefined" : (0, _typeof3.default)(hash)) == "object") {
									hash = "";
								}
								hash = hash.replace(/^#+\//, "");
								//根据 hash 处理路由
								router = _url2.default.parse(hash);
								pathname = location.pathname;
								return _context.abrupt("return", {
									"url": url,
									"pathname": pathname,
									"viewportSize": size,
									"router": router,
									"location": location
								});

							case 13:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function basis() {
				return _ref.apply(this, arguments);
			}

			return basis;
		}()
	}, {
		key: "render",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(info) {
				var time, router, size, _router$pathname, pathname, _router$query, query, path, option;

				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								time = new Date().getTime();
								router = info.router, size = info.viewportSize;
								//当前网页 hash 地址

								_router$pathname = router.pathname, pathname = _router$pathname === undefined ? "" : _router$pathname, _router$query = router.query, query = _router$query === undefined ? "" : _router$query;

								pathname = pathname.replace(/^\//, "") + "_w-" + size.width + "_h-" + size.height + "_" + time + ".jpg";
								path = "" + pathname.replace(/\//g, "-");

								//图片保存参数

								option = {
									format: "jpeg", //类型
									quality: 100 //质量
								};
								_context2.next = 8;
								return this.page.render("./save/" + path, option);

							case 8:
								this.log.info({
									"type": "image",
									"url": path
								});

								return _context2.abrupt("return", (0, _assign2.default)({
									"time": time,
									"image": path,
									"pathname": pathname,
									"query": new _query2.default(query).getAll()
								}, info));

							case 10:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function render(_x) {
				return _ref2.apply(this, arguments);
			}

			return render;
		}()
	}, {
		key: "save",
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
				var _this = this;

				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								return _context4.abrupt("return", new _promise2.default(function (callback) {
									_this.basis().then(function (info) {
										//延迟一秒抓图，保证页面内容渲染完毕
										setTimeout((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
											var result;
											return _regenerator2.default.wrap(function _callee3$(_context3) {
												while (1) {
													switch (_context3.prev = _context3.next) {
														case 0:
															_context3.next = 2;
															return _this.render(info);

														case 2:
															result = _context3.sent;

															callback(result);

														case 4:
														case "end":
															return _context3.stop();
													}
												}
											}, _callee3, _this);
										})), 1000);
									});
								}));

							case 1:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function save() {
				return _ref3.apply(this, arguments);
			}

			return save;
		}()
	}]);
	return saveImage;
}();

exports.default = saveImage;
module.exports = exports["default"];