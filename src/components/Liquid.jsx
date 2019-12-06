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
    let xspacing = 5; // Distance between each horizontal location
    let w; // Width of entire wave
    let theta = 0.0; // Start angle at 0
    let amplitude = 75.0; // Height of wave
    let period = 500.0; // How many pixels before the wave repeats
    let dx; // Value for incrementing x
    let yvalues; // Using an array to store height values for the wave
    let xvalues = [];
    let xspeed = 1;

    p.setup = () => {
        p.createCanvas(p.windowWidth - 100, p.windowHeight - 30)
        w = 500 + 16
        dx = (p.TWO_PI / period) * xspacing
        yvalues = new Array(p.floor(w / xspacing))
    }
    p.draw = () => {
        p.noCursor()
        p.background(255)
        amplitude = audioApi.getLevel()

        theta += 0.02
        let x = theta;
        for (let i = 0; i < yvalues.length; i++) {
            yvalues[i] = p.sin(x) * amplitude;
            x += dx;
        }

        p.noStroke();
        // A simple way to draw the wave with an ellipse at each location
        if (xvalues.length) {
            xvalues = xvalues.map(({ posX, xdirection }, index) => {
                posX = posX + xspeed * xdirection
                const posY = p.height / 2 + yvalues[index] * amplitude / 100
                p.fill(amplitude, 255 * p.random(), 255 * p.random(), 255).ellipse(posX, posY, 5, 5)
                if (posX < 0 || posX > p.width) {
                    xdirection *= -1
                }
                return { posX, xdirection }
            })
        } else {
            for (let x = 0; x < yvalues.length; x++) {
                let posX = (p.width / 2 - (x * xspacing)) + xspeed;
                xvalues.push({ posX, xdirection: -1 })
                p.ellipse(posX, p.height / 2 + yvalues[x], 5, 5);
            }
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