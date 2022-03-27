"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _wechat = require("remax/wechat");

var _qrcode = _interopRequireDefault(require("./util/qrcode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {String} saveType  保存类型， toDataURL / tempFilePath(默认)
 * @param {Function} onSuccess  成功回调
 * @param {Function} onFail  失败回调
 */
var _default = function _default(_ref) {
  var _ref$painting = _ref.painting,
      painting = _ref$painting === void 0 ? {} : _ref$painting,
      saveType = _ref.saveType,
      onSuccess = _ref.onSuccess,
      onFail = _ref.onFail;
  var canvas = null;
  var ctx = null; // 开始绘制

  var handlePaint = function handlePaint() {
    var width = painting.width,
        height = painting.height,
        views = painting.views;
    console.log(123);
    var inter = setInterval(function () {
      var query = (0, _wechat.createSelectorQuery)();
      query.select('#shareimg').node(function (res) {
        canvas = res.node;
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        if (ctx) {
          clearInterval(inter); // 重新绘图

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          loadAllImages(views);
        }
      }).exec();
    }, 200);
  }; // 加载图片


  var loadAllImages = function loadAllImages(views) {
    var imageList = [];
    views.forEach(function (item, i) {
      if (item.type === 'image') {
        imageList.push(loadImage(item.url));
      }
    });
    Promise.all(imageList).then(function (res) {
      startPainting(res);
    })["catch"](function (err) {
      onFail && onFail(err);
    });
  }; // 绘制


  var startPainting = function startPainting(imageList) {
    var width = painting.width,
        height = painting.height,
        views = painting.views;
    var imageIndex = 0;
    views.forEach(function (item, i) {
      if (item.type === 'rect') {
        drawRect(item);
      } else if (item.type === 'image') {
        drawImage(_objectSpread(_objectSpread({}, item), {}, {
          img: imageList[imageIndex]
        }));
        imageIndex++;
      } else if (item.type === 'text') {
        drawText(item);
      } else if (item.type === 'qrcode') {
        drawQRCode(item);
      } else if (item.type === 'gradient') {
        drawGradient(item);
      }
    });
    setTimeout(function () {
      if (saveType === 'toDataURL') {
        var imageBase64 = canvas.toDataURL("image/png");

        if (imageBase64) {
          onSuccess && onSuccess(imageBase64);
        } else {
          onFail && onFail('');
        }

        return;
      }

      (0, _wechat.canvasToTempFilePath)({
        x: 0,
        y: 0,
        width: width,
        height: height,
        destWidth: width,
        destHeight: height,
        canvas: canvas,
        success: function success(res) {
          onSuccess && onSuccess(res.tempFilePath);
        },
        fail: function fail(err) {
          onFail && onFail(err);
        }
      });
    }, 200);
  };
  /**
   * @description: 绘制矩形
   * params
   *   @param {Number} left  x轴坐标
   *   @param {Number} top  y轴坐标
   *   @param {Number} width  宽度
   *   @param {Number} height  高度
   *   @param {Number | Array} radius  圆弧半径
   *   @param {String} background  背景，默认： white
   *   @param {Number} deg  旋转角度
   *   @param {Array} border  边框
   */


  var drawRect = function drawRect(params) {
    ctx.save();
    var _params$background = params.background,
        background = _params$background === void 0 ? 'white' : _params$background,
        _params$top = params.top,
        top = _params$top === void 0 ? 0 : _params$top,
        _params$left = params.left,
        left = _params$left === void 0 ? 0 : _params$left,
        _params$width = params.width,
        width = _params$width === void 0 ? 0 : _params$width,
        _params$height = params.height,
        height = _params$height === void 0 ? 0 : _params$height,
        _params$radius = params.radius,
        radius = _params$radius === void 0 ? 0 : _params$radius,
        _params$deg = params.deg,
        deg = _params$deg === void 0 ? 0 : _params$deg,
        border = params.border;
    ctx.fillStyle = background;

    if (radius) {
      _doClip(left, top, width, height, radius, border);
    } else {
      if (deg !== 0) {
        _doRoate(left, top, height, width, deg);

        ctx.fillRect(-width / 2, -height / 2, width, height);
      } else {
        ctx.fillRect(left, top, width, height);
      }
    }

    ctx.restore();
  };
  /**
   * @description: 绘制图片
   * params
   *   @param {Number} left  x轴坐标
   *   @param {Number} top  y轴坐标
   *   @param {Number} width  宽度
   *   @param {Number} height  高度
   *   @param {Number | Array} radius  圆弧半径
   *   @param {String} background  背景颜色，默认： transparent
   *   @param {Object} img  图片资源(本地资源或者网络资源)
   *   @param {Number} deg  旋转角度
   *   @param {Array} border  边框
   */


  var drawImage = function drawImage(params) {
    ctx.save();
    var img = params.img,
        _params$top2 = params.top,
        top = _params$top2 === void 0 ? 0 : _params$top2,
        _params$left2 = params.left,
        left = _params$left2 === void 0 ? 0 : _params$left2,
        _params$width2 = params.width,
        width = _params$width2 === void 0 ? 0 : _params$width2,
        _params$height2 = params.height,
        height = _params$height2 === void 0 ? 0 : _params$height2,
        _params$radius2 = params.radius,
        radius = _params$radius2 === void 0 ? 0 : _params$radius2,
        _params$background2 = params.background,
        background = _params$background2 === void 0 ? 'transparent' : _params$background2,
        _params$deg2 = params.deg,
        deg = _params$deg2 === void 0 ? 0 : _params$deg2,
        border = params.border;

    if (radius) {
      ctx.fillStyle = background;

      _doClip(left, top, width, height, radius, border);

      ctx.clip();
    }

    if (deg !== 0) {
      _doRoate(left, top, width, height, deg);

      ctx.drawImage(img, -width / 2, -height / 2, width, height);
    } else {
      ctx.drawImage(img, left, top, width, height);
    }

    ctx.restore();
  };
  /**
   * @description: 绘制文本
   * params
   *   @param {Number} left  x轴坐标  默认：0
   *   @param {Number} top  y轴坐标  默认：0
   *   @param {Number} width  文本宽度  默认：0
   *   @param {String} content  文本内容  默认：''
   *   @param {Number} fontSize  字体大小  默认：16
   *   @param {String} color  文本颜色  默认：black
   *   @param {String} textAlign  文本对齐方式  默认：left。字体居中需要设置 left 值。比如：图片宽度 100,left:50,textAlign:'center' 即可居中
   *   @param {String} lineHeight  行高（多行时起作用）  默认：20
   *   @param {Boolean} breakWord  换行  默认：false
   *   @param {Number} maxLineNumber 最大行数，默认：2. 根据width(宽度)换行 ,需要设置 breakWord: true ,超出行隐藏显示为...
   *   @param {Boolean} bolder  加粗  默认：false
   *   @param {String} textDecoration  下划线装饰 underline(下划线)、line-through(贯穿线)
   */


  var drawText = function drawText(params) {
    ctx.save();
    var _params$maxLineNumber = params.maxLineNumber,
        maxLineNumber = _params$maxLineNumber === void 0 ? 2 : _params$maxLineNumber,
        _params$breakWord = params.breakWord,
        breakWord = _params$breakWord === void 0 ? false : _params$breakWord,
        _params$color = params.color,
        color = _params$color === void 0 ? 'black' : _params$color,
        _params$content = params.content,
        content = _params$content === void 0 ? '' : _params$content,
        _params$fontSize = params.fontSize,
        fontSize = _params$fontSize === void 0 ? 16 : _params$fontSize,
        _params$top3 = params.top,
        top = _params$top3 === void 0 ? 0 : _params$top3,
        _params$left3 = params.left,
        left = _params$left3 === void 0 ? 0 : _params$left3,
        _params$lineHeight = params.lineHeight,
        lineHeight = _params$lineHeight === void 0 ? 20 : _params$lineHeight,
        _params$textAlign = params.textAlign,
        textAlign = _params$textAlign === void 0 ? 'left' : _params$textAlign,
        width = params.width,
        _params$bolder = params.bolder,
        bolder = _params$bolder === void 0 ? false : _params$bolder,
        _params$textDecoratio = params.textDecoration,
        textDecoration = _params$textDecoratio === void 0 ? 'none' : _params$textDecoratio;
    ctx.beginPath(); // ctx.textBaseline = 'top'

    ctx.textBaseline = "Bottom";
    ctx.textAlign = textAlign;
    ctx.fillStyle = color; //  ctx.font = "normal 36px Arial";

    ctx.font = "normal ".concat(fontSize, "px Arial"); //  top + fontSize  解决 ctx.textBaseline = 'top'问题

    var textTop = top + fontSize;

    if (!breakWord) {
      ctx.fillText(content, left, textTop);
      drawTextLine(left, textTop, textDecoration, color, fontSize, content);
    } else {
      var fillText = '';
      var fillTop = textTop;
      var lineNum = 1;

      for (var i = 0; i < content.length; i++) {
        fillText += [content[i]];

        if (ctx.measureText(fillText).width > width) {
          if (lineNum === maxLineNumber) {
            if (i !== content.length) {
              fillText = fillText.substring(0, fillText.length - 1) + '...';
              ctx.fillText(fillText, left, fillTop);
              drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
              fillText = '';
              break;
            }
          }

          ctx.fillText(fillText, left, fillTop);
          drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
          fillText = '';
          fillTop += lineHeight;
          lineNum++;
        }
      }

      ctx.fillText(fillText, left, fillTop);
      drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
    }

    ctx.restore();

    if (bolder) {
      drawText(_objectSpread(_objectSpread({}, params), {}, {
        left: left + 0.3,
        top: top + 0.3,
        bolder: false,
        textDecoration: 'none'
      }));
    }
  };
  /**
   * @description: 绘制二维码
   * params
   *   @param {Number} left  x轴坐标  默认：0
   *   @param {Number} top  y轴坐标  默认：0
   *   @param {Number} width  宽度  默认：0
   *   @param {Number} height  高度  默认：0
   *   @param {String} content  二维码内容
   *   @param {String} background  背景颜色 默认：white
   *   @param {String} color  码颜色 默认：black
   */


  var drawQRCode = function drawQRCode(params) {
    ctx.save();
    var _params$width3 = params.width,
        width = _params$width3 === void 0 ? 0 : _params$width3,
        _params$height3 = params.height,
        height = _params$height3 === void 0 ? 0 : _params$height3,
        _params$left4 = params.left,
        left = _params$left4 === void 0 ? 0 : _params$left4,
        _params$top4 = params.top,
        top = _params$top4 === void 0 ? 0 : _params$top4,
        content = params.content,
        background = params.background,
        color = params.color;

    _qrcode["default"].api.draw(content, ctx, left, top, width, height, background, color);

    ctx.restore();
  };
  /**
   * @description: 绘制渐变矩形
   * params
   *   @param {Number} left  x轴坐标  默认：0
   *   @param {Number} top  y轴坐标  默认：0
   *   @param {Number} width  宽度  默认：0
   *   @param {Number} height  高度  默认：0
   *   @param {Number} deg  高度  默认：旋转角度
   *   @param {Number | Array} radius  圆角  默认：0
   *   @param {String} gradType  渐变类型  linear（线性渐变）、radial（径向渐变）
   *   @param {Array} startCoordinate  开始坐标  linear： (x0, y0)；radial： (x0, y0, r0)
   *   @param {Array} endCoordinate  结束坐标   linear： (x1, y1)；radial： (x1, y1, r1)
   *   @param {Array} addColorArr  填充的颜色值   [[0, 'green'], [.5, 'yellow'], [1, 'red']]
   */


  var drawGradient = function drawGradient(params) {
    var _params$width4 = params.width,
        width = _params$width4 === void 0 ? 0 : _params$width4,
        _params$height4 = params.height,
        height = _params$height4 === void 0 ? 0 : _params$height4,
        _params$left5 = params.left,
        left = _params$left5 === void 0 ? 0 : _params$left5,
        _params$top5 = params.top,
        top = _params$top5 === void 0 ? 0 : _params$top5,
        _params$deg3 = params.deg,
        deg = _params$deg3 === void 0 ? 0 : _params$deg3,
        _params$radius3 = params.radius,
        radius = _params$radius3 === void 0 ? 0 : _params$radius3,
        _params$gradType = params.gradType,
        gradType = _params$gradType === void 0 ? 'linear' : _params$gradType,
        startCoordinate = params.startCoordinate,
        endCoordinate = params.endCoordinate,
        addColorArr = params.addColorArr;
    if (!Array.isArray(addColorArr)) return false;
    ctx.save();
    var gradient = null;

    if (gradType === 'radial') {
      var _ctx;

      // const [x0, y0, r0] = startCoordinate;
      // const [x1, y1, r1] = endCoordinate;
      gradient = (_ctx = ctx).createRadialGradient.apply(_ctx, _toConsumableArray(startCoordinate).concat(_toConsumableArray(endCoordinate)));
    } else {
      var _ctx2;

      // const [x0, y0] = startCoordinate;
      // const [x1, y1] = endCoordinate;
      gradient = (_ctx2 = ctx).createLinearGradient.apply(_ctx2, _toConsumableArray(startCoordinate).concat(_toConsumableArray(endCoordinate)));
    }

    addColorArr.forEach(function (item) {
      var _item = _slicedToArray(item, 2),
          offset = _item[0],
          color = _item[1];

      gradient.addColorStop(offset, color);
    });
    drawRect({
      width: width,
      height: height,
      left: left,
      top: top,
      radius: radius,
      background: gradient,
      deg: deg
    });
    ctx.restore();
  };
  /**
   * @description: 加载图片
   * @param {Object | String} url  图片资源
   */


  var loadImage = function loadImage(url) {
    return new Promise(function (resolve, reject) {
      var image = canvas.createImage();
      image.setAttribute('crossorigin', 'anonymous');

      image.onload = function () {
        return resolve(image);
      };

      image.onerror = function (err) {
        return reject(err);
      };

      image.src = url;
    });
  };
  /**
   * @description: 裁剪
   * @param {Number} left  x轴坐标
   * @param {Number} top  y轴坐标
   * @param {Number} width  宽度
   * @param {Number} height  高度
   * @param {Number | Array} radius  圆弧半径
   * @param {Array} border  边框
   */


  var _doClip = function _doClip() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var left = params[0],
        top = params[1],
        width = params[2],
        height = params[3],
        radius = params[4],
        _params$ = params[5],
        border = _params$ === void 0 ? '' : _params$;
    var x = left,
        y = top,
        w = width,
        h = height,
        _radius = radius,
        r = _radius === void 0 ? 0 : _radius;

    var _ref2 = Array.isArray(r) ? r : [r, r, r, r],
        _ref3 = _slicedToArray(_ref2, 4),
        topLeftRadius = _ref3[0],
        topRightRadius = _ref3[1],
        bottomRightRadius = _ref3[2],
        BottomLeftRadius = _ref3[3];
    /**
     * 1. 移动到圆弧起点
     * 2. 绘制上直线
     * 3. 绘制右上角圆弧
     * 4. 绘制右直线
     * 5. 绘制右下圆弧
     * 6. 绘制下直线
     * 7. 绘制左下圆弧
     * 8. 绘制左直线
     * 9. 绘制左上圆弧
     */


    ctx.beginPath();
    ctx.moveTo(x + topLeftRadius, y); // 右上

    ctx.lineTo(x + w - topRightRadius, y);
    ctx.arcTo(x + w, y, x + w, y + topRightRadius, topRightRadius); // 右下

    ctx.lineTo(x + w, y + h - bottomRightRadius);
    ctx.arcTo(x + w, y + h, x + w - bottomRightRadius, y + h, bottomRightRadius); // 左下

    ctx.lineTo(x + BottomLeftRadius, y + h);
    ctx.arcTo(x, y + h, x, y + h - BottomLeftRadius, BottomLeftRadius); // 左上

    ctx.lineTo(x, y + topLeftRadius);
    ctx.arcTo(x, y, x + topLeftRadius, y, topLeftRadius);
    ctx.fill();

    if (border) {
      var _border = _slicedToArray(border, 2),
          borderWidth = _border[0],
          _border$ = _border[1],
          borderColor = _border$ === void 0 ? 'transparent' : _border$; // , borderStyle


      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    } // ctx.strokeRect(x, y, w, h);
    // ctx.clip();
    // ctx.fillStyle = background;
    // ctx.fillRect(left, top, width, height);


    ctx.closePath();
  };
  /**
   * @description: 旋转
   * @param {Number} left  x轴坐标
   * @param {Number} top  y轴坐标
   * @param {Number} width  宽度
   * @param {Number} height  高度
   * @param {Number} deg  角度
   */


  var _doRoate = function _doRoate(left, top, width, height, deg) {
    ctx.translate(left + width / 2, top + height / 2);
    ctx.rotate(deg * Math.PI / 180);
  };
  /**
   * @description: 画直线
   * @param {Number} left  x轴坐标
   * @param {Number} top  y轴坐标
   * @param {String} textDecoration  线条样式  underline(下划线)、line-through(贯穿线)
   * @param {String} color    线条颜色
   * @param {Number} fontSize  字体大小
   * @param {String} content  内容
   */


  var drawTextLine = function drawTextLine() {
    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    var left = params[0],
        top = params[1],
        textDecoration = params[2],
        color = params[3],
        fontSize = params[4],
        content = params[5];

    if (textDecoration === 'underline') {
      drawRect({
        background: color,
        top: top,
        left: left - 1,
        width: ctx.measureText(content).width + 3,
        height: 1
      });
    } else if (textDecoration === 'line-through') {
      drawRect({
        background: color,
        top: top - fontSize / 3,
        left: left - 1,
        width: ctx.measureText(content).width + 3,
        height: 1
      });
    }
  };

  (0, _react.useEffect)(function () {
    handlePaint();
  }, [painting]);
  return /*#__PURE__*/_react["default"].createElement(_wechat.View, null, /*#__PURE__*/_react["default"].createElement(_wechat.Canvas, {
    type: "2d",
    id: "shareimg",
    style: {
      display: 'none'
    }
  }, "\u4F60\u7684\u6D4F\u89C8\u5668\u8FD8\u4E0D\u652F\u6301\u54E6"));
};

exports["default"] = _default;