<template>
  <div class="app-bar">
    <span class="polyphony-container">
      <span class="switch-label">Polyphonic</span>
      <ui-switch class="switch" @update="togglePolyphonyValue" :on="state.synth.voiceManager.isPolyphonic"></ui-switch>
    </span>

    <span class="brand">Web Audio Synthesis</span>

    <span class="track-selector">
      <ui-select @update="changeTrack"
                 :values="state.midiTrack.tracks" :value="state.midiTrack.track">
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
    mounted() {

    },
    computed: {
      tracks() {
        return Object.values(this.state.midiTrack.tracks).map(name => ({ name }))
      },
      selectedTrack() {
        return this.state.midiTrack.track
      },
    },
    methods: {
      changeTrack(value) {
        this.state.midiTrack.changeTrack(value)
      },
      togglePolyphonyValue() {
        this.state.synth.voiceManager.togglePolyphonyValue()
      },
    },
  }
</script>

<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

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

  }
</style>
