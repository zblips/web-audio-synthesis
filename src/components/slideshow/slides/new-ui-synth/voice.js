import { midiToFrequency, unscale, WaveForms } from 'wasa'

const getFrequency = midiToFrequency(440)

const SMOOTHING_TIME_CONSTANT = 1E10

export const create4xVoiceManager = (audioContext) => {
  const gain1 = audioContext.createGain()
  const gain2 = audioContext.createGain()

  const fmOscillator = audioContext.createOscillator()
  const fmGain = audioContext.createGain()

  const output = audioContext.createGain()

  let isPolyphonic = false
  let fmRatioValue = 0
  let fmGainValue = 0
  let osc1GainValue = 0.5
  let osc2GainValue = 0.5
  let osc1DetuneValue = 0
  let osc2DetuneValue = 0
  let osc1Type = WaveForms.SINE
  let osc2Type = WaveForms.SQUARE
  let osc1Shift = 0
  let osc2Shift = 0
  let voices = {} // polyphonic state
  let notes = [] // monophonic state

  let monoVoice = create2xOscVoice(audioContext)
  .setOsc1DetuneValue(osc1DetuneValue)
  .setOsc2DetuneValue(osc2DetuneValue)
  .setOsc1Type(osc1Type)
  .setOsc2Type(osc2Type)
  .setOsc1ValueShift(osc1Shift)
  .setOsc2ValueShift(osc2Shift)
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
      fmOscillator.frequency.setTargetAtTime(getFrequency(value) * fmRatioValue, time, SMOOTHING_TIME_CONSTANT)

      if (isPolyphonic && !voices[value]) {
        const voice = create2xOscVoice(audioContext)
        .setOsc1DetuneValue(osc1DetuneValue)
        .setOsc2DetuneValue(osc2DetuneValue)
        .setOsc1Type(osc1Type)
        .setOsc2Type(osc2Type)
        .setOsc1ValueShift(osc1Shift)
        .setOsc2ValueShift(osc2Shift)
        voice.osc1.connect(gain1)
        voice.osc2.connect(gain2)
        fmGain.connect(voice.osc1.frequency)
        fmGain.connect(voice.osc2.frequency)
        voices[value] = voice
        voice.noteOn(value, time)
        voice.start(time)
      } else if (!isPolyphonic && notes.indexOf(value) === -1) {
        notes.push(value)
        monoVoice
        .setOsc1DetuneValue(osc1DetuneValue)
        .setOsc2DetuneValue(osc2DetuneValue)
        .setOsc1Type(osc1Type)
        .setOsc2Type(osc2Type)
        .setOsc1ValueShift(osc1Shift)
        .setOsc2ValueShift(osc2Shift)
        .noteOn(value, time)
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
          .setOsc1ValueShift(osc1Shift)
          .setOsc2ValueShift(osc2Shift)
          .noteOn(notes[notes.length - 1], time)
        } else {
          output.gain.setTargetAtTime(0, time, SMOOTHING_TIME_CONSTANT)
        }
      }
    },
    stop(time = audioContext.currentTime) {
      Object.values(voices).forEach(voice => voice.stop(time))
      monoVoice.cancelScheduledValues(time)
      output.gain.setValueAtTime(0, time)
    },
    togglePolyphonyValue(value = !isPolyphonic) {
      isPolyphonic = value
      if (!isPolyphonic) { // to mono mode
        output.gain.setTargetAtTime(0, audioContext.currentTime, SMOOTHING_TIME_CONSTANT)
        Object.values(voices).forEach(voice => voice.stop())
        monoVoice.osc1.connect(gain1)
        monoVoice.osc2.connect(gain2)
        fmGain.connect(monoVoice.osc1.frequency)
        fmGain.connect(monoVoice.osc2.frequency)
      } else {
        monoVoice.disconnect()
        output.gain.cancelScheduledValues(audioContext.currentTime)
        output.gain.setValueAtTime(1, audioContext.currentTime)
        notes = []
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
    set osc1Shift(value) {
      osc1Shift = value * 12
    },
    set osc2Shift(value) {
      osc2Shift = value * 12
    },
    get isPolyphonic() {
      return isPolyphonic
    },
    set isPolyphonic(value) {
      isPolyphonic = value
    },
    getState() {
      return {
        isPolyphonic,
        fmRatioValue,
        fmGainValue,
        osc1GainValue,
        osc2GainValue,
        osc1DetuneValue,
        osc2DetuneValue,
        osc1Type,
        osc2Type,
        osc1Shift,
        osc2Shift,
      }
    },
    setState(state) {
        isPolyphonic = state.isPolyphonic
        fmRatioValue = state.fmRatioValue
        fmGainValue = state.fmGainValue
        osc1GainValue = state.osc1GainValue
        osc2GainValue = state.osc2GainValue
        osc1DetuneValue = state.osc1DetuneValue
        osc2DetuneValue = state.osc2DetuneValue
        osc1Type = state.osc1Type
        osc2Type = state.osc2Type
        osc1Shift = state.osc1Shift
        osc2Shift = state.osc2Shift
        return this
    },
  }
}

const create2xOscVoice = (audioContext) => {
  const osc1 = audioContext.createOscillator()
  const osc2 = audioContext.createOscillator()

  let osc1DetuneValue = 0
  let osc2DetuneValue = 0

  let osc1ValueShift = 0
  let osc2ValueShift = 0

  return {
    noteOn(value, time = audioContext.currentTime) {
      const osc1Frequency = getFrequency(value + osc1ValueShift)
      const osc2Frequency = getFrequency(value + osc2ValueShift)
      osc1.frequency.setTargetAtTime(osc1Frequency, time, SMOOTHING_TIME_CONSTANT)
      osc1.detune.setValueAtTime(osc1DetuneValue, time)
      osc2.frequency.setTargetAtTime(osc2Frequency, time, SMOOTHING_TIME_CONSTANT)
      osc2.detune.setTargetAtTime(osc2DetuneValue, time, SMOOTHING_TIME_CONSTANT)
    },
    start(time = audioContext.currentTime) {
      osc1.start(time)
      osc2.start(time)
    },
    stop(time = audioContext.currentTime) {
      osc1.stop(time)
      osc2.stop(time)
    },
    disconnect() {
      osc1.disconnect()
      osc2.disconnect()
    },
    cancelScheduledValues(time = audioContext.currentTime) {
      osc1.frequency.cancelScheduledValues(time)
      osc1.detune.cancelScheduledValues(time)
      osc2.frequency.cancelScheduledValues(time)
      osc2.detune.cancelScheduledValues(time)
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
    setOsc1ValueShift(value) {
      osc1ValueShift = value
      return this
    },
    setOsc2ValueShift(value) {
      osc2ValueShift = value
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
