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
    let points;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        p.stroke(0);
        p.fill(255);
        points = font.textToPoints('青山シーバード', -p.windowWidth / 3, -300, 80, {
            sampleFactor: 10,
            simplifyThreshold: 0
        })
        points = points.concat(font.textToPoints('2019.11.30 Sat 19:00', -p.windowWidth / 5, -200, 80, {
            sampleFactor: 10,
            simplifyThreshold: 0
        }))
        points = points.concat(font.textToPoints('山本 陽一 Gt.', -p.windowWidth / 3, -100, 80, {
            sampleFactor: 10,
            simplifyThreshold: 0
        }))
        points = points.concat(font.textToPoints('阿部 真武 Ba.', -p.windowWidth / 7, 0, 80, {
            sampleFactor: 10,
            simplifyThreshold: 0
        }))
        points = points.concat(font.textToPoints('古謝 克磨 Drs.', 0, 100, 80, {
            sampleFactor: 10,
            simplifyThreshold: 0
        }))
    }
    p.draw = () => {
        p.background(255);
        p.beginShape()
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            p.vertex(point.x, point.y)
        }
        p.endShape()
        p.noLoop()
    }
}

export default () => {
    const target = useRef(null)
    useEffect(() => {
        new p5(sketch, target.current)
    })
    return <div ref={target} />
}
