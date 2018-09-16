<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';

  .card.envelope {
    width: 25vw;
    margin: $margin-int $margin-int $margin-ext $margin-int;
    display: flex;
    align-items: center;
    justify-content: center;

    .slider {
      margin: 0 10px 0 10px;
    }
  }

</style>

<template>
  <div class="card envelope">
    <slider :width="30" :height="160" label="A"></slider>
    <slider :width="30" :height="160" label="D"></slider>
    <slider :width="30" :height="160" label="S"></slider>
    <slider v-if="type === 'adsr'" :width="30" :height="160" label="R"></slider>
  </div>
</template>

<script>
  import Slider from './slider.vue'

  export default {
    props: {
      type: {
        type: String,
        default: 'accent',
      },
    },
    components: {
      Slider,
    },
  }
</script>
