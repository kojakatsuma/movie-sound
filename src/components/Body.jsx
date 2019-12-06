import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import ml5 from 'ml5';
window['p5'] = p5
window['loadImage'] = p5.prototype.loadImage

/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    let video = null;
    let bodypix = null;
    let segmentation = null;

    const options = {
        outputStride: 16, // 8, 16, or 32, default is 16
        segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5 
    }

    let start = false

    p.setup = () => {
        p.createCanvas(320, 240)
        video = p.createVideo('/assets/video/ballet2.mp4')
        video.size(p.width, p.height)
        video.volume(0)
        // video.hide()
        bodypix = ml5.bodyPix(video, modelReady)
        p.colorMode(p.HSB);
        // HSB
        options.palette = bodypix.config.palette;
        Object.keys(options.palette).forEach(part => {
            const h = p.floor(p.random(360));
            const s = p.floor(p.random(100));
            const b = p.floor(p.random(100));
            const c = p.color(h, s, b)
            options.palette[part].color = c;
        });
    }

    p.mousePressed = () => {
        if (!start) {
            video.play()
        } else {
            video.pause()
        }
        start = !start;
    }

    const modelReady = () => {
        bodypix.segmentWithParts(gotResults, options)
    }

    const gotResults = (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        segmentation = result
        p.image(video, 0, 0, p.width, p.height)
        p.image(segmentation.image, 0, 0, p.width, p.height)
        bodypix.segmentWithParts(gotResults, options)
    }
}

export default () => {
    const target = useRef(null);

    useEffect(() => {
        new p5(sketch, target.current)
    })

    return <div ref={target} />
}