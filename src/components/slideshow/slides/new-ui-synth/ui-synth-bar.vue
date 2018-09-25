<template>
  <div class="app-bar">
    <span class="brand">Web Audio Synthesis</span>

    <span class="track-label">Track :</span>
    <ui-select class="track-selector" @update="changeTrack"
               :values="state.midiTrack.tracks" :value="state.midiTrack.track" >
    </ui-select>

    <span class="switch-label" v-on:click="togglePolyphonyValue">Polyphonic</span>
    <ui-switch class="switch" @update="togglePolyphonyValue" :on="state.synth.voiceManager.isPolyphonic"></ui-switch>
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
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;

    .brand {
      display: inline-block;
      color: $knob-background-blue;
      padding-left: 0.5em;
      padding-right: 0.5em;
    }

    .switch-label {
      margin-left: 1em;
      margin-right: 0.5em;
    }

    .switch {
      width: 100px;
      height: 50px;
    }

    .track-label {
      margin-left: 1em;
    }

    .track-selector {
      margin: 0 0.5em;
    }
  }
</style>
