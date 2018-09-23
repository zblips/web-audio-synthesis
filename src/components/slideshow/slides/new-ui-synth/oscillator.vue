<style lang="scss" scoped>
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

  .card {
    /*width: 35vw;*/
    margin: $margin-ext $margin-int $margin-int $margin-ext;
    display: flex;

    .label {
      position: relative;
      bottom: 24px;
      font-family: 'Arial';
      font-size: 26px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      color: #2c3e50;
      .screen {
        background-color: #2c3e50;
        border: 2px double gray;
        border-radius: 5px;
        padding: 2px;
        color: #fdfdfd;
        width: 120px;
        display: inline-block;
      }
    }

    .column {
      height: 43vh;
      min-height: 400px;
      .row {
        background-color: #A3B8C8;
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        box-sizing: border-box;
        margin: 10px;
        .title {
          font-size: $input-label-size;
          position: absolute;
          left: 18px;
          top: 15px;
        }
        &.osc {
          height: 100%;
          .knobs {
            height: 20%;
          }
        }
        &.fm {
          height: 23vh;
          min-height: 370px;
        }
        &.poly {
          min-height: 150px;
          height: 13vh;
        }
      }
    }
  }

</style>

<template>
  <div class="card">
    <div class="column">
      <div class="row osc">
        <span class="title">Osc1</span>
        <toggle></toggle>
        <knob class="osc-1" :value="state.osc1GainValue" :width="180" @update="setOsc1GainValue"></knob>
        <ui-select :values="state.types" :value="state.osc1Type" @update="nextOsc1TypeValue" :width="120"></ui-select>
        <knob label="detune" :value="state.osc1DetuneValue" :width="130" @update="setOsc1DetuneValue"></knob>
        <ui-select :values="['-1', '0', '+1']" value="0" @update="shiftOsc1" :width="40"></ui-select>
      </div>
    </div>

    <div class="column">
      <div class="row osc">
        <span class="title">Osc2</span>
        <toggle></toggle>
        <knob class="osc-2 disabled" :value="state.osc2GainValue" :width="180"
              @update="setOsc2GainValue"></knob>
        <ui-select :values="state.types" :value="state.osc2Type" @update="nextOsc2TypeValue" :width="120"></ui-select>
        <knob label="detune" :value="state.osc2DetuneValue" :width="130" @update="setOsc2DetuneValue"></knob>
        <ui-select :values="['-1', '0', '+1']" value="0" @update="shiftOsc2" :width="40"></ui-select>
      </div>
    </div>

    <div class="column">
      <div class="row fm">
        <span class="title">fm</span>
        <toggle></toggle>
        <div class="knobs">
          <knob class="fm-amount" label="amount" :value="state.fmGainValue" :width="180"
                @update="setFmGainValue"></knob>
          <knob class="fm-ratio" label="ratio" :value="state.fmRatioValue" :width="130"
                @update="setFmRatioValue"></knob>
        </div>
      </div>
      <!--<div class="row poly">-->
        <!--<span class="title">poly</span>-->
        <!--<ui-switch @update="togglePolyphonyValue" :on="state.isPolyphonic"></ui-switch>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'
  import UiSwitch from './switch.vue'
  import OctaveSelector from './octave-selector.vue'
  import UiSelect from './ui-select.vue'
  // import { WaveForms } from 'wasa'

  // const waveForms = Object.values(WaveForms)

  export default {
    components: {
      Knob,
      Toggle,
      UiSwitch,
      OctaveSelector,
      UiSelect,
    },
    props: {
      state: {
        type: Object,
        default: () => Object.create(null),
      },
    },
    data() {
      return {
        osc1Type: this.state.osc1Type,
        osc2Type: this.state.osc2Type,
      }
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
        this.state.osc1Shift = Number(value)
      },
      shiftOsc2(value) {
        this.state.osc2Shift = Number(value)
      },
      togglePolyphonyValue(value) {
        this.state.togglePolyphonyValue(value)
      },
      nextOsc1TypeValue(value) {
        this.state.osc1Type = value
      },
      nextOsc2TypeValue(value) {
        this.state.osc2Type = value
      },
    },
  }
</script>
