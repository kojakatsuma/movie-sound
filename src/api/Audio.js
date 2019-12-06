

export default class AudioApi {
    constructor(url) {
        this.url = url;
        this.context = new AudioContext();
        this.started = false;
        this.currentTime = 0;
        this.loaded = false;
        fetch(this.url)
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