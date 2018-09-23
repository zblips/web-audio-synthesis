<template>
  <div>
    <svg viewBox="0 0 58 58" version="1.1" style="width:100px" @click="toggle">
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icons">
          <g id="324---ON-OFF-Switch-(Flat)">
            <path
              d="M13,58 L45,58 C52.15,58 58,52.15 58,45 C58,37.85 52.15,32 45,32 L13,32 C5.85,32 0,37.85 0,45 C0,52.15 5.85,58 13,58"
              id="Fill-527" fill="#E8EDEE"></path>
            <path
              d="M4,45 C4,49.971 8.029,54 13,54 C17.971,54 22,49.971 22,45 C22,40.03 17.971,36 13,36 C8.029,36 4,40.03 4,45 L4,45 Z"
              id="Fill-530" :fill="fill" :transform="translate"></path>
            <path
              d="M4,45 C4,49.971 8.029,54 13,54 C17.971,54 22,49.971 22,45 C22,40.03 17.971,36 13,36 C8.029,36 4,40.03 4,45 L4,45 Z"
              id="Stroke-531" :stroke="stroke" stroke-width="2" stroke-linecap="round"
              :transform="translate"></path>
          </g>
        </g>
      </g>
    </svg>
  </div>
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
        return this.isOn ? 'translate(32, 0)' : 'translate(0, 0)'
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
