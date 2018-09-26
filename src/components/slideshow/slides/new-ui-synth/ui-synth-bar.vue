<template>
  <div class="app-bar">
    <span class="polyphony-container">
      <span class="switch-label">Mono/Poly</span>
      <ui-switch class="switch" @update="togglePolyphonyValue" :on="state.synth.voiceManager.isPolyphonic"></ui-switch>
    </span>

    <span class="brand">Web Audio Synthesis</span>

    <span class="track-selector">
      <button @click="togglePlay()" :class="{stop:isPlaying, start: !isPlaying}">️️</button>
      <ui-select @update="changeTrack"
                 :values="state.midiTrack.tracks" :value="state.midiTrack.track" :width="200">
      </ui-select>
    </span>
  </div>
</template>

<script>
  import UiSelect from './ui-select.vue'
  import UiSwitch from './ui-switch.vue'

  export default {
    components: {
      UiSelect,
      UiSwitch,
    },
    props: {
      state: {
        type: Object,
        default: () => Object.create(null),
      },
    },
    computed: {
      tracks() {
        return Object.values(this.state.midiTrack.tracks).map(name => ({ name }))
      },
    },
    data() {
      return {
        isPlaying: false,
      }
    },
    methods: {
      changeTrack(value) {
        this.state.midiTrack.changeTrack(value)
      },
      track() {
        return this.state.midiTrack.track
      },
      togglePolyphonyValue() {
        this.state.synth.voiceManager.togglePolyphonyValue()
      },
      togglePlay(value = !this.isPlaying) {
        this.isPlaying = value
        if (this.isPlaying) {
          return this.state.midiTrack.start()
        }
        this.state.synth.stop()
      },
    },
  }
</script>

<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';
  @import '../../../../assets/styles/buttons';

  .app-bar {
    position: relative;
    width: 100vw;
    height: 6vh;
    background-color: #fdfdfd;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 0.6em;

    .polyphony-container, .track-selector {
      width: 25vw;
    }

    .brand {
      color: #2c3e50;
      width: 50vw;
    }

    .polyphony-container {
      display: flex;
      align-items: center;
      justify-items: center;

      .switch {
        width: 100px;
        height: 50px;
      }

      .switch-label {
        padding-right: 8px;
        font-size: 0.7em;
      }
    }

    .track-selector {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .stop:after {
      content: "■";
      font-size: 30px;
    }

    .start:after {
      content: "▶";
      font-size: 25px;

    }

  }
</style>
