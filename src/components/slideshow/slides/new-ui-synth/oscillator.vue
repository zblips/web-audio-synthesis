<style lang="scss" scoped>
  @import '../../../../assets/styles/synth-card';

  .card {
    /*width: 35vw;*/
    margin: $margin-ext $margin-int $margin-int $margin-ext;
    display: flex;
    .slice {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 40vh;
      min-height: 400px;
      background-color: #A3B8C8;
      border-radius: 15px;
      box-sizing: border-box;
      margin: 10px;
      .knobs {
        height: 20%;
      }
      .osc-title {
        font-size: $input-label-size;
        position: absolute;
        left: 18px;
        top: 15px;
      }
    }

  }

</style>

<template>
  <div class="card">
    <div class="slice">
      <span class="osc-title">Osc1</span>
      <knob class="osc-1" label="square" :value="state.osc1GainValue" :width="180" @update="setOsc1GainValue"></knob>
      <knob label="detune" :value="1" :width="130" @update="setOsc1DetuneValue"></knob>
      <octave-selector @update="shiftOsc1"></octave-selector>
    </div>

    <div class="slice">
      <span class="osc-title">Osc2</span>
      <knob class="osc-2 disabled" label="sawtooth" :value="state.osc2GainValue" :width="180"
            @update="setOsc2GainValue"></knob>
      <knob label="detune" :value="1" :width="130" @update="setOsc2DetuneValue"></knob>
      <octave-selector @update="shiftOsc2"></octave-selector>
    </div>

    <div class="slice global-params">
      <span class="osc-title">fm</span>
      <div class="knobs">
        <knob class="fm-amount" label="amount" :value="state.fmGainValue" :width="180" @update="setFmGainValue"></knob>
        <knob class="fm-ratio" label="ratio" :value="state.fmRatioValue" :width="130" @update="setFmRatioValue"></knob>
      </div>
    </div>
    <ui-switch @update="togglePolyphonyValue" :on="state.isPolyphonic"></ui-switch>
  </div>
</template>

<script>
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'
  import UiSwitch from './switch.vue'
  import OctaveSelector from './octave-selector.vue'

  export default {
    components: {
      Knob,
      Toggle,
      UiSwitch,
      OctaveSelector,
    },
    props: {
      state: {
        type: Object,
        default: () => Object.create(null),
      },
    },
    methods: {
      setOsc1GainValue(value) {
        this.state.osc1GainValue = value
      },
      setOsc2GainValue(value) {
        this.state.osc2GainValue = value
      },
      setOsc1DetuneValue(value) {
        this.state.osc1DetuneValue = value
      },
      setOsc2DetuneValue(value) {
        this.state.osc2DetuneValue = value
      },
      setFmGainValue(value) {
        this.state.fmGainValue = value
      },
      setFmRatioValue(value) {
        this.state.fmRatioValue = value
      },
      shiftOsc1(value) {
        this.state.osc1Shift = value
      },
      shiftOsc2(value) {
        this.state.osc2Shift = value
      },
      togglePolyphonyValue(value) {
        this.state.togglePolyphonyValue(value)
      },
    },
  }
</script>
