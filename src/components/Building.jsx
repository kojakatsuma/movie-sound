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
    let font = null;
    p.preload = () => {
        font = p.loadFont('/assets/fonts/NotoSerifJP-Light.otf')
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        p.textFont(font)
        p.textAlign(p.CENTER, p.CENTER)
    }
    p.draw = () => {
        p.clear()
        p.noCursor()
        p.fill(0, 255)
        p.textSize(80)
        p.text('aoyama seabird', 0, -200)
        p.text('Nov. 30 2019 7:00 p.m.', 0, -100)
        p.text('yoichi yamamoto Gt.', 0, 0)
        p.text('masatake abe Ba.', 0, 100)
        p.text('katsuma koja Drs.', 0, 200)
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
