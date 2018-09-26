<style lang="scss" scoped>
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

  .card {
    width: 34vw;
    margin: $margin-ext $margin-int $margin-int $margin-ext;
    display: flex;

    .column {
      height: 100%;
      width: 33%;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: $internal-card-padding;

      .osc, .fm {
        box-sizing: border-box;
        background-color: $column-block-background;
        color: $column-block-text-color;
        border-radius: $column-border-radius;
      }

      .osc1-gain, .osc2-gain, .fm-amount {
        height: 35%;
      }

      .osc1-detune, .osc2-detune, .fm-ratio {
        height: 25%;
      }

      .fm, .osc {
        height: 100%;
        padding-top: 10%;
      }

      .osc {

        .wave-selector {
          top: -16px;
        }

        .octave-selector {
          top: 24px;
        }
      }

      .fm {

        .fm-ratio {
          margin-top: 16px;
        }
      }
    }

    &.card-osc2-disabled {

      .osc2-container {
        opacity: $opacity-card-disabled;

        &::before {
          content: ' ';
          position: absolute;
          opacity: 0;
          height: 100%;
          width: 100%;
          z-index: 1000;
        }
      }
    }

    &.card-fm-disabled {

      .fm-container {
        opacity: $opacity-card-disabled;

        &::before {
          content: ' ';
          position: absolute;
          opacity: $opacity-overlay-disabled;
          height: 100%;
          width: 100%;
          z-index: 1000;
        }
      }
    }
  }

</style>

<template>
  <div class="card">
    <div class="column osc1-container">
      <div class="osc">
        <div class="header">
          <span class="title">Osc1</span>
          <toggle class="toggle" :is-active="isOsc1Active" @update="toggleOsc1"></toggle>
        </div>

        <knob class="osc1-gain yellow" :value="state.osc1GainValue" @update="setOsc1GainValue"></knob>

        <ui-select class="wave-selector" :values="state.types" :value="state.osc1Type" @update="nextOsc1TypeValue"
                   :width="125">
        </ui-select>

        <knob class="osc1-detune yellow" label="detune" :value="state.osc1DetuneValue" @update="setOsc1DetuneValue">
        </knob>

        <ui-select class="octave-selector" :values="['-1', '0', '+1']" value="0" @update="shiftOsc1" :width="40">
        </ui-select>
      </div>
    </div>

    <div class="column osc2-container">
      <div class="osc">
        <div class="header">
          <span class="title">Osc2</span>
          <toggle class="toggle" :is-active="isOsc2Active" @update="toggleOsc2"></toggle>
        </div>

        <knob class="osc2-gain red" :value="state.osc2GainValue" @update="setOsc2GainValue"></knob>

        <ui-select class="wave-selector" :values="state.types" :value="state.osc2Type" @update="nextOsc2TypeValue"
                   :width="125">
        </ui-select>

        <knob class="osc2-detune red" label="detune" :value="state.osc2DetuneValue" @update="setOsc2DetuneValue">
        </knob>

        <ui-select class="octave-selector" :values="['-1', '0', '+1']" value="0" @update="shiftOsc2" :width="40">
        </ui-select>
      </div>
    </div>

    <div class="column fm-container">
      <div class="fm">
        <div class="header">
          <span class="title">FM</span>
          <toggle class="toggle" :is-active="isFmActive" @update="toggleFm"></toggle>
        </div>

        <knob class="fm-amount violet" label="amount" :value="state.fmGainValue" @update="setFmGainValue"></knob>

        <knob class="fm-ratio violet" label="ratio" :value="state.fmRatioValue" @update="setFmRatioValue"></knob>
      </div>
    </div>
  </div>
</template>

<script>
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'
  import UiSelect from './ui-select.vue'

  export default {
    components: {
      Knob,
      Toggle,
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
        isOsc1Active: this.state.osc1GainValue > 0,
        isOsc2Active: this.state.osc2GainValue > 0,
        isFmActive: this.state.fmGainValue > 0,
        osc1GainState: this.state.osc1GainValue,
        osc2GainState: this.state.osc2GainValue,
        fmGainState: this.state.fmGainValue,
      }
    },
    methods: {
      setOsc1GainValue(value) {
        this.osc1GainState = value
        if (this.isOsc1Active) {
          this.state.osc1GainValue = value
        }
      },
      setOsc2GainValue(value) {
        this.osc2GainState = value
        if (this.isOsc2Active) {
          this.state.osc2GainValue = value
        }
      },
      setOsc1DetuneValue(value) {
        this.state.osc1DetuneValue = value
      },
      setOsc2DetuneValue(value) {
        this.state.osc2DetuneValue = value
      },
      setFmGainValue(value) {
        this.fmGainState = value
        if (this.isFmActive) {
          this.state.fmGainValue = value
        }
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
      toggleOsc1(value) {
        this.isOsc1Active = value
        if (this.isOsc1Active) {
          this.state.osc1GainValue = this.osc1GainState
        } else {
          this.osc1GainState = this.state.osc1GainValue
          this.state.osc1GainValue = 0
        }
      },
      toggleOsc2(value) {
        this.isOsc2Active = value
        if (this.isOsc2Active) {
          this.state.osc2GainValue = this.osc2GainState
        } else {
          this.osc2GainState = this.state.osc2GainValue
          this.state.osc2GainValue = 0
        }
      },
      toggleFm(value) {
        this.isFmActive = value
        if (this.isFmActive) {
          this.state.fmGainValue = this.fmGainState
        } else {
          this.fmGainState = this.state.fmGainValue
          this.state.fmGainValue = 0
        }
      },
    },
  }
</script>
