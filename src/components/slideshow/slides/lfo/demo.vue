<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

  .synth {
    position: fixed;
    background: #dbdbdb;
    width: 100vw;
    height: 100vh;
    font-family: "Lucida Console", Monaco, monospace;

    .upper-row, .lower-row {
      height: 47vh;
      width: 100vw;
      display: flex;
      box-sizing: border-box;
    }
  }
</style>

<template>
  <div class="slide">
    <div class="synth">
      <ui-synth-bar :state="{ midiTrack, synth }"></ui-synth-bar>

      <div class="upper-row">
        <osc :class="{'card-osc2-disabled': options.isOsc2Disabled, 'card-fm-disabled': options.isFmDisabled}"
             :state="synth.voiceManager">
        </osc>

        <envelope :class="{'card-disabled': options.isADSRDisabled}" type="ADSR" :state="synth.adsrEnvelope"></envelope>
        <ui-filter :class="{'card-disabled': options.isFilterDisabled}" :state="synth.filter"></ui-filter>
        <envelope :class="{'card-disabled': options.isAccentDisabled}" type="Accent"
                  :state="synth.accentEnvelope"></envelope>
        <lfo :class="{'card-disabled': options.isLFODisabled}" :state="synth.lfo"></lfo>
        <ui-output :class="{'card-disabled': options.isReverbDisabled}" :state="{ reverb }"></ui-output>
      </div>
      <div class="lower-row">
        <mib-visualizer :analyzer="output.analyzer"></mib-visualizer>
        <mib-visualizer :analyzer="output.analyzer" type="spectrum"></mib-visualizer>
      </div>
    </div>

  </div>
</template>

<script>
  import { Keyboard } from '../../../../core/keyboard.js'
  import { createSynth } from '../../../../core/synth'
  import { Output } from '../../../../core/output'
  import { resetSariasSongMapping, setSariasSongMapping } from '../../../../core/utils/gamepad-service'
  import { createMidiTrack } from '../../../../core/midi/midi-track'
  import { createReverb } from '../../../../core/reverb'

  import Osc from '../../../ui/oscillator.vue'
  import Envelope from '../../../ui/envelope.vue'
  import UiFilter from '../../../ui/ui-filter.vue'
  import UiSynthBar from '../../../ui/ui-synth-bar.vue'
  import Lfo from '../../../ui/lfo.vue'
  import UiOutput from '../../../ui/ui-output.vue'
  import MibVisualizer from '../../../ui/ui-visualizer.vue'

  import { WaveForms } from 'wasa'
  import { LFODestinations } from '../../../../core/lfo-destinations'

  const state = {
    synth: {
      isOsc1Active: true,
      isOsc2Active: true,
      isPolyphonic: true,
      isFmActive: false,
      fmGainValue: 0,
      isAdsrEnvelopeActive: false,
      isFilterActive: true,
      isAccentActive: false,
      lfoDestination: LFODestinations.FILTER_FREQUENCY,
      os1Type: WaveForms.TRIANGLE,
    },
    midiTrack: {
      tempo: 100,
    },
    reverb: {
      fadeValue: 0,
    },
  }

  export default {
    components: {
      UiSynthBar,
      UiFilter,
      Envelope,
      MibVisualizer,
      Osc,
      Lfo,
      UiOutput,
    },
    props: {
      options: {
        type: Object,
      },
    },
    created() {
      this.audioContext = new AudioContext()
      this.synth = createSynth(this.audioContext)
      .setState(state.synth)
      this.output = Output(this.audioContext)
      this.midiTrack = createMidiTrack(this.audioContext)
      .setTrack('saria')
      .setTempo(state.midiTrack.tempo)
      .setSlave(this.synth)
      this.keyboard = Keyboard(Object.assign(this.synth, this.midiTrack))
      this.reverb = createReverb(this.audioContext)
      this.reverb
      .setFadeValue(state.reverb.fadeValue)
      .load()
      .subscribe(() => {
        this.synth.connect(this.reverb).connect(this.output)
        this.reverb.impulse = 'Deep space'
        this.keyboard.init()
        setSariasSongMapping(this.synth.noteOn, this.synth.noteOff)
      })
    },
    destroyed() {
      this.audioContext.close()
      .then(() => {
        this.keyboard.destroy()
      })
      resetSariasSongMapping()
    },
  }
</script>
