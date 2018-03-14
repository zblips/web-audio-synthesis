import { WaveForms } from '@/core/waveforms'
import { Voice } from '@/core/voice'
import { frequencyToMidi } from '@/core/utils'
import { FilterTypes } from "@/core/filter-types"

export const Synth03 = (audioContext) => {
  const output = audioContext.createGain()
  const filter = audioContext.createBiquadFilter();
  filter.connect(output);
  const voices = {}
  let waveForm1 = WaveForms.TRIANGLE
  let waveForm2 = WaveForms.SAWTOOTH
  let detune1 = 0
  let detune2 = 0

  output.gain.value = 0.3
  filter.type = FilterTypes.LOW_PASS
  filter.frequency.value = 500

  return {
    noteOn(value, time = audioContext.currentTime) {
      if (!voices[value]) {
        const voice = Voice(audioContext)
        voices[value] = voice
        voice.waveForm1 = waveForm1
        voice.waveForm2 = waveForm2
        voice.detune1 = detune1
        voice.detune2 = detune2
        voice.connect({ input: filter })
        voice.noteOn(value, time)
      }
    },
    noteOff(value, time = audioContext.currentTime) {
      if (voices[value]) {
        voices[value].noteOff(time)
        delete voices[value]
      }
    },
    pitch(multiplier) {
      Object.values(voices)
        .forEach((voice) => {
          const midValueChange = voice.pitch(multiplier)
          delete voices[midValueChange.lastMidiValue]
          voices[midValueChange.newMidiValue] = voice
        })
    },
    connect({ input }) {
      output.connect(input)
    },
    get waveForms() {
      return Object.values(WaveForms)
    },
    get waveForm1() {
      return waveForm1
    },
    set waveForm1(value) {
      waveForm1 = value
      Object.values(voices)
        .forEach(voice => { voice.waveForm1 = waveForm1 })
    },
    get waveForm2() {
      return waveForm2
    },
    set waveForm2(value) {
      waveForm2 = value
      Object.values(voices)
        .forEach(voice => { voice.waveForm2 = waveForm2 })
    },
    get detune1() {
      return detune1
    },
    set detune1(value) {
      detune1 = value
      Object.values(voices)
        .forEach(voice => { voice.detune1 = detune1 })
    },
    get detune2() {
      return detune2
    },
    set detune2(value) {
      detune2 = value
      Object.values(voices)
        .forEach(voice => { voice.detune2 = detune2 })
    },
    get filterTypes() {
      return Object.values(FilterTypes)
    },
    get filterType() {
      return filter.type
    },
    set filterType(value) {
      filter.type = value
    },
    get frequency() {
      return filter.frequency.value
    },
    set frequency(value) {
      filter.frequency.setTargetAtTime(value, audioContext.currentTime, .1)
    },
    get qualityFactor() {
      return filter.Q.value
    },
    set qualityFactor(value) {
      filter.Q.setTargetAtTime(value, audioContext.currentTime, .05)
    },
  }
}
