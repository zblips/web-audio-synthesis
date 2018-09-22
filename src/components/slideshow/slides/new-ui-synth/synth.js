import { create4xVoiceManager } from './voice'
import { createFilter } from './filter'
import { createAccentEnvelope } from './accent-envelope'
import { createAdsrEnvelope } from './adsr-enveloppe'
import { createLfo, LFODestinations } from './lfo'

const EnvelopeParameterKeys = {
  FILTER_FREQUENCY: 'filter freq.',
  FILTER_PEAK: 'filter peak',
  OSC1_GAIN: 'vca 1',
  OSC2_GAIN: 'vca 2',
  OSCS_GAIN: 'vca 1/2',
}

export const Synth = (audioContext) => {
  const voiceManager = create4xVoiceManager(audioContext)

  const filter = createFilter(audioContext).setFadeValue(-1)

  const accentEnvelope = createAccentEnvelope({
    [EnvelopeParameterKeys.FILTER_FREQUENCY]: filter.frequencyParam,
    [EnvelopeParameterKeys.FILTER_PEAK]: filter.peakParam,
  })
  .setActiveParameter(EnvelopeParameterKeys.FILTER_FREQUENCY)
  .toggleActive()

  const adsrEnvelope = createAdsrEnvelope({
    [EnvelopeParameterKeys.OSC1_GAIN]: voiceManager.osc1Gain,
    [EnvelopeParameterKeys.OSC2_GAIN]: voiceManager.osc2Gain,
    [EnvelopeParameterKeys.OSCS_GAIN]: voiceManager.outputGain,
  })
  .setActiveParameter(EnvelopeParameterKeys.OSCS_GAIN)
  .toggleActive()

  const lfo = createLfo(audioContext, {
    [LFODestinations.FILTER_FREQUENCY]: filter.frequencyParam,
    [LFODestinations.ALL_FREQUENCY]: voiceManager.allOscsFrequency,
    [LFODestinations.FILTER_PEAK]: filter.peakParam,
  })
  .setActiveParameter(LFODestinations.FILTER_FREQUENCY)

  voiceManager.connect(filter)

  return {
    noteOn(value, time = audioContext.currentTime) {
      voiceManager.noteOn(value, time)
      accentEnvelope.start(time)
      adsrEnvelope.start(time)
    },
    noteOff(value, time = audioContext.currentTime) {
      voiceManager.noteOff(value, time)
      accentEnvelope.stop(time)
      adsrEnvelope.stop(time)
    },
    connect({ input, connect }) {
      filter.connect({ input })
      return { connect }
    },
    get voiceManager() {
      return voiceManager
    },
    get filter() {
      return filter
    },
    get accentEnvelope() {
      return accentEnvelope
    },
    get adsrEnvelope() {
      return adsrEnvelope
    },
    get lfo() {
      return lfo
    },
  }
}
