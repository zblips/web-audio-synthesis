<style lang="scss" scoped>
  @import '../../../../assets/styles/synth-card';

  .card {
    width: 50vw;
    margin: $margin-ext $margin-int $margin-int $margin-ext;
    display: flex;

    .knobs {
      position: relative;
      display: flex;
      flex-direction: column;
      &.global-params {
        height: 500px;
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
    <div class="knobs">
      <span class="osc-title">Osc1</span>
      <knob class="osc-1" label="square" :value="state.osc1GainValue" :width="180" @update="setOsc1GainValue"></knob>
      <knob label="detune" :value="1" :width="130" @update="setOsc1DetuneValue"></knob>
    </div>

    <div class="knobs">
      <span class="osc-title">Osc2</span>
      <knob class="osc-2 disabled" label="sawtooth" :value="state.osc2GainValue" :width="180" @update="setOsc2GainValue"></knob>
      <knob label="detune" :value="1" :width="130" @update="setOsc2DetuneValue"></knob>
    </div>

    <div class="knobs global-params">
      <knob class="fm-amount" label="fm amount" :value="state.fmGainValue" :width="100" @update="setFmGainValue"></knob>
      <knob class="fm-ratio" label="fm ratio" :value="state.fmRatioValue" :width="100" @update="setFmRatioValue"></knob>
      <toggle @update="togglePolyphonyValue" :is-active="state.isPolyphonic"></toggle>
    </div>
  </div>
</template>

<script>
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'

  export default {
    components: {
      Knob,
      Toggle,
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
      togglePolyphonyValue(value) {
        this.state.togglePolyphonyValue(value)
      },
    },
  }
</script>
