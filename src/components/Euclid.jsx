import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
/**
 *
 *
 * @param {p5} p
 */
const sketch = p => {
    let [xPos, yPos] = [0, 0]
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.frameRate(4)
    }
    let [numA, numB] = [1000, 746]
    let wd = numB
    let itr = 0;
    p.draw = () => {
        if (wd > 0) {
            itr++;
            if (itr % 2 === 1) {
                if (xPos + wd <= numA) {
                    p.rect(xPos, yPos, wd, wd)
                    xPos += wd;
                }
                wd = numA - xPos
            } else {
                if (yPos + wd <= numB) {
                    p.rect(xPos, yPos, wd, wd)
                    yPos += wd;
                }
                wd = numB - yPos
            }
        }
    }
}

export default () => {
    const target = useRef(null)
    useEffect(() => {
        new p5(sketch, target.current)
    })
    return <div ref={target} />
}
