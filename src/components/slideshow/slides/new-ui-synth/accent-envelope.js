import { scale, unscale } from 'wasa'

export const createAccentEnvelope = (parameters) => {
  let attackTime = 0.01
  let decayTime = 0.1
  let accentValue = 8000
  let peakValue = 0
  let sustainValue = 0
  let isActive = false

  let parameter

  const reset = (audioParam) => {
    audioParam.xUnderEnvelopeControl = false
  }

  return {
    setActiveParameter(audioParamKey) {
      if (parameter) {
        reset(parameter)
      }
      parameter = parameters[audioParamKey]
      parameter.xUnderEnvelopeControl = true
      peakValue = parameter.value
      sustainValue = parameter.value
      return this
    },
    setAttackTime(value) {
      attackTime = unscale({ min: 0.001, max: 0.25 }, value)
      return this
    },
    setDecayTime(value) {
      decayTime = unscale({ min: 0.001, max: 0.5 }, value)
      return this
    },
    setSustainValue(value) {
      sustainValue = unscale({ min: 0.001, max: 0.5 }, value)
      return this
    },
    setAccentValue(value) {
      accentValue = value
      return this
    },
    start(time) {
      if (isActive) {
        parameter.cancelScheduledValues(time)
        peakValue = sustainValue + accentValue
        parameter.setValueAtTime(sustainValue, time)
        parameter.linearRampToValueAtTime(peakValue, time + attackTime)
        parameter.exponentialRampToValueAtTime(sustainValue, time + attackTime + decayTime)
      }
    },
    stop(time) {
      if (parameter && isActive) {
        parameter.setValueAtTime(sustainValue, time)
        parameter.cancelScheduledValues(time)
      }
    },
    toggleActive(value = !isActive) {
      isActive = value
      if (!isActive && parameter) {
        reset(parameter)
      }
      parameter.xUnderEnvelopeControl = isActive
      return this
    },
    get parameterKeys() {
      return Object.keys(parameters)
    },
    get isActive() {
      return isActive
    },
    set accent(value) {
      accentValue = unscale({ min: 0.001, max: 8000 }, value)
    },
    get accent() {
      return scale({ min: 0.001, max: 8000 }, accentValue)
    },
    set attack(value) {
      attackTime = unscale({ min: 0.001, max: 0.25 }, value)
    },
    get attack() {
      return scale({ min: 0.001, max: 0.5 }, attackTime)
    },
    set decay(value) {
      decayTime = unscale({ min: 0.001, max: 0.5 }, value)
    },
    get decay() {
      return scale({ min: 0.001, max: 0.5 }, decayTime)
    },
    set sustain(value) {
      sustainValue = unscale({ min: 0.001, max: parameter.value }, value)
    },
    get sustain() {
      return scale({ min: 0.001, max: parameter.value }, sustainValue)
    },
  }
}
