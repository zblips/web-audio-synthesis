<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

  .selector {
    height: 100%;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .toggle {
      width: 100%;
      height: 30%;

      button {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #D3DEE7;
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
        font-size: $input-label-size;
        color: $text-input-label;
        text-align: center;
        display: block;
        margin: 0 auto;
        font-family: "Lucida Console", Monaco, monospace;
      }
    }
  }

</style>

<template>
  <div class="selector">
    <div class="toggle" v-for="value in values" :key="value">
      <div class="button">
        <button :class="{ active: isActive(value), inactive: !isActive(value) }" @click="select(value)"></button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      values: {
        type: Array,
        default: () => [1, 0, -1],
      },
    },
    data: () => ({
      activeValue: 0,
    }),
    methods: {
      select(value) {
        this.activeValue = value
        this.$emit('update', value)
      },
      isActive(value) {
        return this.activeValue === value
      },
    },
  }
</script>
