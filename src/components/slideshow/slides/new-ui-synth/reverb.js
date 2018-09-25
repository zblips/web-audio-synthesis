import { Observable } from 'rxjs'
import { createDryWetMixer, scale, unscale } from 'wasa'

export const IMPULSES = {
  'Block inside': 'Block_Inside.wav',
  'Deep space': 'Deep_Space.wav',
  'On a starr': 'On_a_Star.wav',
}

export const createReverb = (audioContext) => {
  // const convolver = audioContext.createConvolver()
  const dryWetMixer = createDryWetMixer(audioContext)

  // dryWetMixer.setWetNode(convolver)

  const impulses = {}
  let impulse

  return {
    setFadeValue(value) {
      dryWetMixer.setFadeValue(unscale({ min: -1, max: 1 }, value))
      return this
    },
    connect({ input, connect }) {
      dryWetMixer.connect({ getInput: () => input })
      return { connect }
    },
    get input() {
      return dryWetMixer.getInput()
    },
    get fadeValue() {
      return scale({ min: -1, max: 1 }, dryWetMixer.getFadeValue())
    },
    get impulse() {
      return impulse
    },
    get impulses() {
      return Object.keys(IMPULSES)
    },
    set impulse(name) {
      impulse = name
      dryWetMixer.setWetNode(impulses[name])
    },
    setImpulses() {
      return Observable.create(observer => {
        (async () => {
          for (const [name, url] of Object.entries(IMPULSES)) {
            const response = await fetch(require(`../../../../assets/media/${url}`))
            const arrayBuffer = await response.arrayBuffer()
            const convolver = audioContext.createConvolver()
            audioContext.decodeAudioData(arrayBuffer, (buffer) => {
              convolver.buffer = buffer
              convolver.loop = true
              convolver.normalize = true
              impulses[name] = convolver
            })
          }
          observer.next()
          observer.complete()
        })()
        .catch(error => observer.error(error))
      })
    },
  }
}
