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
    }

    const createBox = (r, x = 0, y = 0, z = 0) => {
        const coefficient = r ? r : 1
        p.push()
        p.translate(x * coefficient, y * coefficient, z * coefficient).fill(255, 255).box(50)
        p.pop()
    }

    p.draw = () => {
        p.clear()
        p.rotateX(-0.5)
        p.rotateY(-0.5)
        const points = [-80, 0, 80]

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