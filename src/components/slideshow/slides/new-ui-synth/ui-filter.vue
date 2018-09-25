<style lang="scss" scoped>
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

  .card.filters {
    width: 15vw;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: $margin-ext $margin-int $margin-int;
    padding: $internal-card-padding;

    .column {
      background-color: $column-block-background;
      color: $column-block-text-color;
      border-radius: $column-border-radius;
      box-sizing: border-box;
      height: 100%;

      .frequency-knob, .peak-knob, .type-selector {
        position: relative;

      }

      .frequency-knob {
        height: 35%;
      }

      .peak-knob {
        height: 25%;
      }

      .type-selector {
        top: 40px;
      }
    }

  }
</style>

<template>
  <div class="card filters">
    <div class="column">
      <div class="header">
        <span class="title">Filter</span>
        <toggle class="toggle" is-active="state.isActive" @update="toggleActive"></toggle>
      </div>

      <knob class="frequency-knob grey" label="frequency" :value="state.frequencyValue" @update="setFrequencyValue">
      </knob>

      <knob class="peak-knob grey" label="peak" :value="state.peakValue" @update="setPeakValue">
      </knob>

      <ui-select class="type-selector" :value="state.type" :values="state.types" @update="setType" :width="150">
      </ui-select>
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
    data() {
      return {
        active: false,
      }
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
      toggleActive() {
        if (this.active) {
          this.setFadeValue(-1)
        } else {
          this.setFadeValue(1)
        }

        this.active = !this.active
      },
    },
  }
</script>
