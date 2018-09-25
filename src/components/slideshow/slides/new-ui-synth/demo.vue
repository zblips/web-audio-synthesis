<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

  .synth {
    position: fixed;
    background: #dbdbdb;
    width: 100vw;
    height: 100vh;

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
        <envelope :class="{'card-disabled': options.isAccentDisabled}" :state="synth.accentEnvelope"></envelope>
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
  import { Keyboard } from './keyboard'
  import { Synth } from './synth'
  import { Output } from './output'
  import MibVisualizer from './ui-visualizer.vue'
  import { resetSariasSongMapping, setSariasSongMapping } from '../../../../core/utils/gamepad-service'
  import { createMidiTrack } from '@/core/midi/midi-track'
  import { saria } from '../../../../core/midi/midi-events/saria-events'
  import Osc from './oscillator.vue'
  import Envelope from './envelope'
  import UiFilter from './ui-filter'
  import UiSynthBar from './ui-synth-bar.vue'
  import Lfo from './lfo.vue'
  import UiOutput from './ui-output.vue'
  import { createReverb } from './reverb'

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
    data() {
      const audioContext = new AudioContext()
      const synth = Synth(audioContext)
      const output = Output(audioContext)
      const midiTrack = createMidiTrack(audioContext, saria).setSlave(synth)
      const keyboard = Keyboard(Object.assign(synth, midiTrack))
      const reverb = createReverb(audioContext)
      return {
        audioContext,
        synth,
        output,
        midiTrack,
        reverb,
        keyboard,
      }
    },
    props: {
      options: {
        type: Object,
      },
    },
    mounted() {
      this.audioContext = new AudioContext()
      this.synth = Synth(this.audioContext)
      this.output = Output(this.audioContext)
      this.midiTrack = createMidiTrack(this.audioContext, saria).setSlave(this.synth)
      this.keyboard = Keyboard(Object.assign(this.synth, this.midiTrack))
      this.reverb = createReverb(this.audioContext)
      this.reverb
      .setFadeValue(1)
      .setImpulses()
      .subscribe(() => {
        this.reverb.impulse = 'Deep space'
        this.synth.connect(this.reverb).connect(this.output)
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
