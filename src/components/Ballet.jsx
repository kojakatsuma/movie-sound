import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import ml5 from 'ml5';
const videoPath = '/assets/video/ballet.mp4'
const fontPath = '/assets/fonts/Montserrat-Thin.ttf'

/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    let videoObject = null;
    let start = false;
    let poseNet = null;
    let poses = []
    let font = null;
    p.preload = () => {
        font = p.loadFont(fontPath)
        videoObject = p.createVideo(videoPath, () => {
            poseNet = ml5.poseNet(videoObject, () => {
                videoObject.volume(0)
                poseNet.on('pose', (results) => {
                    poses = results;
                })
            })
        })
    }
    p.setup = () => {
        videoObject.hide()
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.textFont(font)
    }

    const skeleton = () => {
        poses.forEach(({ pose: { keypoints }, skeleton: skeletons }) => {
            const nose = keypoints.find(keypoint => keypoint.part === 'nose')
            p.ellipse(nose.position.x, nose.position.y, 20)
            skeletons.forEach((skeleton) => {
                const from = skeleton[0]
                const to = skeleton[1]
                p.line(from.position.x, from.position.y, to.position.x, to.position.y)
            })
        })
    }
    p.draw = () => {
        p.clear()
        p.noCursor()
        p.textSize(200)
        p.text('Ballet', p.windowWidth / 2, p.windowHeight / 1.5)
        p.background(255, 255, 255, 0)
        skeleton()
    }
    p.mousePressed = () => {
        if (!start) {
            videoObject.play()
        } else {
            videoObject.pause()
        }
        start = !start;
    }

}

export default () => {
    const target = useRef(null)
    useEffect(() => {
        new p5(sketch, target.current)
    })
    return <div ref={target}></div>
}