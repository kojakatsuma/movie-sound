import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    let font = null;
    let image = null
    p.preload = () => {
        font = p.loadFont('/assets/fonts/SawarabiMincho-Regular.ttf')
        image = p.loadImage('/assets/image/20190913.jpg')
    }
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        p.frameRate(10)
        p.textFont(font)
        p.textAlign(p.LEFT, p.TOP)
        p.textSize(20)
    }

    const text = '20190913\n 涼しい。急に秋めいてきた。そして体調を崩しました。\n新潮10月号に載っていた「曼陀羅華X 1994-2003」を読んだ。初めて新潮を買ったけど、新潮って付く雑誌多すぎないすか。\n積み本をどんどん消化していきたい。今年はたくさん読んだ気がする。何も憶えてないが。\nあと友人の誕生日でした。おめおめ。'.split('')
    let start = false;
    let count = 0;
    p.draw = () => {
        p.clear()
        if (p.frameCount % 10) {
            p.tint(255 * p.random(), 255 * p.random(), 255 * p.random(), 255)
        }
        p.image(image, -(p.windowWidth / 2), -(p.windowHeight / 2), p.windowWidth, p.windowHeight)
        p.fill(220, 220, 220, 255).text(text.slice(0, count).join(''), -(p.windowWidth / 2.5), -(p.windowHeight / 12))
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