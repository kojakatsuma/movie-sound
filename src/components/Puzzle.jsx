import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
/**
 *
 *
 * @param {p5} p
 */
const sketch = p => {
    let font = null;
    p.preload = () => {
        font = p.loadFont('/assets/fonts/NotoSerifJP-Light.otf')
    }
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        p.textFont(font)
        p.textAlign(p.CENTER)
    }
    let angle = 0;
    let startId = null
    let stopId = null;
    p.draw = () => {
        p.clear()
        p.noCursor()
        // if (!startId) {
        //     startId = setInterval(() => {
        //         p.loop()
        //     }, 1000)
        // }
        // if (!stopId) {
        //     stopId = setInterval(() => {
        //         p.noLoop()
        //     }, 2000)
        // }
        angle += 0.05
        p.push()
        p.rotateY(angle)
        p.translate(0, -300).fill(255).box(50)
        p.pop()
        p.push()
        p.translate(80, -300).fill(255).rotateX(angle).box(50)
        p.pop()
        p.push()
        p.translate(-80, -300).fill(255).rotateX(angle).rotateY(angle).box(50)
        p.pop()
        p.fill(0, 255)
        p.textSize(50)
        p.text('aoyama seabird', 0, -200)
        p.text('Nov. 30 2019 7:00 p.m.', 0, -100)
        p.text('yoichi yamamoto Gt.', 0, 0)
        p.text('masatake abe Ba.', 0, 100)
        p.text('katsuma koja Drs.', 0, 200)
    }
}

export default () => {
    const target = useRef(null)
    useEffect(() => {
        new p5(sketch, target.current)
    })
    return <div ref={target} />
}
