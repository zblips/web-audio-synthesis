import { midiToFrequency, unscale, WaveForms } from 'wasa'

const getFrequency = midiToFrequency(440)

const SMOOTHING_TIME_CONSTANT = 1E10

export const create4xVoiceManager = (audioContext) => {
  const gain1 = audioContext.createGain()
  const gain2 = audioContext.createGain()

  const fmOscillator = audioContext.createOscillator()
  const fmGain = audioContext.createGain()

  const output = audioContext.createGain()

  let isPolyphonic = true
  let fmRatioValue = 0
  let fmGainValue = 0
  let osc1GainValue = 0.5
  let osc2GainValue = 0.5
  let osc1DetuneValue = 0
  let osc2DetuneValue = 0
  let osc1Type = WaveForms.SQUARE
  let osc2Type = WaveForms.SQUARE

  let voices = {} // polyphonic state
  let notes = [] // monophonic state

  let monoVoice = create2xOscVoice(audioContext)
  .setOsc1DetuneValue(osc1DetuneValue)
  .setOsc2DetuneValue(osc2DetuneValue)
  .setOsc1Type(osc1Type)
  .setOsc2Type(osc2Type)
  monoVoice.start(audioContext.currentTime)

  /* routing */
  gain1.connect(output)
  gain2.connect(output)
  fmOscillator.connect(fmGain)
  fmOscillator.start(audioContext.currentTime)

  gain1.gain.value = 0.5
  gain2.gain.value = 0.5

  return {
    connect({ input, connect }) {
      output.connect(input)
      return { connect }
    },
    noteOn(value, time = audioContext.currentTime) {
      const frequency = getFrequency(value)
      fmOscillator.frequency.setTargetAtTime(frequency * fmRatioValue, time, SMOOTHING_TIME_CONSTANT)

      if (isPolyphonic && !voices[value]) {
        const voice = create2xOscVoice(audioContext)
        .setOsc1DetuneValue(osc1DetuneValue)
        .setOsc2DetuneValue(osc2DetuneValue)
        .setOsc1Type(osc1Type)
        .setOsc2Type(osc2Type)
        voice.osc1.connect(gain1)
        voice.osc2.connect(gain2)
        fmGain.connect(voice.osc1.frequency)
        fmGain.connect(voice.osc2.frequency)
        voices[value] = voice
        voice.noteOn(frequency, time)
        voice.start(time)
      } else if (!isPolyphonic && notes.indexOf(value) === -1) {
        notes.push(value)
        monoVoice
        .setOsc1DetuneValue(osc1DetuneValue)
        .setOsc2DetuneValue(osc2DetuneValue)
        .setOsc1Type(osc1Type)
        .setOsc2Type(osc2Type)
        .noteOn(frequency, time)
        output.gain.setValueAtTime(1, time)
      }
    },
    noteOff(value, time = audioContext.currentTime) {
      if (isPolyphonic && voices[value]) {
        voices[value].stop(time)
        delete voices[value]
      } else {
        notes.splice(notes.indexOf(value), 1)
        if (notes.length > 0) {
          monoVoice
          .setOsc1DetuneValue(osc1DetuneValue)
          .setOsc2DetuneValue(osc2DetuneValue)
          .setOsc1Type(osc1Type)
          .setOsc2Type(osc2Type)
          .noteOn(notes[notes.length - 1], time)
        } else {
          output.gain.setTargetAtTime(0, time, SMOOTHING_TIME_CONSTANT)
        }
      }
    },
    togglePolyphonyValue(value = !isPolyphonic) {
      isPolyphonic = value
      if (!isPolyphonic) {
        output.gain.setTargetAtTime(0, audioContext.currentTime, SMOOTHING_TIME_CONSTANT)
        monoVoice.osc1.connect(gain1)
        monoVoice.osc2.connect(gain2)
        fmGain.connect(monoVoice.osc1.frequency)
        fmGain.connect(monoVoice.osc2.frequency)
      } else {
        monoVoice.disconnect()
        output.gain.cancelScheduledValues(audioContext.currentTime)
        output.gain.setValueAtTime(1, audioContext.currentTime)
      }
    },
    set osc1GainValue(value) {
      osc1GainValue = value
      gain1.gain.value = value
    },
    get osc1GainValue() {
      return osc1GainValue
    },
    set osc1DetuneValue(value) {
      osc1DetuneValue = unscale({ min: 0, max: 100 }, Number(value.toFixed(2)))
      Object.values(voices).forEach(voice => voice.setOsc1DetuneValue(osc1DetuneValue))
    },
    set osc2DetuneValue(value) {
      osc2DetuneValue = unscale({ min: 0, max: 100 }, Number(value.toFixed(2)))
      Object.values(voices).forEach(voice => voice.setOsc1DetuneValue(osc2DetuneValue))
    },
    set osc2GainValue(value) {
      osc2GainValue = value
      gain2.gain.value = value
    },
    get osc2GainValue() {
      return osc2GainValue
    },
    set fmRatioValue(value) {
      fmRatioValue = Number(value.toFixed(1)) * 20
      for (const voice of Object.values(voices)) {
        fmOscillator.frequency.value = voice.osc1.frequency.value * fmRatioValue
        break
      }
    },
    get fmRatioValue() {
      return fmRatioValue / 20
    },
    set fmGainValue(value) {
      fmGainValue = Number(value.toFixed(1)) * 300
      fmGain.gain.value = fmGainValue
    },
    get fmGainValue() {
      return fmGainValue / 300
    },
    get isPolyphonic() {
      return isPolyphonic
    },
    set isPolyphonic(value) {
      isPolyphonic = value
    },
  }
}

const create2xOscVoice = (audioContext) => {
  const osc1 = audioContext.createOscillator()
  const osc2 = audioContext.createOscillator()

  let osc1DetuneValue = 0
  let osc2DetuneValue = 0

  return {
    noteOn(frequency, time = audioContext.currentTime) {
      osc1.frequency.setTargetAtTime(frequency, time, SMOOTHING_TIME_CONSTANT)
      osc1.detune.setValueAtTime(osc1DetuneValue, time)
      osc2.frequency.setTargetAtTime(frequency, time, SMOOTHING_TIME_CONSTANT)
      osc2.detune.setTargetAtTime(osc2DetuneValue, time, SMOOTHING_TIME_CONSTANT)
    },
    start(time) {
      osc1.start(time)
      osc2.start(time)
    },
    stop(time) {
      osc1.stop(time)
      osc2.stop(time)
    },
    disconnect() {
      osc1.disconnect()
      osc2.disconnect()
    },
    setOsc1DetuneValue(value) {
      osc1DetuneValue = value
      osc1.detune.value = value
      return this
    },
    setOsc2DetuneValue(value) {
      osc2DetuneValue = value
      osc2.detune.value = value
      return this
    },
    setOsc1Type(value) {
      osc1.type = value
      return this
    },
    setOsc2Type(value) {
      osc2.type = value
      return this
    },
    get osc1() {
      return osc1
    },
    get osc2() {
      return osc2
    },
  }
}
