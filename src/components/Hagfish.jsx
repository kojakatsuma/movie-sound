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
        p.textSize(50)
        // p.blendMode(p.MULTIPLY)
    }
    let xspeed = 2.8
    let xdirection = 1;
    let xpos = 0
    let ypos = 400
    let ydirection = 1
    let yspeed = 1;
    let size = 100
    p.draw = () => {
        if (!audioApi.started) {
            p.fill(0, 102, 153);
            p.text('click', 500, 500);
            return;
        }
        const r = audioApi.getLevel()
        xpos = xpos + xspeed * xdirection
        ypos = ypos + yspeed * ydirection
        p.fill(r, 102, 153, r);
        if (xpos > p.width - 10 || xpos < 0) {
            xdirection *= -1
        }
        if (ypos > p.height + 200 || ypos < 200) {
            ydirection *= -1
        }
        p.noStroke()
        p.ellipse(xpos, ypos - r, size)
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