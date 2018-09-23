import { Observable } from 'rxjs'
import { createDryWetMixer } from 'wasa'

export const Reverb = (audioContext) => {
  const convolver = audioContext.createConvolver()
  const dryWetMixer = createDryWetMixer(audioContext)

  dryWetMixer.setWetNode(convolver)

  return {
    connect({ input, connect }) {
      dryWetMixer.connect({ getInput: () => input })
      return { connect }
    },
    get input() {
      return dryWetMixer.getInput()
    },
    setImpulse(url) {
      return Observable.create(observer => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = () => {
          audioContext.decodeAudioData(xhr.response, (buffer) => {
            convolver.buffer = buffer
            convolver.loop = true
            convolver.normalize = true
            observer.next(convolver)
            observer.complete()
          })
        }
        xhr.onError = (event) => {
          observer.error(event)
        }
        xhr.send()
      })
    },
  }
}
