import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import AudioApi from '../api/Audio';

let audioApi = null

/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    let font = null
    p.preload = () => {
        font = p.loadFont('assets/fonts/Geostar-Regular.ttf')
    }
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        p.textFont(font)
        p.textSize(32)
        p.textAlign(p.CENTER, p.CENTER)
    }

    const createPaper = (r = !r ? r : 1, conf) => {
        const count = p.frameCount * 0.003
        p.push()
        p.rotateX(count)
            .rotateY(conf)
            .rotateZ(count).square(conf * r * count, conf * r * count, conf * r)
        p.pop()
        p.push()
        p.rotateX(-count)
            .rotateY(-conf)
            .rotateZ(-count).square(-conf * r * count, -conf * r * count, conf * r)
        p.pop()
    }

    p.draw = () => {
        if(!audioApi.loaded){
            p.fill(0)
            p.text('...loading', 0, 0)
            return;
        }
        if (!audioApi.started) {
            p.clear()
            p.fill(0)
            p.text('click', 0, 0)
            return;
        }
        p.clear()
        p.fill(255)
        for (let index = 0; index < 150; index++) {
            createPaper(audioApi.getLevel() / 1000, index)
        }
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