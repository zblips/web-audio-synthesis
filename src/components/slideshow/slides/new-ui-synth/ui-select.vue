<template>
  <span class="label">
    <!--<span @click="previousValue">◀</span>-->

    <span class="screen" :style="style" @click="nextValue">
      <span>{{ activeValue }}</span>
    </span>

    <!--<span @click="nextValue">▶</span>-->
  </span>
</template>

<script>
  export default {
    props: {
      values: {
        type: Array,
        default: () => [],
      },
      value: {
        type: String,
        default: '',
      },
      width: {
        type: Number,
        default: 120,
      },
    },
    data() {
      return {
        activeValue: this.value,
      }
    },
    computed: {
      style() {
        return { width: `${this.width}px` }
      },
    },
    methods: {
      nextValue() {
        const nextValueIndex = (this.values.indexOf(this.activeValue) + 1) % this.values.length
        this.activeValue = this.values[nextValueIndex]
        this.$emit('update', this.activeValue)
      },
      previousValue() {
        let prevValueIndex = (this.values.indexOf(this.activeValue) - 1)
        if (prevValueIndex < 0) {
           prevValueIndex = this.values.length - 1
        }
        this.activeValue = this.values[prevValueIndex]
        this.$emit('update', this.activeValue)
      },
    },
  }
</script>

<style scoped lang="scss">
  .label {
    position: relative;
    font-family: 'Arial';
    font-size: 70%;
    text-align: center;
    cursor: pointer;
    user-select: none;
    color: #2c3e50;

    .screen {
      background-color: #2c3e50;
      border: 2px double gray;
      border-radius: 5px;
      padding: 2px;
      color: #8feb9c;
      width: 120px;
      display: inline-block;
    }
  }
</style>
