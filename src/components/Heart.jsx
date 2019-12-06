import React, { useEffect, useRef, useState } from 'react';
import AudioApi from '../api/Audio';
import p5 from 'p5';
import isMobile from 'is-mobile';

let audioApi = null

/**
 *
 *
 * @param {p5} p
 */
const sketch = p => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.textSize(32)
    }
    p.draw = () => {
        if (!audioApi.loaded) {
            p.fill(0, 102, 153);
            p.text('...loading', 500, 500);
            return;
        }
        if (!audioApi.started) {
            p.background(255)
            p.fill(0, 102, 153);
            p.text('please. click', 500, 500);
            return;
        }
        const r = audioApi.getLevel()
        p.background(255)
        const second = p.millis() / 1000
        p.fill(r, second, 0, r)
        p.noStroke()
        p.beginShape()
        p.vertex(700, 250)
        p.bezierVertex(700 + r, -50 - r, 1400 + r, 100 + r, 700, 600 + r)
        p.vertex(700, 250)
        p.bezierVertex(700 - r, -50 - r, 0 - r, 100 + r, 700, 600 + r)
        p.endShape(p.CLOSE)
    }
}


export default ({ url }) => {
    const target = useRef(null)
    useEffect(() => {
        audioApi = new AudioApi(url);
        audioApi.setEvent(isMobile() ? 'touchend' : 'click')
        new p5(sketch, target.current)
        return () => audioApi.removeEvent()
    }, [])
    return <div ref={target} />
}

