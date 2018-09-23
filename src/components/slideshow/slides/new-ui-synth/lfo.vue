<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

  .card.lfo {
    width: 15vw;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: $margin-ext $margin-ext $margin-int $margin-int;
    padding: $internal-card-padding;

    .column {
      background-color: $column-block-background;
      border-radius: $column-border-radius;
      box-sizing: border-box;
      height: 100%;

      .amount-knob, .rate-knob {
        position: relative;
        top: -6%;
      }

      .amount-knob {
        height: 45%;
      }

      .rate-knob {
        height: 30%;
      }
    }
  }
</style>

<template>
  <div class="card lfo">
    <div class="column">
      <span class="title">LFO</span>
      <button class="toggle-button" :class="{ active, inactive: !active }" @click="toggleLFO()">
      </button>

      <knob class="amount-knob" label="amount" :value="state.amplitude" @update="setAmount"></knob>

      <knob class="rate-knob" label="rate" :value="state.frequency" @update="setRate"></knob>

      <ui-select :value="state.destination" :values="state.destinations" @update="nextDestination" :width="200">
      </ui-select>
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
        active: false,
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
      toggleLFO() {
        console.warn('THIS HAS NOT BEEN CODED !!!')

        this.active = !this.active
      },
    },
  }
</script>
