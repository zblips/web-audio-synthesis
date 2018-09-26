import * as R from 'ramda'
import { DOM } from 'rx-dom'

export function Keyboard({ start, stop, noteOn, noteOff, pitch }) {
  const subscriptions = []
  const keyMapping = ['q', 'a', 's', 'z', 'd', 'f', 'e', 'g', 'r', 'h', 't', 'j']

  const keyPressed = keyMapping.reduce((acc, k) => {
    acc[k] = false
    return acc
  }, {})

  let octave = 4

  const getShiftedNote = (key, octave) => keyMapping.indexOf(key) + 12 * octave

  return {
    get octave() {
      return octave
    },
    set octave(value) {
      const last = octave
      octave = R.clamp(1, 8, value)
      if (last !== octave) {
        pitch(
          R.ifElse(
            value => value > 0,
            R.identity,
            value => -1 / value,
          )((octave - last) * 2),
        )
      }
    },
    init() {
      /* Key down event triggers noteOn if key is mapped and not already pressed */
      subscriptions.push(
        DOM.keydown(document)
        .filter(({ key }) => keyMapping.indexOf(key) !== -1)
        .filter(({ key }) => !keyPressed[key])
        .subscribe(({ key }) => {
          noteOn(getShiftedNote(key, octave))
          keyPressed[key] = true
        }),
      )
      /* Key up event triggers noteOff if key is mapped */
      subscriptions.push(
        DOM.keyup(document)
        .filter(({ key }) => keyMapping.indexOf(key) !== -1)
        .filter(({ key }) => keyPressed[key])
        .subscribe(({ key }) => {
          noteOff(getShiftedNote(key, octave))
          keyPressed[key] = false
        }),
      )
    },
    destroy() {
      subscriptions.forEach(sub => sub.dispose())
    },
  }
}
