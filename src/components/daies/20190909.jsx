import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.frameRate(15)
    }

    const text = '20190909\n 台風でした。出社するのを早々に諦めて在宅勤務。11時くらいにはもう晴れてた。\nこういう時に在宅できるのはいいなぁと思ったけど、割と一人で黙々とやってて寂しい感もあった。\nあと、16時半ごろに甥っ子が生まれたと連絡があり、叔父になりました。\n夜はTSUTAYAで借りた「帰ってきたヒトラー」を観た。\n返しに行く途中、AOKIの前で寝転がっている人がいて、KAMATAMELTDOWNできるなと思いました。'.split('')
    p.draw = () => {
        p.clear()
        p.text(text.slice(0, p.frameCount).join(''), 500, 250)
        if (p.frameCount >= text.length) {
            p.textSize(500)
            p.fill(100, 100, 100, 255)
            p.text('完', 500, 500)
            p.noLoop()
        }
    }

}


export default () => {
    const target = useRef(null)
    useEffect(() => {
        new p5(sketch, target.current)
    }, [])
    return <div ref={target} />
}