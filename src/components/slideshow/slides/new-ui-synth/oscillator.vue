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
      <knob class="osc-1" label="square" :value="osc1Gain.value" :width="180" @update="setOsc1GainValue"></knob>
      <knob label="detune" :value="1" :width="130"></knob>
    </div>

    <div class="knobs">
      <span class="osc-title">Osc2</span>
      <knob class="osc-2 disabled" label="sawtooth" :value="osc2Gain.value" :width="180"
            @update="setOsc2GainValue"></knob>
      <knob label="detune" :value="1" :width="130"></knob>
    </div>

    <div class="knobs global-params">
      <knob class="fm-amount" label="fm amount" :value="fmAmount.value" :width="100" @update="setFmAmount"></knob>
      <knob class="fm-ratio" label="fm ratio" :value="fmRatio.value" :width="100" @update="setFmRatio"></knob>
      <toggle @update="togglePolyphony" :is-active="polyphony.value"></toggle>
    </div>
  </div>
</template>

<script>
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'
  import { Dispatcher } from 'wasa'

  const dispatcher = Dispatcher.openSession()

  const polyphony = { value: false }
  const osc1Gain = { value: 1 }
  const osc2Gain = { value: 1 }
  const fmRatio = { value: 1 }
  const fmAmount = { value: 0 }

  dispatcher.as('POLYPHONY_TOGGLED')
  .subscribe((value) => {
    polyphony.value = value
  })

  dispatcher.as('OSC1_GAIN_CHANGED')
  .subscribe((value) => {
    osc1Gain.value = value
  })

  dispatcher.as('OSC2_GAIN_CHANGED')
  .subscribe((value) => {
    osc2Gain.value = value
  })

  dispatcher.as('FM_RATIO_CHANGED')
  .subscribe((value) => {
    fmRatio.value = value
  })

  dispatcher.as('FM_AMOUNT_CHANGED')
  .subscribe((value) => {
    fmAmount.value = value
  })

  export default {
    components: {
      Knob,
      Toggle,
    },
    data() {
      return {
        polyphony,
        osc1Gain,
        osc2Gain,
        fmAmount,
        fmRatio,
      }
    },
    methods: {
      setOsc1GainValue(value) {
        dispatcher.dispatch('OSC1_GAIN_CHANGED', value)
      },
      setOsc2GainValue(value) {
        dispatcher.dispatch('OSC2_GAIN_CHANGED', value)
      },
      setFmAmount(value) {
        dispatcher.dispatch('FM_AMOUNT_CHANGED', value)
      },
      setFmRatio(value) {
        dispatcher.dispatch('FM_RATIO_CHANGED', value)
      },
      togglePolyphony(value) {
        dispatcher.dispatch('POLYPHONY_TOGGLED', value)
      },
    },
  }
</script>
