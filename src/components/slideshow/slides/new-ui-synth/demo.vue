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
      <div class="upper-row">
        <osc :state="synth.voiceManager"></osc>
        <envelope type="ADSR" :state="synth.adsrEnvelope"></envelope>
        <ui-filter :state="synth.filter"></ui-filter>
        <envelope :state="synth.accentEnvelope"></envelope>
        <lfo :state="synth.lfo"></lfo>
      </div>
      <div class="lower-row">
        <mib-visualizer :analyzer="output.analyzer"></mib-visualizer>
        <mib-visualizer :analyzer="output.analyzer" type="spectrum"></mib-visualizer>
      </div>
      <ui-synth-bar :state="{ midiTrack, synth }"></ui-synth-bar>
    </div>

  </div>
</template>

<script>
  import { Keyboard } from './keyboard'
  import { Synth } from './synth'
  import { Output } from './output'
  import MibVisualizer from './mib-visualizer.vue'
  import { resetSariasSongMapping, setSariasSongMapping } from '../../../../core/utils/gamepad-service'
  import { createMidiTrack } from '@/core/midi/midi-track'
  import { saria } from '../../../../core/midi/midi-events/saria-events'
  import Osc from './oscillator.vue'
  import Envelope from './envelope'
  import UiFilter from './ui-filter'
  import UiSynthBar from './ui-synth-bar.vue'
  import Lfo from './lfo.vue'
  import { createReverb } from './reverb'

  import { Dispatcher } from 'wasa'

  const dispatcher = Dispatcher.openSession()

  export default {
    components: {
      UiSynthBar,
      UiFilter,
      Envelope,
      MibVisualizer,
      Osc,
      Lfo,
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
    methods: {
      stop() {
        this.audioContext.close()
        .catch(() => console.info('context is allready closed'))
        .then(() => {
          this.keyboard.destroy()
          resetSariasSongMapping()

          const voiceState = this.synth.voiceManager.getState()
          this.audioContext = new AudioContext()
          this.reverb = createReverb(this.audioContext)
          this.reverb
          .setFadeValue(-1)
          .setImpulse(require('../../../../assets/media/Nice_Drum_Room.wav'))
          .subscribe(() => {
            this.synth = Synth(this.audioContext)
            this.synth.voiceManager.setState(voiceState)
            this.output = Output(this.audioContext)
            this.synth.connect(this.reverb).connect(this.output)
            this.midiTrack = createMidiTrack(this.audioContext, saria).setSlave(this.synth)
            this.keyboard = Keyboard(Object.assign(this.synth, this.midiTrack))
            this.keyboard.init()
            setSariasSongMapping(this.synth.noteOn, this.synth.noteOff)
            this.$forceUpdate()
          })
        })
      },
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
      .setFadeValue(-0)
      .setImpulse(require('../../../../assets/media/Deep_Space.wav'))
      .subscribe(() => {
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
