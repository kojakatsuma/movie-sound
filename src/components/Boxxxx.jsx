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
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        p.frameRate(22)
        p.strokeWeight(0.5)
    }

    const createBox = (r, x = 0, y = 0, z = 0) => {
        let coefficient = r
        let [posX, posY, posZ] = [
            x * coefficient * p.random(),
            y * coefficient * p.random(),
            z * coefficient * p.random()]
        if (posX <= -150) {
            posX = -150
        } else if (posX >= 150) {
            posX = 150
        }
        if (posY <= -150) {
            posY = -150
        } else if (posY >= 150) {
            posY = 150
        }
        if (posZ <= -150) {
            posZ = -150
        } else if (posZ >= 150) {
            posZ = 150
        }
        p.push()
        p.translate(posX, posY, posZ).fill(100 * coefficient, 180, 250, 255).box(50)
        p.pop()
    }

    p.draw = () => {
        p.noCursor()
        p.clear()
        const points = [-80, 0, 80]
        p.rotateX(-0.5)
        p.rotateY(-0.5)
        const r = audioApi.getLevel() / 100

        points.forEach(point => { createBox(r, 80, point) })
        points.forEach(point => { createBox(r, 0, point) })
        points.forEach(point => { createBox(r, -80, point) })

        points.forEach(point => { createBox(r, 80, 80, point) })
        points.forEach(point => { createBox(r, -80, -80, point) })

        points.forEach(point => { createBox(r, -80, 80, point) })
        points.forEach(point => { createBox(r, 80, -80, point) })

        points.forEach(point => { createBox(r, 0, 80, point) })
        points.forEach(point => { createBox(r, 0, -80, point) })

        points.forEach(point => { createBox(r, 80, 0, point) })
        points.forEach(point => { createBox(r, -80, 0, point) })

        points.forEach(point => { createBox(r, 0, 0, point) })
        points.forEach(point => { createBox(r, 0, 0, -point) })

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