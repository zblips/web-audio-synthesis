<template>
  <div class="app-bar">
    <span class="brand">Web Audio Synthesis</span>
    <ui-select :values="state.midiTrack.tracks" :value="state.midiTrack.track" @update="changeTrack"></ui-select>
    <div class="switch"><ui-switch @update="togglePolyphonyValue" :on="state.synth.voiceManager.isPolyphonic"></ui-switch></div>
  </div>
</template>

<script>
  import { Dispatcher } from 'wasa'
  import UiSelect from './ui-select.vue'
  import UiSwitch from './ui-switch.vue'

  const dispatcher = Dispatcher.openSession()

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
    methods: {
      changeTrack(value) {
        dispatcher.dispatch('MIDI_TRACK_CHANGED', value)
      },
      togglePolyphonyValue() {
        this.state.synth.voiceManager.togglePolyphonyValue()
      },
    },
  }
</script>

<style scoped lang="scss">
  .app-bar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 8vh;
    background-color: #fdfdfd;
    text-align: left;
    /*padding: 8px;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    .brand {
      display: inline-block;
    }
    .switch {
      width: 100px;
      height: 50px;
    }
  }
</style>
