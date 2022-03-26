/*
 * @Author: foxfly
 * @Contact: 617903352@qq.com
 * @Date: 2022-03-26 17:08:15
 * @Description: 
 */
import { useState } from 'react';
import CanvasPoster from 'remax-canvas-poster';

export default (props) => {
    const [imgurl, setImgUrl] = useState('');
    const [startDraw, setStartDraw] = useState(false);
    const [painting, setPainting] = useState([]);

    const generateShareImg = () => {
        let canvanH = 492;
        const titleTop = 30;
        let tagTop = 0;

        let contTop = 0;
        let drawCont = false;

        let imgTop = 0;
        let imgLeft = 15;
        let imgW = 270;
        let imgH = 126;
        let drawImg = false;

        let footerTop = 0;
        if (!isEmpty(info)) {
            // 标题影响高度
            tagTop = titleTop + 30;
            if (info.title.length > 14) tagTop += 30;
            contTop = tagTop + 20;
            // 描述内容影响高度
            imgTop = contTop + 20;
            if (info.description) {
                drawCont = true;
                if (info.description.length / 21 <= 1) {
                    imgTop += (22 * 1);
                } else if (info.description.length / 21 <= 2) {
                    imgTop += (22 * 2);
                } else if (info.description.length / 21 <= 3) {
                    imgTop += (22 * 3);
                }
            }

            footerTop = imgTop;
            // 计算图片
            if (info.img) {
                drawImg = true;
                if (imgData.width <= 270) {
                    imgLeft += Math.floor((imgW - imgData.width) / 2);

                    imgW = imgData.width;
                    imgH = imgData.height;
                } else {
                    imgH = Math.floor(imgW / (imgData.width / imgData.height));
                }
                footerTop += imgH;
            }
            footerTop += 15;
            canvanH = footerTop + 120;
        }

        // 生成图片
        const paintingData = {
            width: px(300),
            height: px(canvanH),
            views: [
                {
                    type: 'rect',
                    width: px(300),
                    height: px(canvanH),
                    top: px(0),
                    left: px(0),
                    background: 'white',
                    radius: px(8),
                },
                {
                    type: 'text',
                    top: px(titleTop),
                    left: px(15),
                    content: echoStr(info.title),
                    fontSize: px(18),
                    lineHeight: px(25),
                    width: px(250),
                    breakWord: true,
                },
                {
                    type: 'text',
                    top: px(tagTop),
                    left: px(15),
                    content: `${echoStr(info.source)}  ${info.created_at.substring(0, 16)}`,
                    fontSize: px(12),
                    lineHeight: px(17),
                    width: px(250),
                    breakWord: false,
                    MaxLineNumber: 1,
                    color: '#999',
                },
                drawCont && {
                    type: 'text',
                    top: px(contTop),
                    left: px(15),
                    content: info.description,
                    fontSize: px(12),
                    lineHeight: px(22),
                    width: px(250),
                    breakWord: true,
                    MaxLineNumber: 4,
                    color: '#666',
                },
                drawImg && {
                    type: 'image',
                    width: px(imgW),
                    height: px(imgH),
                    top: px(imgTop),
                    left: px(imgLeft),
                    url: info.img,
                    radius: px(6),
                },
                {
                    type: 'rect',
                    width: px(300),
                    height: px(120),
                    top: px(footerTop),
                    left: 0,
                    background: '#F8F8F8',
                    radius: [0, 0, px(8), px(8)]
                },
                {
                    type: 'text',
                    top: px(footerTop + 37),
                    left: px(15),
                    content: '扫一扫查看全文',
                    fontSize: px(12),
                    color: '#666666',
                },
                {
                    type: 'text',
                    top: px(footerTop + 57),
                    left: px(15),
                    content: '快来太一小程序一起看看吧',
                    fontSize: px(10),
                    color: '#999999',
                },
                {
                    type: 'rect',
                    width: px(10),
                    height: px(3),
                    top: px(footerTop + 80),
                    left: px(15),
                    background: '#666666',
                },
                {
                    type: 'image',
                    width: px(64),
                    height: px(64),
                    top: px(footerTop + 30),
                    left: px(215),
                    url: qrCode,
                },
            ]
        };
        setPainting(paintingData);
        setStartDraw(true);
    };
    return <div>

        <button onClick={() => generateShareImg()}>生成海报</button>

        {startDraw && <CanvasPoster painting={painting} onSuccess={(imgBase64) => {
            setImgUrl(imgBase64);
        }} />}

        {imgurl && <img src={imgurl} style={{ width: painting.width, height: painting.height }} />}
    </div>
};