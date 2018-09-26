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
      <span class="title">Reverb</span>

      <knob class="amount-knob" label="amount" :value="state.reverb.fadeValue" @update="setReverbWetMix"></knob>

      <ui-select :value="impulse" :values="state.reverb.impulses" @update="nextReverbImpulse" :width="200">
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
        impulse: this.state.reverb.impulses[0],
        active: true,
      }
    },
    methods: {
      setReverbWetMix(value) {
        this.state.reverb.setFadeValue(value)
      },
      nextReverbImpulse(value) {
        this.state.reverb.impulse = value
      },
    },
  }
</script>
