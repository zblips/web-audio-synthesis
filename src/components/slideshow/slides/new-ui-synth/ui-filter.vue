<style lang="scss" scoped>
  @import '../../../../assets/styles/synth-card';

  .card.filters {
    width: 25vw;
    margin: $margin-ext $margin-int $margin-int;
    display: flex;
    flex-direction: column;
    & > div {
      margin: auto;
      height: 100%;
      box-sizing: border-box;
    }

    .knobs {
      width: 60%;
    }

    .toggle {
      margin-top: 40px;
      width: 40%;
    }
  }
</style>

<template>
  <div class="card filters">
    <div class="knobs">
      <knob class="filter-frequency" label="frequency" :value="state.frequencyValue" :width="180" @update="setFrequencyValue"></knob>
      <knob label="peak" :value="state.peakValue" :width="130" @update="setPeakValue"></knob>
      <knob label="dry/wet" :value="state.fadeValue" :width="100" @update="setFadeValue"></knob>
    </div>
    <div class="toggle">
      <ui-select :value="state.type" :values="state.types" @update="setType" :width="120"></ui-select>
    </div>
  </div>
</template>

<script>
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'
  import Selector from './selector.vue'
  import UiSelect from './ui-select.vue'

  export default {
    components: {
      Knob,
      Toggle,
      Selector,
      UiSelect,
    },
    props: {
      state: {
        type: Object,
        default: () => Object.create(null),
      },
    },
    methods: {
      setType(value) {
        this.state.type = value
      },
      setFrequencyValue(value) {
        this.state.frequencyValue = value
      },
      setPeakValue(value) {
        this.state.peakValue = value
      },
      setFadeValue(value) {
        this.state.fadeValue = value
      },
    },
  }
</script>
