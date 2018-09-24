import { createRandomWaveForm, midiToFrequency, scale, unscale, WaveForms } from 'wasa'

const getFrequency = midiToFrequency(440)

export const create4xVoiceManager = (audioContext) => {
  const gain1 = audioContext.createGain()
  const gain2 = audioContext.createGain()

  const fmOscillator = audioContext.createOscillator()
  const fmGain = audioContext.createGain()

  const allOscsFrequencySource = audioContext.createConstantSource()

  const output = audioContext.createGain()

  let isPolyphonic = true
  let fmRatioValue = 2
  let fmGainValue = 0
  let osc1GainValue = 0.5
  let osc2GainValue = 0.5
  let osc1DetuneValue = 0
  let osc2DetuneValue = 0
  let osc1Type = WaveForms.SAWTOOTH
  let osc2Type = WaveForms.SQUARE
  let osc1Shift = 0
  let osc2Shift = 0
  let voices = new Map() // polyphonic state
  let notes = [] // monophonic state

  let cache = new Map()

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

  allOscsFrequencySource.connect(monoVoice.osc1.frequency)
  allOscsFrequencySource.connect(monoVoice.osc2.frequency)

  allOscsFrequencySource.offset.value = 0
  allOscsFrequencySource.start(audioContext.currentTime)

  gain1.gain.value = 0.5
  gain2.gain.value = 0.5

  const togglePolyphonyValue = (value = !isPolyphonic) => {
    isPolyphonic = value
    if (!isPolyphonic) { // to mono mode
      output.gain.setValueAtTime(0, audioContext.currentTime)
      for (const voice of voices.values()) {
        voice.stop()
      }
      voices.clear()
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
  }

  togglePolyphonyValue(isPolyphonic)

  return {
    connect({ input, connect }) {
      output.connect(input)
      return { connect }
    },
    noteOn(value, time = audioContext.currentTime) {
      fmOscillator.frequency.setValueAtTime(getFrequency(value) * fmRatioValue, time)
      if (isPolyphonic && !voices.has(value)) {
        const voice = create2xOscVoice(audioContext)
        .setOsc1DetuneValue(osc1DetuneValue)
        .setOsc2DetuneValue(osc2DetuneValue)
        .setOsc1Type(osc1Type)
        .setOsc2Type(osc2Type)
        .setOsc1ValueShift(osc1Shift)
        .setOsc2ValueShift(osc2Shift)
        voice.osc1.connect(gain1)
        voice.osc2.connect(gain2)
        allOscsFrequencySource.connect(voice.osc1.frequency)
        allOscsFrequencySource.connect(voice.osc2.frequency)
        fmGain.connect(voice.osc1.frequency)
        fmGain.connect(voice.osc2.frequency)
        voices.set(value, voice)
        cache.set(voice, null)
        voice.onEnded(() => {
          cache.delete(voice)
        })
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
      }
      if (!output.gain['xUnderEnvelopeControl']) {
        output.gain.setValueAtTime(1, time)
      }
    },
    noteOff(value, time = audioContext.currentTime) {
      if (isPolyphonic && voices.has(value)) {
        const deltaTime = output.gain['xUnderEnvelopeControl'] ? output.gain['xEnvelopeDuration'] : 0
        voices.get(value).stop(time + deltaTime)
        voices.delete(value)
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
          if (!output.gain['xUnderEnvelopeControl']) {
            output.gain.setValueAtTime(0, time)
          }
        }
      }
    },
    stop(time = audioContext.currentTime) {
      for (const voice of cache.keys()) {
        voice.stop(time)
      }
      cache.clear()
    },
    togglePolyphonyValue,
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
    get osc1DetuneValue() {
      return scale({ min: 0, max: 100 }, osc1DetuneValue)
    },
    set osc2DetuneValue(value) {
      osc2DetuneValue = unscale({ min: 0, max: 100 }, Number(value.toFixed(2)))
      Object.values(voices).forEach(voice => voice.setOsc1DetuneValue(osc2DetuneValue))
    },
    get osc2DetuneValue() {
      return scale({ min: 0, max: 100 }, osc2DetuneValue)
    },
    set osc2GainValue(value) {
      osc2GainValue = value
      gain2.gain.value = value
    },
    get osc2GainValue() {
      return osc2GainValue
    },
    set fmRatioValue(value) {
      fmRatioValue = unscale({ min: 1, max: 10 }, Number(value.toFixed(1))) * 2
      for (const voice of Object.values(voices)) {
        fmOscillator.frequency.value = voice.osc1.frequency.value * fmRatioValue
        break
      }
    },
    get fmRatioValue() {
      return scale({ min: 1, max: 10 }, fmRatioValue / 2)
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
    get osc1Type() {
      return osc1Type
    },
    set osc1Type(value) {
      osc1Type = value
    },
    get osc2Type() {
      return osc2Type
    },
    set osc2Type(value) {
      osc2Type = value
      Object.values(voices).forEach(voice => voice.setOsc2Type(value))
      monoVoice.setOsc2Type(value)
    },
    get types() {
      return Object.values(WaveForms)
    },
    get isPolyphonic() {
      return isPolyphonic
    },
    set isPolyphonic(value) {
      isPolyphonic = value
    },
    get osc1Gain() {
      return gain1.gain
    },
    get osc2Gain() {
      return gain2.gain
    },
    get outputGain() {
      return output.gain
    },
    get allOscsFrequency() {
      return allOscsFrequencySource.offset
    },
    get fmGainParam() {
      return fmGain.gain
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
      togglePolyphonyValue(isPolyphonic)
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

  const setWaveForm = (waveForm, osc) => {
    if (waveForm === WaveForms.RANDOM) {
      osc.setPeriodicWave(createRandomWaveForm(audioContext))
    } else {
      osc.type = waveForm
    }
  }

  return {
    noteOn(value, time = audioContext.currentTime) {
      const osc1Frequency = getFrequency(value + osc1ValueShift)
      const osc2Frequency = getFrequency(value + osc2ValueShift)
      osc1.frequency.setValueAtTime(osc1Frequency, time)
      osc1.detune.setValueAtTime(osc1DetuneValue, time)
      osc2.frequency.setValueAtTime(osc2Frequency, time)
      osc2.detune.setValueAtTime(osc2DetuneValue, time)
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
      setWaveForm(value, osc1)
      return this
    },
    setOsc2Type(value) {
      setWaveForm(value, osc2)
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
    onEnded(callback) {
      osc1.onended = callback
      return this
    },
  }
}
