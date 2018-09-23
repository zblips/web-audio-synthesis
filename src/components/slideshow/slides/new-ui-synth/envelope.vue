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
      border-radius: $column-border-radius;
      box-sizing: border-box;
      height: 100%;
      padding-top: $internal-card-padding*2.5;

      .toggle-button {
        top: 10px;
      }

      .sliders {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 15px;

        .slider {
          margin: 0 10px 0 10px;
        }
      }

      .accent-knob {
        position: relative;
        height: 40%;
        bottom: 14%;
      }
    }

  }

</style>

<template>
  <div class="card envelope">
    <div class="column">
      <span class="title">{{type}}</span>
      <button class="toggle-button" :class="{ active, inactive: !active }" @click="toggleEnv()">
      </button>

      <div class="sliders">
        <slider :height="200" label="A" :value="state.attack" @update="setAttackTime"></slider>
        <slider :height="200" label="D" :value="state.decay" @update="setDecayTime"></slider>
        <slider :height="200" label="S" :value="state.sustain" @update="setSustainValue"></slider>
        <slider v-if="type === 'ADSR'" :height="200" label="R" :value="state.release" @update="setReleaseTime"></slider>
      </div>

      <knob class="accent-knob red" v-if="type === 'Accent'" label="accent" :value="state.accent"
            @update="setAccentValue">
      </knob>
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
        default: 'Accent',
      },
    },
    components: {
      Slider,
      Knob,
    },
    data() {
      return {
        active: false,
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
      toggleEnv() {
        this.active = !this.active
        this.state.toggleActive()
      },
    },
  }
</script>
