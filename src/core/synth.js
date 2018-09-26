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

export const createSynth = (audioContext) => {
  const voiceManager = create4xVoiceManager(audioContext)

  const filter = createFilter(audioContext).setFadeValue(-1)

  const accentEnvelope = createAccentEnvelope({
    [EnvelopeParameterKeys.FILTER_FREQUENCY]: filter.frequencyParam,
    [EnvelopeParameterKeys.FILTER_PEAK]: filter.peakParam,
  })
  .setActiveParameter(EnvelopeParameterKeys.FILTER_FREQUENCY)
  .toggleActive(true)

  const adsrEnvelope = createAdsrEnvelope({
    [EnvelopeParameterKeys.OSC1_GAIN]: voiceManager.osc1Gain,
    [EnvelopeParameterKeys.OSC2_GAIN]: voiceManager.osc2Gain,
    [EnvelopeParameterKeys.OSCS_GAIN]: voiceManager.outputGain,
  })
  .setActiveParameter(EnvelopeParameterKeys.OSCS_GAIN)
  .toggleActive(false)

  const lfo = createLfo(audioContext, {
    [LFODestinations.FILTER_FREQUENCY]: filter.frequencyParam,
    [LFODestinations.ALL_FREQUENCY]: voiceManager.allOscsFrequency,
    [LFODestinations.FILTER_PEAK]: filter.peakParam,
    [LFODestinations.FM_AMOUNT]: voiceManager.fmGainParam,
  })
  .setActiveParameter(LFODestinations.OFF)

  voiceManager.connect(filter)

  voiceManager.osc2GainValue = 0

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
    stop(time = audioContext.currentTime) {
      voiceManager.stop(time)
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
    setState({
               isOsc1Active = voiceManager.osc1GainValue > 0,
               isOsc2Active = voiceManager.osc2GainValue > 0,
               isAdsrEnvelopeActive = adsrEnvelope.isActive,
               isFilterActive = filter.fadeValue > -1,
               isAccentActive = accentEnvelope.isActive,
               isFmActive = voiceManager.fmGainValue > 0,
               fmGainValue = voiceManager.fmGainValue,
               lfoDestination = lfo.destination,
               osc1Type = voiceManager.osc1Type,
               osc2Type = voiceManager.osc2Type,
               osc1Shift = voiceManager.osc1Shift,
               osc2Shift = voiceManager.osc2Shift,
               filterType = filter.type,
               filterFrequency = filter.frequencyValue,
               filterPeak = filter.peakValue,
             }) {
      voiceManager.osc1GainValue = isOsc1Active ? 0.5 : 0
      voiceManager.osc2GainValue = isOsc2Active ? 0.5 : 0
      voiceManager.fmGainValue = isFmActive ? fmGainValue : 0
      lfo.destination = lfoDestination
      filter.fadeValue = isFilterActive ? 1 : -1
      adsrEnvelope.toggleActive(isAdsrEnvelopeActive)
      accentEnvelope.toggleActive(isAccentActive)
      voiceManager.osc1Type = osc1Type
      voiceManager.osc2Type = osc2Type
      voiceManager.osc1Shift = osc1Shift
      voiceManager.osc2Shift = osc2Shift
      filter.type = filterType
      filter.frequencyValue = filterFrequency
      filter.peakValue = filterPeak
      return this
    },
    get lfo() {
      return lfo
    },
  }
}
