import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    let font = null;
    let firstPic = null
    let secondPic = null
    p.preload = () => {
        font = p.loadFont('/assets/fonts/SawarabiMincho-Regular.ttf')
        firstPic = p.loadImage('/assets/image/20190912-1.jpg')
        secondPic = p.loadImage('/assets/image/20190912-2.jpg')
    }
    p.setup = () => {
        p.createCanvas(p.windowWidth + 100, p.windowHeight + 100, p.WEBGL)
        p.frameRate(15)
        p.textFont(font)
        p.textAlign(p.LEFT, p.TOP)
        p.textSize(20)
    }

    const text = '20190912\n 昨日と今日は特に何もなかった。毎日を楽しく暮らしていますう。'.split('')
    let start = false;
    let count = 0;
    p.draw = () => {
        p.noCursor()
        p.clear()
        p.image(firstPic, -(p.windowWidth / 2) + p.random() * 3, -(p.windowHeight / 2) + p.random() * 3, p.windowWidth, p.windowHeight)
        p.tint(130, 50, 20, 220)
        p.image(secondPic, -(p.windowWidth / 2) + p.random() * 3, -(p.windowHeight / 2) + p.random() * 3, p.windowWidth + 50, p.windowHeight + 50)
        p.fill(200, 200, 200, 200).text(text.slice(0, count).join(''), -(p.windowWidth / 2.5), -(p.windowHeight / 4))
        if (start) {
            count++
        }
    }

    p.mouseClicked = () => {
        start = !start
    }

}


export default () => {
    const target = useRef(null)
    useEffect(() => {
        new p5(sketch, target.current)
    }, [])
    return <div ref={target} />
}