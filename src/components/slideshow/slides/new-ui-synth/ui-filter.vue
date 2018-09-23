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
      border-radius: $column-border-radius;
      box-sizing: border-box;
      height: 100%;

      .frequency-knob, .peak-knob, .dry-wet-knob {
        position: relative;
        top: -6%;
      }

      .frequency-knob {
        height: 35%;
      }

      .peak-knob {
        height: 25%;
      }

      .dry-wet-knob {
        height: 25%;
      }
    }

  }
</style>

<template>
  <div class="card filters">
    <div class="column">
      <span class="title">Filter</span>
      <button class="toggle-button" :class="{ active, inactive: !active }" @click="toggleFilter()">
      </button>

      <knob class="frequency-knob" label="frequency" :value="state.frequencyValue" @update="setFrequencyValue">
      </knob>

      <knob class="peak-knob" label="peak" :value="state.peakValue" @update="setPeakValue">
      </knob>

      <knob class="dry-wet-knob" label="dry-wet" :value="state.fadeValue" @update="setFadeValue">
      </knob>

      <ui-select class="type-selector" :value="state.type" :values="state.types" @update="setType" :width="120">
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
      toggleFilter() {
        console.warn('THIS HAS NOT BEEN CODED !!!')

        this.active = !this.active
      },
    },
  }
</script>
