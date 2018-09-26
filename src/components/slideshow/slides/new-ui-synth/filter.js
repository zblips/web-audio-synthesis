import { createDryWetMixer, scale, unscale } from 'wasa'

export const FilterTypes = Object.freeze({
  LOW_PASS: 'lowpass',
  HIGH_PASS: 'highpass',
  BAND_PASS: 'bandpass',
})

export const createFilter = (audioContext) => {
  const dryWetMixer = createDryWetMixer(audioContext)
  const filter = audioContext.createBiquadFilter()

  dryWetMixer.setWetNode(filter)

  return {
    connect({ input, connect }) {
      dryWetMixer.connect({ getInput: () => input })
      return { connect }
    },
    setFadeValue(value) {
      dryWetMixer.setFadeValue(value)
      return this
    },
    get input() {
      return dryWetMixer.getInput()
    },
    set frequencyValue(value) {
      filter.frequency.setValueAtTime(unscale({ min: 33, max: 8000 }, value), audioContext.currentTime)
    },
    get frequencyValue() {
      return scale({ min: 33, max: 8000 }, filter.frequency.value)
    },
    set peakValue(value) {
      filter.Q.value = unscale({ min: 0, max: 20 }, value)
    },
    get peakValue() {
      return scale({ min: 0, max: 20 }, filter.Q.value)
    },
    set type(value) {
      filter.type = value
    },
    get type() {
      return filter.type
    },
    get types() {
      return Object.values(FilterTypes)
    },
    set fadeValue(value) {
      dryWetMixer.setFadeValue(value)
    },
    get fadeValue() {
      return dryWetMixer.getFadeValue()
    },
    get frequencyParam() {
      return filter.frequency
    },
    get peakParam() {
      return filter.Q
    },
  }
}
