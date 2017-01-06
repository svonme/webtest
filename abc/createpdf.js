"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createpdf = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _pdfkit = require("pdfkit");

var _pdfkit2 = _interopRequireDefault(_pdfkit);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//时间格式化
function Format(time, format) {
	var date = new Date(time);
	format || (format = 'yyyy-MM-dd hh:mm:ss');
	var map = {
		"M": date.getMonth() + 1, //月
		"d": date.getDate(), //日
		"h": date.getHours(), //小时
		"m": date.getMinutes(), //分
		"s": date.getSeconds(), //秒
		"q": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
		var v = map[t];
		if (v !== undefined) {
			if (all.length > 1) {
				v = '0' + v;
				v = v.substr(v.length - 2);
			}
			return v;
		} else if (t === 'y') {
			return (date.getFullYear() + '').substr(4 - all.length);
		}
		return all;
	});
	return format;
}

var createpdf =
// let logs = {
// 	"text" : [],          //消息日志
// 	"info" : [],          //重要的测试日志
// 	"network"      : [],  //网络资源
// 	"loadStarted"  : [],  //请求开始时间
// 	"loadFinished" : []   //请求结束时间
// };
function createpdf(info, logs, routerData) {
	(0, _classCallCheck3.default)(this, createpdf);
	var viewportSize = info.viewportSize,
	    pathname = info.pathname,
	    router = info.router,
	    location = info.location,
	    url = info.url,
	    image = info.image,
	    time = info.time;
	var loadStarted = logs.loadStarted,
	    loadFinished = logs.loadFinished,
	    network = logs.network,
	    text = logs.text,
	    infoMessage = logs.info;

	var routeritem = {
		text: "",
		hash: router['pathname']
	};
	for (var i = 0, len = routerData.length; i < len; i++) {
		var item = routerData[i];
		if (item['hash'] == router['pathname']) {
			(0, _assign2.default)(routeritem, item);
			break;
		}
	}
	var basis = ["\u62A5\u544A\u65F6\u95F4 : " + Format(time), "\u6D4B\u8BD5\u5730\u5740 : " + url, "\u5FEB\u7167\u540D\u79F0 : " + image, "\u6D4B\u8BD5\u6A21\u5757 : " + routeritem['text'] + " / " + routeritem['hash'], "\u8BF7\u6C42\u5F00\u59CB\u65F6\u95F4 : " + Format(loadStarted[0]), "\u8BF7\u6C42\u7ED3\u675F\u65F6\u95F4 : " + Format(loadFinished[0]), "\u8BF7\u6C42\u603B\u8FC7\u7528\u65F6 : " + (loadFinished[0] - loadStarted[0]) / 1000 + "\u79D2"];
	return new _promise2.default(function (resolve) {
		var src = image.replace(/jpg$/, "pdf");
		var doc = new _pdfkit2.default();
		doc.pipe(_fs2.default.createWriteStream("./save/" + src));
		doc.font('fonts/msyh.ttf').fontSize(14).text(basis.join("\n\n"), 50, 50);

		doc.addPage().fontSize(14).image("./save/" + image, {
			fit: [500, 600],
			align: 'center',
			valign: 'center'
		});

		var page = doc.addPage();
		page.fontSize(14);
		// 所有网络资源
		network.forEach(function (data) {
			var url = data.url,
			    startTime = data.startTime,
			    endTime = data.endTime;

			page.text(["\u7F51\u7EDC\u8D44\u6E90 : " + url, "           \u5F00\u59CB\u65F6\u95F4 : " + Format(startTime), "           \u7ED3\u675F\u65F6\u95F4 : " + Format(endTime), "           \u8BF7\u6C42\u7528\u65F6 : " + (endTime - startTime) / 1000 + "\u79D2\n\n"].join("\n"));
		});
		// 所有消息日志
		text.forEach(function (data) {
			if (data instanceof Object) {
				data = (0, _stringify2.default)(data);
			}
			page.text("\u6D88\u606F : " + data + "\n\n");
		});
		setTimeout(function () {
			doc.end();
			resolve(src);
		}, 0);
	});
};

exports.createpdf = createpdf;