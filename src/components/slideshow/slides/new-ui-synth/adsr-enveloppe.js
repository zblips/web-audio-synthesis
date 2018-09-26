import { scale, unscale } from 'wasa'

const EPSILON = 2.220446049250313e-16

const MIN_ATTACK_TIME = EPSILON
const MAX_ATTACK_TIME = 0.15
const MIN_DECAY_TIME = 0.05
const MAX_DECAY_TIME = 0.3
const MIN_SUSTAIN_TIME = EPSILON
const MAX_SUSTAIN_TIME = 0.5
const MIN_RELEASE_TIME = EPSILON
const MAX_RELEASE_TIME = 1

export const createAdsrEnvelope = (parameters) => {
  let initValue = EPSILON
  let attackTime = 0.01
  let decayTime = 0.15
  let releaseTime = 0.01
  let sustainValue = 0.2
  let sustainTime = 0.1
  let peakValue = 1

  let isActive = false

  let parameter

  const update = (audioParam) => {
    audioParam.xEnvelopeDuration = attackTime + decayTime + sustainTime + releaseTime
  }

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
      sustainValue = parameter.value / 2
      peakValue = sustainValue * 2
      return this
    },
    setAttackTime(value) {
      attackTime = unscale({ min: MIN_ATTACK_TIME, max: MAX_ATTACK_TIME }, value)
      update(parameter)
      return this
    },
    setDecayTime(value) {
      decayTime = unscale({ min: MIN_DECAY_TIME, max: MAX_DECAY_TIME }, value)
      update(parameter)
      return this
    },
    setReleaseTime(value) {
      releaseTime = unscale({ min: MIN_RELEASE_TIME, max: MAX_RELEASE_TIME }, value)
      update(parameter)
      return this
    },
    toggleActive(value = !isActive) {
      isActive = value
      if (!isActive && parameter) {
        reset(parameter)
      }
      parameter.xUnderEnvelopeControl = isActive
      return this
    },
    start(time) {
      if (parameter && isActive) {
        parameter.cancelScheduledValues(time)
        parameter.setValueAtTime(initValue, time)
        parameter.linearRampToValueAtTime(peakValue, time + attackTime)
        parameter.linearRampToValueAtTime(sustainValue, time + attackTime + decayTime)
        parameter.linearRampToValueAtTime(sustainValue, time + attackTime + decayTime + sustainTime)
      }
    },
    stop(time) {
      if (parameter && isActive) {
        parameter.linearRampToValueAtTime(initValue, time + attackTime + decayTime + sustainTime + releaseTime)
      }
    },
    get isActive() {
      return isActive
    },
    set attack(value) {
      attackTime = unscale({ min: MIN_ATTACK_TIME, max: MAX_ATTACK_TIME }, value)
      update(parameter)
    },
    get attack() {
      return scale({ min: MIN_ATTACK_TIME, max: MAX_ATTACK_TIME }, attackTime)
    },
    set decay(value) {
      decayTime = unscale({ min: MIN_DECAY_TIME, max: MAX_DECAY_TIME }, value)
      update(parameter)
    },
    get decay() {
      return scale({ min: MIN_DECAY_TIME, max: MAX_DECAY_TIME }, decayTime)
    },
    set sustain(value) {
      sustainTime = unscale({ min: MIN_SUSTAIN_TIME, max: MAX_SUSTAIN_TIME }, value)
      update(parameter)
    },
    get sustain() {
      return scale({ min: MIN_SUSTAIN_TIME, max: MAX_SUSTAIN_TIME }, sustainTime)
    },
    set release(value) {
      releaseTime = unscale({ min: MIN_RELEASE_TIME, max: MAX_RELEASE_TIME }, value)
      update(parameter)
    },
    get release() {
      return scale({ min: MIN_RELEASE_TIME, max: MAX_RELEASE_TIME }, releaseTime)
    },
  }
}
