import { createRandomWaveForm, scale, unscale, WaveForms } from 'wasa'
import { LFODestinations } from './lfo-destinations'

const EPSILON = 2.220446049250313e-16

const MIN_FREQUENCY = EPSILON
const MAX_FREQUENCY = 15
const MIN_AMPLITUDE = EPSILON
const MAX_AMPLITUDE = 700

export const createLfo = (audioContext, parameters) => {
  const osc = audioContext.createOscillator()
  const gain = audioContext.createGain()

  const setWaveForm = (waveForm, osc) => {
    if (waveForm === WaveForms.RANDOM) {
      osc.setPeriodicWave(createRandomWaveForm(audioContext))
    } else {
      osc.type = waveForm
    }
  }

  let parameter
  let destination = LFODestinations.OFF
  let waveForm = WaveForms.SINE

  gain.gain.value = MIN_AMPLITUDE + EPSILON

  osc.connect(gain)
  osc.frequency.value = (100 * 2) / 60
  setWaveForm(waveForm, osc)
  osc.start(audioContext.currentTime)

  return {
    setActiveParameter(audioParamKey) {
      destination = audioParamKey
      gain.disconnect()
      if (audioParamKey === LFODestinations.OFF) {
        return this
      }
      parameter = parameters[audioParamKey]
      gain.connect(parameter)
      return this
    },
    get isActive() {
      return destination !== LFODestinations.OFF
    },
    disconnect() {
      gain.disconnect()
    },
    set frequency(value) {
      osc.frequency.value = unscale({ min: MIN_FREQUENCY, max: MAX_FREQUENCY }, value)
    },
    get frequency() {
      return scale({ min: MIN_FREQUENCY, max: MAX_FREQUENCY }, osc.frequency.value)
    },
    set amplitude(value) {
      gain.gain.value = unscale({ min: MIN_AMPLITUDE, max: MAX_AMPLITUDE }, value)
    },
    get amplitude() {
      return scale({ min: MIN_AMPLITUDE, max: MAX_AMPLITUDE }, gain.gain.value)
    },
    set destination(value) {
      destination = value
    },
    get destination() {
      return destination
    },
    set waveForm(value) {
      waveForm = value
      setWaveForm(waveForm, osc)
    },
    get waveForm() {
      return waveForm
    },
    get destinations() {
      return Object.values(LFODestinations)
    },
  }
}
