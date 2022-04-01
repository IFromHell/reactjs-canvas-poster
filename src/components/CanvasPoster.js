/*
 * @Author: foxfly
 * @Contact: 617903352@qq.com
 * @Date: 2022-03-21 09:58:11
 * @Description: canvas生成分享海报
 */
import { useEffect, useRef, useState } from 'react';
import { View, Canvas, createSelectorQuery, canvasToTempFilePath, getSystemInfoSync } from 'remax/wechat';

import QR from './util/qrcode';

/**
 * @param {Object} visible  是否显示
 * @param {String} saveType  保存类型， toDataURL / tempFilePath(默认)
 * @param {Function} onSuccess  成功回调
 * @param {Function} onFail  失败回调
 */
export default ({
    painting = {},
    saveType,
    onSuccess,
    onFail,
}) => {
    const pixelRatio = getSystemInfoSync().pixelRatio;
    const [flag, setFlag] = useState(false);
    const [_canvas, _ctx, inter] = [
        useRef(null),
        useRef(null),
        useRef(undefined),
    ];

    const canvas = _canvas.current;
    const ctx = _ctx.current;

    // 开始绘制
    const handlePaint = () => {
        const { width, height } = painting;

        inter.current = setInterval(() => {
            const query = createSelectorQuery();
            query.select('#shareimg').node(res => {
                if (!res.node) return;

                _canvas.current = res.node;
                _canvas.current.width = width * pixelRatio;
                _canvas.current.height = height * pixelRatio;

                _ctx.current = _canvas.current?.getContext('2d');
                if (_ctx.current) {
                    clearInterval(inter.current);
                    // 重新绘图
                    _ctx.current?.clearRect(0, 0, _canvas.current.width, _canvas.current.height);
                    _ctx.current?.save();

                    setFlag(true);
                }
            }).exec();
        }, 200);
    };

    const getViews = () => {
        const { views } = painting;
        const attrs = [
            'width', 'height', 'radius',
            'top', 'left', 'right', 'bottom',
            'fontSize', 'lineHeight',
        ];

        const list = [];

        for (const v of views) {
            const json = { ...v };

            for (const k of attrs) {
                if (!json[k]) continue;

                json[k] = v[k];
                const type = Typeof(v[k]);

                if (type === 'number') {
                    json[k] = json[k] * pixelRatio;
                }
                if (type === 'array') {
                    json[k] = v[k].map(num => num * pixelRatio);
                }
            }
            list.push(json);
        }

        return list;
    };

    // 加载图片
    const loadAllImages = (views) => {
        const imageList = [];
        views.forEach((item, i) => {
            if (item && item.type === 'image') {
                imageList.push(loadImage(canvas, item.url));
            }
        });

        return Promise.all(imageList).then(res => {
            startPainting(res, views);
        }).catch((err) => {
            onFail && onFail(err);
        });
    };

    // 绘制
    const startPainting = async (imageList, views) => {
        let imageIndex = 0;
        for (const item of views) {
            if (!item) continue;
            if (item.type === 'rect') drawRect(ctx, item);
            if (item.type === 'text') drawText(ctx, item);
            if (item.type === 'gradient') drawGradient(ctx, item);
            if (item.type === 'qrcode') drawQRCode(ctx, item);
            if (item.type === 'image') {
                drawImage(ctx, {
                    ...item,
                    img: imageList[imageIndex]
                });
                imageIndex++;
            }
        }

        if (saveType === 'toDataURL') {
            const base64 = canvas?.toDataURL("image/png");
            if (base64) return onSuccess?.(base64);
            return onFail?.('toDataURL error.');
        }

        try {
            const res = await canvasToTempFilePath({
                x: 0,
                y: 0,
                width: canvas?.width,
                height: canvas?.height,
                canvas: canvas,
            });

            onSuccess?.(res.tempFilePath);
        } catch (err) {
            onFail?.(err);
        }
    };

    useEffect(async () => {
        if (!flag) return;

        const views = getViews();
        await loadAllImages(views);
        setFlag(false);
    }, [flag]);

    useEffect(() => {
        handlePaint();
        return () => clearInterval(inter.current);
    }, []);

    return <View style={{ transform: `translateX(100vw)` }}>
        <Canvas type='2d' id="shareimg" style={{
            width: painting.width * pixelRatio,
            height: painting.height * pixelRatio,
        }}>你的浏览器还不支持哦</Canvas>
    </View>;
};

const classType = {};
["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"].forEach(e => (classType[`[object ${e}]`] = e.toLowerCase()));
export const Typeof = obj => {
    if (obj === null) return 'null';
    return typeof obj === 'object' || typeof obj === 'function' ? classType[classType.toString.call(obj)] || 'object' : typeof obj;
};

/**
 * @description: 加载图片
 * @param {Object | String} url  图片资源
 */
const loadImage = (canvas, url) => {
    return new Promise((resolve, reject) => {
        const image = canvas?.createImage();
        image.setAttribute?.('crossorigin', 'anonymous');
        image.onload = () => resolve(image);
        image.onerror = (err) => reject(err);
        image.src = url;
    });
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
const drawRect = (ctx, params) => {
    ctx.save();

    const {
        top = 0, left = 0,
        width = 0, height = 0,
        radius = 0, deg = 0,
        background = 'white', border
    } = params;

    ctx.fillStyle = background;
    if (radius) {
        _doClip(ctx, left, top, width, height, radius, border);
    } else {
        if (deg !== 0) {
            _doRoate(ctx, left, top, height, width, deg);
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
const drawImage = (ctx, params) => {
    ctx.save();

    const {
        img,
        top = 0, left = 0,
        width = 0, height = 0,
        radius = 0, deg = 0,
        background = 'transparent', border,
    } = params;

    if (radius) {
        ctx.fillStyle = background;
        _doClip(ctx, left, top, width, height, radius, border);
        ctx.clip();
    }
    if (deg !== 0) {
        _doRoate(ctx, left, top, width, height, deg);
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
 *   @param {Number} fontStyle  字体样式  默认：normal
 *   @param {Number} fontVariant  字体异体  默认：默认：normal
 *   @param {Number} fontWeight  字体粗细  默认：500
 *   @param {Number} fontSize  字体大小  默认：16
 *   @param {Number} fontFamily  字体  默认：sans-serif
 *   @param {String} color  文本颜色  默认：black
 *   @param {String} textAlign  文本对齐方式  默认：left。字体居中需要设置 left 值。比如：图片宽度 100,left:50,textAlign:'center' 即可居中
 *   @param {String} lineHeight  行高（多行时起作用）  默认：20
 *   @param {Boolean} breakWord  换行  默认：false
 *   @param {Number} maxLines 最大行数，默认：2. 根据width(宽度)换行 ,需要设置 breakWord: true ,超出行隐藏显示为...
 *   @param {Boolean} bolder  加粗  默认：false
 *   @param {String} textDecoration  下划线装饰 underline(下划线)、line-through(贯穿线)
 */
const drawText = (ctx, params) => {
    ctx.save();

    const {
        maxLines = 2,
        breakWord = false,
        color = 'black',
        content = '',
        fontStyle = 'normal',
        fontVariant = 'normal',
        fontWeight = '500',
        fontSize = 16,
        fontFamily = 'sans-serif',
        top = 0,
        left = 0,
        lineHeight = 20,
        textAlign = 'left',
        width,
        bolder = false,
        textDecoration = 'none'
    } = params;

    ctx.beginPath();
    // ctx.textBaseline = 'top'
    ctx.textBaseline = "Bottom";
    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    //  ctx.font = "normal 36px Arial";
    // ctx.font = `normal ${fontSize}px "Gill Sans Extrabold", sans-serif`;
    // ${fontStyle} ${fontVariant}
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px/${lineHeight}px "${fontFamily}"`;
    //  top + fontSize  解决 ctx.textBaseline = 'top'问题
    const textTop = top + fontSize;

    if (!breakWord) {
        ctx.fillText(content, left, textTop);
        drawTextLine(ctx, left, textTop, textDecoration, color, fontSize, content);
    } else {
        let fillText = '';
        let fillTop = textTop;
        let lineNum = 1;

        for (let i = 0; i < content.length; i++) {
            fillText += [content[i]];
            if (ctx.measureText(fillText).width > width) {
                if (lineNum === maxLines) {
                    if (i !== content.length) {
                        fillText = fillText.substring(0, fillText.length - 1) + '...';
                        ctx.fillText(fillText, left, fillTop);
                        drawTextLine(ctx, left, fillTop, textDecoration, color, fontSize, fillText);

                        fillText = '';
                        break;
                    }
                }

                ctx.fillText(fillText, left, fillTop);
                drawTextLine(ctx, left, fillTop, textDecoration, color, fontSize, fillText);

                fillText = '';
                fillTop += lineHeight;
                lineNum++;
            }
        }

        ctx.fillText(fillText, left, fillTop);
        drawTextLine(ctx, left, fillTop, textDecoration, color, fontSize, fillText);
    }

    ctx.restore();
    if (bolder) drawText(ctx, {
        ...params,
        left: left + 0.3,
        top: top + 0.3,
        bolder: false,
        textDecoration: 'none'
    });
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
const drawQRCode = (ctx, params) => {
    ctx.save();
    const { width = 0, height = 0, left = 0, top = 0, content, background, color } = params;
    QR.api.draw(content, ctx, left, top, width, height, background, color);
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
const drawGradient = (ctx, params) => {
    const {
        width = 0, height = 0,
        left = 0, top = 0,
        deg = 0, radius = 0,
        gradType = 'linear',
        startCoordinate, endCoordinate,
        addColorArr
    } = params;
    if (!Array.isArray(addColorArr)) return false;

    ctx.save();

    let gradient = null;
    if (gradType === 'radial') {
        // const [x0, y0, r0] = startCoordinate;
        // const [x1, y1, r1] = endCoordinate;
        gradient = ctx.createRadialGradient(...startCoordinate, ...endCoordinate);
    } else {
        // const [x0, y0] = startCoordinate;
        // const [x1, y1] = endCoordinate;
        gradient = ctx.createLinearGradient(...startCoordinate, ...endCoordinate);
    }
    addColorArr.forEach(item => {
        const [offset, color] = item;
        gradient.addColorStop(offset, color);
    });
    drawRect(ctx, {
        width, height,
        left, top,
        radius, background: gradient, deg
    });
    ctx.restore();
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
const drawTextLine = (ctx, ...params) => {
    const [left, top, textDecoration, color, fontSize, content] = params;

    if (textDecoration === 'underline') {
        drawRect(ctx, {
            background: color,
            top: top,
            left: left - 1,
            width: ctx.measureText(content).width + 3,
            height: 1
        });
    } else if (textDecoration === 'line-through') {
        drawRect(ctx, {
            background: color,
            top: top - fontSize / 3,
            left: left - 1,
            width: ctx.measureText(content).width + 3,
            height: 1
        });
    }
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
const _doClip = (ctx, ...params) => {
    const [left, top, width, height, radius, border = ''] = params;
    const [x, y, w, h, r = 0] = [left, top, width, height, radius];
    const [
        topLeftRadius,
        topRightRadius,
        bottomRightRadius,
        BottomLeftRadius
    ] = Array.isArray(r) ? r : [r, r, r, r];
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

    ctx.moveTo(x + topLeftRadius, y);

    // 右上
    ctx.lineTo(x + w - topRightRadius, y);
    ctx.arcTo(x + w, y, x + w, y + topRightRadius, topRightRadius);

    // 右下
    ctx.lineTo(x + w, y + h - bottomRightRadius);
    ctx.arcTo(
        x + w,
        y + h,
        x + w - bottomRightRadius,
        y + h,
        bottomRightRadius
    );

    // 左下
    ctx.lineTo(x + BottomLeftRadius, y + h);
    ctx.arcTo(x, y + h, x, y + h - BottomLeftRadius, BottomLeftRadius);

    // 左上
    ctx.lineTo(x, y + topLeftRadius);
    ctx.arcTo(x, y, x + topLeftRadius, y, topLeftRadius);
    ctx.fill();

    if (border) {
        const [borderWidth, borderColor = 'transparent'] = border; // , borderStyle
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
    }

    // ctx.strokeRect(x, y, w, h);
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
const _doRoate = (ctx, ...params) => {
    const [left, top, width, height, deg] = params;
    ctx.translate(left + width / 2, top + height / 2);
    ctx.rotate(deg * Math.PI / 180);
};
