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
      color: $column-block-text-color;
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
      <div class="header">
        <span class="title">LFO</span>
        <toggle class="toggle" :is-active="active" @update="toggleActive"></toggle>
      </div>

      <knob class="amount-knob green" label="amount" :value="state.amplitude" @update="setAmount"></knob>

      <knob class="rate-knob green" label="rate" :value="state.frequency" @update="setRate"></knob>

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
        active: this.state.isActive,
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
        this.active = !(value === 'off')
        this.state.setActiveParameter(value)
      },
      toggleActive() {
        if (this.active) {
          this.value = 'off'
        } else {
          this.value = 'all freq.'
        }

        this.nextDestination(this.value)
      },
    },
  }
</script>
