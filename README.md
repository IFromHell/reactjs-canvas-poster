# reactjs-canvas-poster

此组件适用于reactjs平台，使用canvas API生成海报。

## 主要特性

- 绘制矩形（圆角、旋转、边框、背景色）；
- 绘制图片（圆角、旋转、边框、背景色）；
- 绘制文本（换行、超出内容省略号、中划线、下划线、文本加粗、文字缩进、文字颜色）；
- 绘制二维码；
- 绘制渐变矩形；

## 使用 reactjs-canvas-poster 的理由

1. **简单：** 使用类`css`属性的方式生成`canvas`图；
2. **易用：** 通过`npm`或者`yarn`安装，简单上手；
3. **无依赖** 无其他依赖库；
4. **高清** 可通过`widthPixels`设置生成图片尺寸，解决图片模糊问题。

## 安装

```shell
npm install reactjs-canvas-poster --save

or

yarn add reactjs-canvas-poster
```

## 使用

```JavaScript
import React, { useState } from 'react';

import CanvasPoster from 'reactjs-canvas-poster';

export default () => {
    const [imgurl, setImgUrl] = useState('');
    const [startDraw, setStartDraw] = useState(false);
    const [painting, setPainting] = useState([]);

    const generateShareImg = () => {
        const paintingData = {
            width: 300,
            height: 350,
            views: [
                {
                    type: 'rect',
                    width: 300,
                    height: 350,
                    top: 0,
                    left: 0,
                    background: 'white',
                    radius: 8,
                },
                {
                    type: 'text',
                    top: 30,
                    left: 15,
                    content: 'hellow reactjs-canvas-poster',
                    fontSize: 18,
                    lineHeight: 25,
                    width: 250,
                    breakWord: true,
                },
                {
                    type: 'text',
                    top: 60,
                    left: 15,
                    content: `作者：foxfly  2022-03-26`,
                    fontSize: 12,
                    lineHeight: 17,
                    width: 250,
                    breakWord: false,
                    MaxLineNumber: 1,
                    color: '#999',
                },
                {
                    type: 'image',
                    width: 270,
                    height: 126,
                    top: 90,
                    left: 15,
                    url: 'https://blogapi.mylifed.cn/storage/uploads/20211015/88eb2185b90010d857ca85ed3abb0abf.jpg',
                    radius: 6,
                },
                {
                    type: 'text',
                    top: 270,
                    left: 15,
                    content: `查看更多内容，请扫码~`,
                    fontSize: 12,
                    lineHeight: 17,
                    width: 70,
                    breakWord: true,
                    MaxLineNumber: 2,
                    color: '#999',
                },
                {
                    type: 'qrcode',
                    width: 80,
                    height: 80,
                    top: 240,
                    left: 200,
                    content: 'https://blogapi.mylifed.cn/foxfly',
                },
            ]
        };
        setPainting(paintingData);
        setStartDraw(true);
    };
    return (
        <div>
            <button onClick={() => generateShareImg()}>生成海报</button>

            {startDraw && <CanvasPoster painting={painting} onSuccess={(img) => setImgUrl(img)} />}
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                {imgurl && <img src={imgurl} style={{ width: painting?.width, height: painting?.height }} />}
            </div>
        </div >
    );
};
```

## API

### react-canvas-poster组件属性

| 属性名 | 说明 | 默认值 |
| :--- | :--- | :--- |
| saveType | 保存类型（toDataURL / tempFilePath） | tempFilePath |
| painting | 绘画数据，详细参数见 painting 参数说明 | [] |
| onSuccess | 成功回调方法 |  |
| onFail | 失败回调方法 | |


### painting 参数说明

| 属性名 | 说明 |
| :--- | :--- |
| width | canvas宽度 |
| height | canvas高度 |
| views | 绘画数据，详情见 views 参数说明 |

### views 参数说明

| 属性名 | 说明 | 默认值 |
| :--- | :--- | :--- |
| type | 绘画类型（rect: 矩形; image: 图片; text: 文本; qrcode: 二维码; gradient: 渐变矩形; ） | 无 |

### type: rect  参数说明

| 属性名 | 说明 | 参数类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| left | x轴坐标 | Number | 0 |
| top | y轴坐标 | Number | 0 |
| width | 宽度 | Number | 0 |
| height | 高度 | Number | 0 |
| radius | 圆弧半径 | Number, Array | 0 / [0, 0, 0, 0] |
| deg | 旋转角度 | Number | 0 |
| border | 边框 | Array | 0 |

### type: image  参数说明

| 属性名 | 说明 | 参数类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| left | x轴坐标 | Number | 0 |
| top | y轴坐标 | Number | 0 |
| width | 宽度 | Number | 0 |
| height | 高度 | Number | 0 |
| radius | 圆弧半径 | Number, Array | 0 / [0, 0, 0, 0] |
| deg | 旋转角度 | Number | 0 |
| border | 边框 | Array | 0 |
| img | 图片资源(本地资源或者网络资源) | Object, String | '' |
| background | 背景颜色 | String | transparent |

### type: text  参数说明

| 属性名 | 说明 | 参数类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| left | x轴坐标 | Number | 0 |
| top | y轴坐标 | Number | 0 |
| width | 宽度 | Number | 0 |
| content | 文本内容 | String | '' |
| fontStyle | 字体样式 | String | normal |
| fontVariant | 字体异体 | String | normal |
| fontWeight | 字体粗细 | String / Number | 500 |
| fontSize | 字体大小 | Number | 16 |
| fontFamily | 字体 | String | sans-serif |
| color | 文本颜色 | String | black |
| textAlign | 文本对齐方式 | String | left。字体居中需要设置 left 值。比如：图片宽度 100,left:50,textAlign:'center' 即可居中 |
| breakWord | 是否换行 | Boolean | false |
| maxLines | 最大行数 | Number | 默认：2。根据width(宽度)换行 ,需要设置 breakWord: true ,超出行隐藏显示为... |
| bolder | 是否加粗 | Boolean | false |
| textDecoration | 下划线装饰 | String | 下划线装饰 underline(下划线)、line-through(贯穿线) |

### type: qrcode  参数说明

| 属性名 | 说明 | 参数类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| left | x轴坐标 | Number | 0 |
| top | y轴坐标 | Number | 0 |
| width | 宽度 | Number | 0 |
| height | 高度 | Number | 0 |
| content | 二维码内容 | String | '' |
| color | 码颜色 | String | black |
| background | 背景颜色 | String | white |

### type: gradient  参数说明

| 属性名 | 说明 | 参数类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| left | x轴坐标 | Number | 0 |
| top | y轴坐标 | Number | 0 |
| width | 宽度 | Number | 0 |
| height | 高度 | Number | 0 |
| radius | 圆弧半径 | Number, Array | 0 / [0, 0, 0, 0] |
| deg | 旋转角度 | Number | 0 |
| gradType | 渐变类型 | String | 默认：linear（线性渐变）、radial（径向渐变） |
| startCoordinate | 开始坐标 | Array | linear： (x0, y0)；radial： (x0, y0, r0) |
| endCoordinate | 结束坐标 | Array | linear： (x1, y1)；radial： (x1, y1, r1) |
| addColorArr | 填充的颜色值 | Array | [[0, 'green'], [.5, 'yellow'], [1, 'red']] |


## 预览

![预览图](https://app.yinxiang.com/files/common-services/binary-datas/c2VydmljZVR5cGU9MiZzZXJ2aWNlRGF0YT17Im5vdGVHdWlkIjoiMTIyYWU1NjgtM2E4Zi00NGFiLWJhMzgtOTMyNGE1ZTliMWMyIiwicmVzb3VyY0d1aWQiOiJhNDBmYWU2Mi1jMzMzLTQ2MzMtYTY1Zi1hMDRiYTE2MWYzZTcifQ==)

## 线上demo

## 注意事项

1. 此项目只支持reactjs平台项目。


## FAQ

**1、组件内部做了什么优化处理？**
> 组件内部会根据设备的`设备像素比(pixelRatio)`逻辑缩放。所以在使用的时候，用户不需要自己放大对应尺寸。

## 贡献代码

使用过程中发现任何问题都可以提[Issue](https://github.com/IFromHell/reactjs-canvas-poster/issues) 给我，也非常欢迎 PR 或 [Pull Request](https://github.com/IFromHell/reactjs-canvas-poster/pulls)