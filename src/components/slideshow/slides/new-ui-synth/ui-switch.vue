<template>
  <svg viewBox="0 0 125 50" version="1.1" @click="toggle">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Icons">
        <g id="324---ON-OFF-Switch-(Flat)">
          <rect x="0" y="0" width="120" height="50" rx="25" ry="25" fill="#E8EDEE"></rect>
          <ellipse cx="25" cy="25" rx="20" ry="20" :fill="fill" :stroke="stroke" stroke-width="2" :transform="translate"></ellipse>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
  export default {
    props: {
      on: {
        type: Boolean,
        default: () => false,
      },
    },
    data() {
      return {
        isOn: this.on,
      }
    },
    computed: {
      translate() {
        return this.isOn ? 'translate(70, 0)' : 'translate(0, 0)'
      },
      fill() {
        return this.isOn ? '#88C057' : '#ED7161'
      },
      stroke() {
        return this.isOn ? '#659C35' : '#D75A4A'
      },
    },
    methods: {
      toggle() {
        this.isOn = !this.isOn
        this.$emit('update', this.isOn)
      },
    },
  }
</script>

<style scoped>

</style>
