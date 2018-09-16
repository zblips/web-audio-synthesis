import { Dispatcher, midiToFrequency, WaveForms } from 'wasa'

const getFrequency = midiToFrequency(440)

const SMOOTHING_TIME_CONSTANT = 1E10

export const create4xVoiceManager = (audioContext) => {
  /*
   monophonic voice is created once and reused, while polyphonic voices are created on demand
   */
  const createMonoVoice = () => {
    const voice = create2xOscVoice(audioContext)
    voice.start(audioContext.currentTime)
    return voice
  }

  const gain1 = audioContext.createGain()
  const gain2 = audioContext.createGain()

  const fmOscillator = audioContext.createOscillator()
  const fmGain = audioContext.createGain()

  const output = audioContext.createGain()

  const dispatcher = Dispatcher.openSession()

  let fmRatio = 1
  let isPolyphonic = false
  let voices = {} // polyphonic state
  let notes = [] // monophonic state
  let monoVoice

  /* routing */
  gain1.connect(output)
  gain2.connect(output)
  fmOscillator.connect(fmGain)
  fmOscillator.start()

  gain1.gain.value = 0.5
  gain2.gain.value = 0.5

  fmOscillator.frequency.value = 400
  fmGain.gain.value = 100

  const
    togglePolyphony = (value = !isPolyphonic) => {
      isPolyphonic = value
      if (!isPolyphonic) {
        monoVoice = createMonoVoice()
        monoVoice.osc1.connect(gain1)
        monoVoice.osc2.connect(gain2)
        fmGain.connect(monoVoice.osc1.frequency)
        fmGain.connect(monoVoice.osc2.frequency)
        output.gain.setTargetAtTime(0, audioContext.currentTime, SMOOTHING_TIME_CONSTANT)
      } else {
        if (monoVoice) {
          monoVoice.disconnect()
        }
        fmGain.disconnect()
        output.gain.cancelScheduledValues(audioContext.currentTime)
        output.gain.setValueAtTime(1, audioContext.currentTime)
      }
      dispatcher.dispatch('POLYPHONY_TOGGLED', isPolyphonic)
    }

  // Handle events
  dispatcher.as('OSC1_GAIN_CHANGED')
  .subscribe((value) => {
    gain1.gain.value = Number(value.toFixed(1))
  })
  dispatcher.dispatch('OSC1_GAIN_CHANGED', gain1.gain.value)

  dispatcher.as('OSC2_GAIN_CHANGED')
  .subscribe((value) => {
    gain2.gain.value = Number(value.toFixed(1))
  })
  dispatcher.dispatch('OSC2_GAIN_CHANGED', gain2.gain.value)

  dispatcher.as('FM_AMOUNT_CHANGED')
  .subscribe((value) => {
    fmGain.gain.value = Number(value.toFixed(1)) * 300
  })
  dispatcher.dispatch('FM_AMOUNT_CHANGED', fmGain.gain.value / 300)

  dispatcher.as('FM_RATIO_CHANGED')
  .subscribe((value) => {
    fmRatio = Number(value.toFixed(1)) * 20
    for (const voice of Object.values(voices)) {
      fmOscillator.frequency.value = voice.osc1.frequency.value * fmRatio
      break
    }
  })
  dispatcher.dispatch('FM_RATIO_CHANGED', fmRatio / 20)

  dispatcher.as('POLYPHONY_TOGGLED')
  .subscribe(togglePolyphony)

  togglePolyphony(true)

  return {
    connect({ input, connect }) {
      output.connect(input)
      return { connect }
    },
    noteOn(value, time = audioContext.currentTime) {
      if (isPolyphonic && !voices[value]) {
        const voice = create2xOscVoice(audioContext)
        voice.osc1.connect(gain1)
        voice.osc2.connect(gain2)

        fmGain.connect(voice.osc1.frequency)
        fmGain.connect(voice.osc2.frequency)
        voices[value] = voice

        voice.noteOn(value, time)
        voice.start(time)
      } else if (!isPolyphonic && notes.indexOf(value) === -1) {
        notes.push(value)
        monoVoice.noteOn(value, time)
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
          monoVoice.noteOn(notes[notes.length - 1], time)
        } else {
          output.gain.setTargetAtTime(0, time, SMOOTHING_TIME_CONSTANT)
        }
      }
    },
  }
}

const create2xOscVoice = (audioContext) => {
  const osc1 = audioContext.createOscillator()
  const osc2 = audioContext.createOscillator()

  osc1.type = WaveForms.SINE
  osc2.type = WaveForms.SAWTOOTH

  return {
    noteOn(value, time = audioContext.currentTime) {
      const frequency = getFrequency(value)
      osc1.frequency.setTargetAtTime(frequency, time, SMOOTHING_TIME_CONSTANT)
      osc2.frequency.setTargetAtTime(frequency, time, SMOOTHING_TIME_CONSTANT)
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
    osc1,
    osc2,
  }
}
