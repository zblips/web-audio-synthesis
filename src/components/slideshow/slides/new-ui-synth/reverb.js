import { Observable } from 'rxjs'
import { createDryWetMixer } from 'wasa'

export const createReverb = (audioContext) => {
  const convolver = audioContext.createConvolver()
  const dryWetMixer = createDryWetMixer(audioContext)

  dryWetMixer.setWetNode(convolver)

  return {
    setFadeValue(value) {
      dryWetMixer.setFadeValue(value)
      return this
    },
    connect({ input, connect }) {
      dryWetMixer.connect({ getInput: () => input })
      return { connect }
    },
    get input() {
      return dryWetMixer.getInput()
    },
    setImpulse(url) {
      return Observable.create(observer => {
        fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          audioContext.decodeAudioData(buffer, (data) => {
            convolver.buffer = data
            convolver.loop = true
            convolver.normalize = true
            observer.next(convolver)
            observer.complete()
          })
        })
        .catch(error => observer.error(error))
      })
    },
  }
}
