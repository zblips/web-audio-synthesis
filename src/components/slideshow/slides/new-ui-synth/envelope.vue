<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

  .card.envelope {
    width: 18vw;
    position: relative;
    margin: $margin-ext $margin-int $margin-int;
    padding: $internal-card-padding;

    .column {
      background-color: $column-block-background;
      color: $column-block-text-color;
      border-radius: $column-border-radius;
      box-sizing: border-box;
      height: 100%;
      padding-top: $internal-card-padding*2.5;

      .sliders {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 24px;

        .slider {
          margin: 0 10px 0 10px;
        }
      }

      .accent-knob {
        height: 33%;
      }
    }

  }

</style>

<template>
  <div class="card envelope">
    <div class="header">
      <span class="title">{{type}}</span>
      <toggle class="toggle" :is-active="state.isActive" @update="toggleActive"></toggle>
    </div>

    <div class="column">

      <div class="sliders">
        <slider class="red" :height="200" label="A" :value="state.attack" @update="setAttackTime"></slider>
        <slider class="blue" :height="200" label="D" :value="state.decay" @update="setDecayTime"></slider>
        <slider class="green" :height="200" label="S" :value="state.sustain" @update="setSustainValue"></slider>
        <slider class="cyan" v-if="type === 'ADSR'" :height="200" label="R" :value="state.release" @update="setReleaseTime"></slider>
      </div>

      <knob class="accent-knob black" v-if="type === 'Accent'" label="accent" :value="state.accent"
            @update="setAccentValue">
      </knob>
    </div>
  </div>
</template>

<script>
  import Slider from './slider.vue'
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'

  export default {
    props: {
      state: {
        type: Object,
        default: () => Object.create(null),
      },
      type: {
        type: String,
        default: 'Accent',
      },
    },
    components: {
      Toggle,
      Slider,
      Knob,
    },
    data() {
      return {
        active: this.state.isActive,
      }
    },
    methods: {
      setAttackTime(value) {
        this.state.attack = value
      },
      setDecayTime(value) {
        this.state.decay = value
      },
      setSustainValue(value) {
        this.state.sustain = value
      },
      setAccentValue(value) {
        this.state.accent = value
      },
      setReleaseTime(value) {
        this.state.release = value
      },
      toggleActive(value) {
        this.state.toggleActive(value)
      },
    },
  }
</script>
