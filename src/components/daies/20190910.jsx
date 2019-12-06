import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

/**
 *
 *
 * @param {p5} p
 */
const sketch = (p) => {
    let font = null;
    let picture = null
    p.preload = () => {
        font = p.loadFont('/assets/fonts/SawarabiMincho-Regular.ttf')
        picture = p.loadImage('/assets/image/20190910.jpg')
    }
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        p.frameRate(15)
        p.textFont(font)
        p.textAlign(p.LEFT, p.TOP)
        p.textSize(20)
    }

    const text = '20190910\nポケモンgo 飽きてきた。こういうゲームの怖いところは、飽きてきたのにやってしまうところ。\n退勤して、渋谷ロフトヘブンへ。石橋英子、山本達久、joe talia、ラスト二曲はゲストにjim o\'rourke。\n石橋英子の曲演ってたのかな。二、三曲しか分からなかった。ツアーやるそうですよ。\nTシャツ買って帰りました。ロフトヘブンは四隅の電飾をもぎ取れ。'.split('')
    let start = false;
    let count = 0;
    p.draw = () => {
        p.clear()
        p.image(picture, -(p.windowWidth / 2), -(p.windowHeight / 2), p.windowWidth, p.windowHeight)
        p.tint(0, 0, 255, 230)
        p.image(picture, -(p.windowWidth / 2) + p.random(), -(p.windowHeight / 2) + p.random(), p.windowWidth + 50, p.windowHeight + 50)
        p.text(text.slice(0, count).join(''), -(p.windowWidth / 2.5), -(p.windowHeight / 4))
        if (start) {
            count++
        }
    }

    p.mouseClicked = () => {
        start = !start
    }

}


export default () => {
    const target = useRef(null)
    useEffect(() => {
        new p5(sketch, target.current)
    }, [])
    return <div ref={target} />
}