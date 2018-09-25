export const Output = (audioContext) => {
  const analyzer = audioContext.createAnalyser()
  const compressor = audioContext.createDynamicsCompressor()
  const gain = audioContext.createGain()
  analyzer.fftSize = 2048

  gain
  .connect(compressor)
  .connect(analyzer)
  .connect(audioContext.destination)

  compressor.threshold.value = -50
  compressor.knee.value = 40
  compressor.ratio.value = 18
  compressor.attack.value = 0
  compressor.release.value = 0.25

  return {
    get analyzer() {
      return analyzer
    },
    get gain() {
      return gain.gain
    },
    get input() {
      return gain
    },
  }
}
