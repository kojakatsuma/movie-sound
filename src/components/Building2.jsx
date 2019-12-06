import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { debounce } from 'lodash';
import AudioApi from '../api/Audio';

let audioApi = null;
/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    let font = null;
    p.preload = () => {
        font = p.loadFont('/assets/fonts/SawarabiMincho-Regular.ttf')
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth + 100, p.windowHeight + 100, p.WEBGL)
        p.textFont(font)
        p.textAlign(p.CENTER, p.CENTER)
    }
    p.draw = () => {
        p.background(0)
        p.noCursor()
        p.textSize(30)
        p.text('aoyama seabird', -500, -200)
        p.text('2019.11.30 Sat', -500, -100)
        p.text('youichi yamamoto Gt.', -500, 0)
        p.text('masatake abe Ba.', -500, 100)
        p.text('katsuma koja Drs.', -500, 200)
        p.rotateY(-p.frameCount * 0.01)
        p.rotateX(-p.frameCount * 0.01)
        const level = audioApi.getLevel()
        if (level) {
            p.push()
            p.fill(255, 0)
            p.translate(0, 0, 0).rotateX(p.frameCount * 0.08).box(100)
            p.pop()
            const pos = 200 * (level ? level / 100 : 1);
            createBox(p, pos);
        } else {
            p.push()
            p.fill(255)
            p.translate(0, 0, 0).rotateX(p.frameCount * 0.08).box(100)
            p.pop()
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

const createBox = (p, pos) => {
    p.fill(255)
    p.push();
    p.fill(255, 0).translate(pos, 0, 0).rotateX(p.frameCount * 0.1).box(100);
    p.pop();
    p.push();
    p.fill(255, 0).translate(-pos, 0, 0).rotateX(p.frameCount * 0.09).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(0, pos, 0).rotateX(p.frameCount * 0.05).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(0, -pos, 0).rotateX(p.frameCount * 0.2).box(100);
    p.pop();
    p.push();
    p.fill(255, 0).translate(0, 0, pos).rotateX(p.frameCount * 0.02).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(0, 0, -pos).rotateX(p.frameCount * 0.3).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(0, pos, pos).rotateX(p.frameCount * 0.07).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(0, -pos, -pos).rotateX(p.frameCount * 0.03).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(0, pos, -pos).rotateX(p.frameCount * 0.05).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(0, -pos, pos).rotateX(p.frameCount * 0.09).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(pos, pos, 0).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(-pos, -pos, 0).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(pos, -pos, 0).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(-pos, pos, 0).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0).translate(pos, 0, pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(-pos, 0, -pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(pos, 0, -pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0).translate(-pos, 0, pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(pos, pos, pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(-pos, -pos, -pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(-pos, pos, pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(pos, -pos, pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(pos, pos, -pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(pos, -pos, -pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.fill(255, 0)
    p.translate(-pos, pos, -pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
    p.push();
    p.translate(-pos, -pos, pos).rotateX(p.frameCount * 0.08).box(100);
    p.pop();
}
