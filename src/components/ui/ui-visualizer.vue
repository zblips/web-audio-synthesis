<style lang="scss" scoped>
  @import '../../assets/styles/synth-card';

  .card {
    width: 50vw;
    margin: $margin-int $margin-ext;
    display: flex;

    .canvas {
      margin: auto 10px auto 10px;
      background-color: #2c3e50;
      border: 2px solid #A3B8C8;
      border-radius: 10px;
    }
  }
</style>

<template>
  <div class="card visualizer" ref="cardVisualizer">
    <div class="canvas" :width="width" :height="height">
      <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>

<script>

  export default {
    mounted() {
      this.canvasContext = this.$refs.canvas.getContext('2d')
      this.buffer = new Uint8Array(this.analyzer.fftSize)
      this.draw()

      window.addEventListener('resize', this.draw)
    },
    props: {
      analyzer: {
        type: AnalyserNode,
      },
      type: {
        type: String,
        default: 'osc',
      },
    },
    data() {
      return {
        width: 100,
        height: 200,
        cardVisualizer: null,
      }
    },
    methods: {
      draw() {
        const cardElement = this.$refs.cardVisualizer
        this.width = cardElement.offsetWidth - 26
        this.height = cardElement.offsetHeight - 32

        if (this.type === 'osc') {
          return this.drawOscilloscope()
        }
        this.drawSpectrum()
      },
      drawOscilloscope() {
        const sliceWidth = this.width / this.analyzer.fftSize + 1
        this.analyzer.getByteTimeDomainData(this.buffer)

        this.canvasContext.fillStyle = 'rgb(255, 255, 255, 0)'
        this.canvasContext.clearRect(0, 0, this.width, this.height)

        this.canvasContext.beginPath()
        this.canvasContext.strokeStyle = '#fff'
        this.canvasContext.lineWidth = 1
        this.canvasContext.moveTo(0, this.height / 2)
        this.canvasContext.lineTo(this.width, this.height / 2)
        this.canvasContext.moveTo(this.width / 2, 0)
        this.canvasContext.lineTo(this.width / 2, this.height)
        this.canvasContext.stroke()

        this.canvasContext.beginPath()
        this.buffer
        .filter(v => v !== 128)
        .forEach((v, i) => {
          const y = (v / 128) * (this.height / 2)
          const x = i * sliceWidth
          if (i === 0) {
            this.canvasContext.moveTo(x, y)
            return
          }
          this.canvasContext.lineTo(x, y)
        })
        this.canvasContext.lineWidth = 5
        this.canvasContext.strokeStyle = '#ff5574'
        this.canvasContext.stroke()
        requestAnimationFrame(this.drawOscilloscope)
      },
      drawSpectrum() {
        this.analyzer.fftSize = 256
        const data = new Uint8Array(this.analyzer.frequencyBinCount)
        this.analyzer.getByteFrequencyData(data)

        this.canvasContext.fillStyle = 'rgb(255, 255, 255, 0)'
        this.canvasContext.clearRect(0, 0, this.width, this.height)

        this.canvasContext.lineWidth = 0.5
        this.canvasContext.strokeStyle = '#af1e3a'
        this.canvasContext.beginPath()
        const width = this.width / data.length
        data.forEach((freq, i) => {
          this.canvasContext.fillStyle = `rgb(${freq + 100}, 85,116)`
          this.canvasContext.fillRect(i * width, this.height - freq, width, freq)
        })
        requestAnimationFrame(this.drawSpectrum)
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.draw)
    },
  }
</script>
