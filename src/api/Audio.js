

export default class AudioApi {
    constructor(url) {
        this.url = url;
        this.context = new AudioContext();
        this.started = false;
        this.currentTime = 0;
        this.loaded = false;
        fetch("https://cf-media.sndcdn.com/ftuLLYdp42eA.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZnR1TExZZHA0MmVBLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1OTExMTkzMTh9fX1dfQ__&Signature=fEbrKq1MKcreRP-4uCkjAlxRdSG0UqIeMdfbzdrpIq7zKuB4n-7xviDur223MmMaTLNT2t2JiiyuJOTwBnusNu3ZOhTSs80jwlqTcXAnykWNrwLPIFuaQmn1BjsSZ2hTsA-D9Nh68FpiYXGu4AgHpkRJamSpkg0rPxRoHDSOY88O9G1FNNQgB9rKxA-psN4k1zgshwSOn62qqNUc5NVmIvDBx39S6BvbsdSle0d7UXTh2Ilw6jtuYvbM2vfnIhmQKrUgDl-tI1LU0LZOcR88E2fYbl4DoIzfugdhLTVFPba63~fFMNnaSgQqMVLAFlIZXPJvQAe8O5~S7OPSbq6Uug__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ")
            .then(res => res.arrayBuffer())
            .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
            .then(buffer => this.audioBuffer = buffer)
            .then(() => this.loaded = true)
    }

    getLevel() {
        if (!this.started) {
            return 0
        }
        this.audioAnalyser.getByteFrequencyData(this.times)
        return this.times.reduce((a, b) => Math.max(a, b))
    }

    setEvent(event = 'click') {
        window.addEventListener(event, () => this.play())
    }

    removeEvent(event = 'click') {
        window.removeEventListener(event, () => this.play())
        this.context.close()
    }

    play() {
        if(!this.loaded){
            return;
        }
        if (!this.started) {
            this.audioBufferSource = this.context.createBufferSource()
            this.audioBufferSource.buffer = this.audioBuffer;
            this.audioAnalyser = this.context.createAnalyser()
            this.audioAnalyser.connect(this.context.destination)
            this.audioBufferSource.connect(this.audioAnalyser)
            this.audioBufferSource.start(this.currentTime, this.currentTime)
            this.times = new Uint8Array(this.audioAnalyser.frequencyBinCount)
        } else {
            this.audioBufferSource.stop()
            this.currentTime = this.context.currentTime
        }
        this.started = !this.started;
    }

}