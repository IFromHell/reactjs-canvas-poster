// @ts-nocheck
/*
 * @Author: foxfly
 * @Contact: 617903352@qq.com
 * @Date: 2022-03-21 09:58:11
 * @Description: canvas生成分享海报
 */
import React, { useEffect } from 'react';
import { View, Canvas, createSelectorQuery, canvasToTempFilePath } from 'remax/wechat';

import QR from './util/qrcode';

/**
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
    let canvas = null;
    let ctx = null;

    // 开始绘制
    const handlePaint = () => {
        const { width, height, views } = painting;
        console.log(123)
        const inter = setInterval(() => {
            const query = createSelectorQuery();
            query.select('#shareimg').node(res => {
                canvas = res.node;
                canvas.width = width;
                canvas.height = height;

                ctx = canvas.getContext('2d');

                if (ctx) {
                    clearInterval(inter);
                    // 重新绘图
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.save();
                    loadAllImages(views);
                }
            }).exec();
        }, 200);
    };

    // 加载图片
    const loadAllImages = (views) => {
        const imageList = [];
        views.forEach((item, i) => {
            if (item.type === 'image') {
                imageList.push(loadImage(item.url));
            }
        });
        Promise.all(imageList).then(res => {
            startPainting(res);
        }).catch((err) => {
            onFail && onFail(err);
        });
    };

    // 绘制
    const startPainting = (imageList) => {
        const { width, height, views } = painting;
        let imageIndex = 0;
        views.forEach((item, i) => {
            if (item.type === 'rect') {
                drawRect(item);
            } else if (item.type === 'image') {
                drawImage({
                    ...item,
                    img: imageList[imageIndex]
                });
                imageIndex++;
            } else if (item.type === 'text') {
                drawText(item);
            } else if (item.type === 'qrcode') {
                drawQRCode(item);
            } else if (item.type === 'gradient') {
                drawGradient(item);
            }
        });

        setTimeout(() => {

            if (saveType === 'toDataURL') {
                const imageBase64 = canvas.toDataURL("image/png");
                if (imageBase64) {
                    onSuccess && onSuccess(imageBase64);
                } else {
                    onFail && onFail('');
                }
                return;
            }
            
            canvasToTempFilePath({
                x: 0,
                y: 0,
                width: width,
                height: height,
                destWidth: width,
                destHeight: height,
                canvas: canvas,
                success(res) {
                    onSuccess && onSuccess(res.tempFilePath);
                },
                fail(err) {
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
    const drawRect = (params) => {
        ctx.save();
        const { background = 'white', top = 0, left = 0, width = 0, height = 0, radius = 0, deg = 0, border } = params;
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
    const drawImage = (params) => {
        ctx.save();
        const { img, top = 0, left = 0, width = 0, height = 0, radius = 0, background = 'transparent', deg = 0, border } = params;
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
    const drawText = (params) => {
        ctx.save();
        const {
            maxLineNumber = 2,
            breakWord = false,
            color = 'black',
            content = '',
            fontSize = 16,
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
        ctx.font = `normal ${fontSize}px Arial`;
        //  top + fontSize  解决 ctx.textBaseline = 'top'问题
        const textTop = top + fontSize;

        if (!breakWord) {
            ctx.fillText(content, left, textTop);
            drawTextLine(left, textTop, textDecoration, color, fontSize, content);
        } else {
            let fillText = '';
            let fillTop = textTop;
            let lineNum = 1;
            for (let i = 0; i < content.length; i++) {
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
            drawText({
                ...params,
                left: left + 0.3,
                top: top + 0.3,
                bolder: false,
                textDecoration: 'none'
            });
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
    const drawQRCode = (params) => {
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
    const drawGradient = (params) => {
        const { width = 0, height = 0, left = 0, top = 0, deg = 0, radius = 0, gradType = 'linear', startCoordinate, endCoordinate, addColorArr } = params;
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
            gradient =  ctx.createLinearGradient(...startCoordinate, ...endCoordinate);
        }
        addColorArr.forEach(item => {
            const [offset, color] = item;
            gradient.addColorStop(offset, color);
        });
        drawRect({
            width, height,
            left, top,
            radius, background: gradient, deg
        });
        ctx.restore();
    };

    /**
     * @description: 加载图片
     * @param {Object | String} url  图片资源
     */
    const loadImage = (url) => {
        return new Promise((resolve, reject) => {
            const image = canvas.createImage();
            image.setAttribute('crossorigin', 'anonymous');
            image.onload = () => resolve(image);
            image.onerror = (err) => reject(err);
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
    const _doClip = (...params) => {
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
    const _doRoate = (left, top, width, height, deg) => {
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
    const drawTextLine = (...params) => {
        const [left, top, textDecoration, color, fontSize, content] = params;
        
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

    useEffect(() => {
        handlePaint();
    }, [painting]);

    return <View>
        <Canvas type='2d' id="shareimg" style={{ display: 'none' }} >你的浏览器还不支持哦</Canvas>
    </View>;
};