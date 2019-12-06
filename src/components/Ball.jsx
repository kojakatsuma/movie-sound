import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import AudioApi from '../api/Audio';

let audioApi = null;
/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.background(0)
    }

    p.draw = () => {
        p.noStroke()
        const r1 = p.random(p.windowWidth)
        const r2 = p.random(p.windowHeight)
        p.fill(audioApi.getLevel(), 0, p.millis() / 1000, audioApi.getLevel())
        p.ellipse(r1, r2, 10, 10)
    }

}


export default ({ url }) => {
    const target = useRef(null)
    useEffect(() => {
        audioApi = new AudioApi(url)
        audioApi.setEvent()
        new p5(sketch, target.current)
        return () => audioApi.removeEvent()
    }, [])
    return <div ref={target} />
}