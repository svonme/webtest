"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _phantomPool = require("phantom-pool");

var _phantomPool2 = _interopRequireDefault(_phantomPool);

var _login2 = require("./login");

var _login3 = _interopRequireDefault(_login2);

var _capture = require("./capture");

var _capture2 = _interopRequireDefault(_capture);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//登录模块
var routers = [];

// 连接池

//抓图
var pool = (0, _phantomPool2.default)({
    max: 10, // 最多 10 个
    min: 2, // 最少 2  个
    idleTimeoutMillis: 30000 });

function main(url, log, callback) {
    var _this = this;

    //入口地址
    pool.use(function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(instance) {
            var login, page;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            login = new _login3.default(instance, log);
                            _context.next = 3;
                            return login.start(url);

                        case 3:
                            page = _context.sent;
                            return _context.abrupt("return", page);

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }()).then(function (res) {
        callback(res);
    }).catch(function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(e) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return pool.drain();

                        case 2:
                            _context2.next = 4;
                            return pool.clear();

                        case 4:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }());
}

var test = exports.test = function () {
    function test() {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, test);

        this.console = {
            text: [],
            info: [],
            error: [],
            network: [],
            loadStarted: [],
            loadFinished: [],
            stop: []
        };
        var _console = this.console;
        this.log = {};
        (0, _keys2.default)(_console).forEach(function (key) {
            _this2.log[key] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                _console[key].forEach(function (item) {
                    return item.apply(undefined, args);
                });
            };
        });
    }
    //开始测试


    (0, _createClass3.default)(test, [{
        key: "phStart",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref4) {
                var _this3 = this;

                var url = _ref4.url;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                this.log.info("\u5F00\u59CB\u6D4B\u8BD5 \uFF1A " + url);
                                return _context4.abrupt("return", new _promise2.default(function (resolve) {
                                    new main(url, _this3.log, function () {
                                        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(res) {
                                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            if (res) {
                                                                _this3.page = res;
                                                            }
                                                            _context3.next = 3;
                                                            return _this3.getInfo();

                                                        case 3:
                                                            resolve(!!res);

                                                        case 4:
                                                        case "end":
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee3, _this3);
                                        }));

                                        return function (_x4) {
                                            return _ref5.apply(this, arguments);
                                        };
                                    }());
                                }));

                            case 2:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function phStart(_x3) {
                return _ref3.apply(this, arguments);
            }

            return phStart;
        }()
        //保存快照信息

    }, {
        key: "phSave",
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!this.page) {
                                    _context5.next = 4;
                                    break;
                                }

                                return _context5.abrupt("return", new _capture2.default(this.page, this.log));

                            case 4:
                                return _context5.abrupt("return", false);

                            case 5:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function phSave() {
                return _ref6.apply(this, arguments);
            }

            return phSave;
        }()
        //停止测试

    }, {
        key: "phStop",
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return pool.drain();

                            case 2:
                                _context6.next = 4;
                                return pool.clear();

                            case 4:
                                return _context6.abrupt("return", true);

                            case 5:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function phStop() {
                return _ref7.apply(this, arguments);
            }

            return phStop;
        }()
        //切换路由模块

    }, {
        key: "phModuleChange",
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(module) {
                var _this4 = this;

                var that;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                that = this;

                                this.log.text("\u6D4B\u8BD5\u6A21\u5757 \uFF1A " + module);

                                if (!this.page) {
                                    _context7.next = 6;
                                    break;
                                }

                                (function () {
                                    var filePath = _path2.default.join(__dirname, "modules/" + module);
                                    _this4.page.evaluate(function (key, r) {
                                        // 通过修改 hash 值来切换路由
                                        // 添加一个随机数，避免页面不重新加载资源
                                        window.location.hash = "#/" + key + "?random=" + r;
                                    }, module, parseInt(Math.random() * 10000, 10));

                                    _fs2.default.exists(filePath, function (exists) {
                                        if (exists) {
                                            var _module = require(filePath);
                                            // new module(page);
                                        } else {
                                            that.log.info("\u6A21\u5757 " + module + " \u6CA1\u6709\u5BF9\u5E94\u7684\u6D4B\u8BD5\u811A\u672C, \u65E0\u6CD5\u5355\u5143\u6D4B\u8BD5\uFF0C\u76EE\u524D\u53EA\u80FD\u4FDD\u5B58\u5FEB\u7167");
                                        }
                                    });
                                })();

                                _context7.next = 7;
                                break;

                            case 6:
                                return _context7.abrupt("return", false);

                            case 7:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function phModuleChange(_x5) {
                return _ref8.apply(this, arguments);
            }

            return phModuleChange;
        }()
        //登录模块

    }, {
        key: "phLogin",
        value: function phLogin(username, password) {
            if (this.page) {
                this.log.info("模拟登录");
                this.log.info("\u7528\u6237\u540D : " + username + "  \u5BC6\u7801 : " + password);
                this.page.evaluate(function (name, pass) {
                    window['$'](function () {
                        document.querySelector("#username").value = name;
                        document.querySelector("#password").value = pass;
                        console.log("开始模拟登录");
                        var _Login = window['Login'];
                        var _login = new _Login('#username', '#password', '#loginSubmit');
                        //模拟登陆
                        _login.getData();
                    });
                }, username, password);
            } else {
                this.log.error("\u6A21\u5757\u52A0\u8F7D\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
            }
        }
        //获取页面路由模块

    }, {
        key: "phGetRouter",
        value: function phGetRouter() {
            var _this5 = this;

            return new _promise2.default(function () {
                var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(resolve) {
                    return _regenerator2.default.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    if (!_this5.page) {
                                        _context9.next = 4;
                                        break;
                                    }

                                    return _context9.delegateYield(_regenerator2.default.mark(function _callee8() {
                                        var content, $, $menu, $as;
                                        return _regenerator2.default.wrap(function _callee8$(_context8) {
                                            while (1) {
                                                switch (_context8.prev = _context8.next) {
                                                    case 0:
                                                        _context8.next = 2;
                                                        return _this5.page.property('content');

                                                    case 2:
                                                        content = _context8.sent;

                                                        _this5.log.text("分析页面数据 开始抓取模块路由数据");
                                                        $ = _cheerio2.default.load(content);
                                                        $menu = $(".side-menu", "#sidebar-menu");
                                                        $as = $("a", $menu);
                                                        //把所有的路由地址获取到

                                                        $as.each(function (i, ele) {
                                                            var href = $as.eq(i).attr('href') || void 0;
                                                            if (href) {
                                                                routers.push({
                                                                    "hash": href.replace(/^#+\//, ""),
                                                                    "text": $as.eq(i).text()
                                                                });
                                                            }
                                                        });
                                                        _this5.log.text("抓取完毕，即将输出到页面中，提供给模块测试");
                                                        resolve(routers);

                                                    case 10:
                                                    case "end":
                                                        return _context8.stop();
                                                }
                                            }
                                        }, _callee8, _this5);
                                    })(), "t0", 2);

                                case 2:
                                    _context9.next = 6;
                                    break;

                                case 4:
                                    _this5.log.error("\u6A21\u5757\u52A0\u8F7D\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
                                    resolve(false);

                                case 6:
                                case "end":
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, _this5);
                }));

                return function (_x6) {
                    return _ref9.apply(this, arguments);
                };
            }());
        }
    }, {
        key: "getInfo",
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
                var href, size, location;
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                if (!this.page) {
                                    _context10.next = 11;
                                    break;
                                }

                                _context10.next = 3;
                                return this.page.property('url');

                            case 3:
                                href = _context10.sent;
                                _context10.next = 6;
                                return this.page.property('viewportSize');

                            case 6:
                                size = _context10.sent;
                                location = (0, _url2.default)(href, true);

                                console.log(href);
                                console.log(size);
                                console.log(location);

                            case 11:
                                return _context10.abrupt("return", void 0);

                            case 12:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function getInfo() {
                return _ref10.apply(this, arguments);
            }

            return getInfo;
        }()
    }]);
    return test;
}();