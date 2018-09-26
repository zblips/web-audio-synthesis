<style lang="scss" type="text/scss" scoped>
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

  .toggle {
    /*&.corner {*/
      /*top: 10px;*/
      /*right: 10px;*/
    /*}*/
    button {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 2px solid #9C8AA5;
      outline: none;
      display: block;
      margin: 10px auto;
      &.inactive {
        background-color: #995574;
      }
      &.active {
        background-color: #ff5574;
        box-shadow: 0 0 5px 0 #ff5574;
      }
    }

    .label {
      font-size: 9px;
      text-align: center;
      display: block;
      margin: 0 auto;
      color: white;
      font-family: "Lucida Console", Monaco, monospace;
    }
  }
</style>

<template>
  <div class="toggle">
    <button class="toggle-button" :class="{ active, inactive: !active }" @click="toggle()"></button>
    <span class="label" v-if="label">{{label}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
      },
      isActive: {
        type: Boolean,
      },
    },
    data() {
      return {
        active: this.isActive,
      }
    },
    methods: {
      toggle() {
        this.active = !this.active
        this.$emit('update', this.active)
      },
    },
  }
</script>
