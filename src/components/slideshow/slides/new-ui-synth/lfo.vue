<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/ui';

  .card.lfo {
    width: 40vw;
    margin: $margin-int $margin-ext $margin-ext $margin-int;
    display: flex;
    flex-direction: column;

    & > div {
      margin: auto;
      height: 100%;
      box-sizing: border-box;
    }

    .knobs {
      width: 60%;
      margin-bottom: 20px;
    }

    .toggle {
      margin-top: 30px;
      width: 60%;
    }

    .label {
      font-size: 26px;
      text-align: center;
    }
  }
</style>

<template>
  <div class="card lfo">
    <div class="knobs">
      <knob label="amount" :value="state.amplitude" :width="180" @update="setAmount"></knob>
      <knob label="rate" :value="state.frequency" :width="130" @update="setRate"></knob>
    </div>
    <div class="toggle">
      <ui-select :value="state.destination" :values="state.destinations" @update="nextDestination"  :width="200"></ui-select>
    </div>
  </div>

</template>

<script>
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'
  import Selector from './selector.vue'
  import UiSelect from './ui-select'

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
    data() {
      return {
        destination: this.state.destination,
      }
    },
    methods: {
      setAmount(value) {
        this.state.amplitude = value
      },
      setRate(value) {
        this.state.frequency = value
      },
      nextDestination(value) {
        this.state.setActiveParameter(value)
      },
    },
  }
</script>
