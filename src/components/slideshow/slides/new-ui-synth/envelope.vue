<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';

  .card.envelope {
    width: 25vw;
    margin: $margin-ext $margin-int $margin-int;

    .sliders {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 15px;
      .slider {
        margin: 0 10px 0 10px;
      }
    }

  }

</style>

<template>
  <div class="card envelope">
    <div class="sliders">
      <slider :height="250" label="A" :value="state.attack" @update="setAttackTime"></slider>
      <slider :height="250" label="D" :value="state.decay" @update="setDecayTime"></slider>
      <slider :height="250" label="S" :value="state.sustain" @update="setSustainValue"></slider>
      <slider v-if="type === 'adsr'" :height="250" label="R" :value="state.release" @update="setReleaseTime"></slider>
    </div>
    <div class="knobs" v-if="type === 'accent'">
      <knob label="accent" :value="state.accent" :width="180" @update="setAccentValue"></knob>
    </div>
  </div>
</template>

<script>
  import Slider from './slider.vue'
  import Knob from './knob.vue'

  export default {
    props: {
      state: {
        type: Object,
        default: () => Object.create(null),
      },
      type: {
        type: String,
        default: 'accent',
      },
    },
    components: {
      Slider,
      Knob,
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
    },
  }
</script>
