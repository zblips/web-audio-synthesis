<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

  .slide {
    .slide-content {
      width: 70vw;
      display: flex;
      margin-top: 1em;

      .image-container {
        position: absolute;
        width: 70vw;
        box-sizing: border-box;

        img {
          height: 100%;
          max-height: 70vh;

          &.synth-img {
            margin-top: 2em;
          }
        }
      }
    }
  }

</style>

<template>
  <div class="slide">
    <h2>Web Audio API</h2>

    <div class="slide-content">
      <eg-transition enter="fadeInRight" leave="fadeOutLeft">
        <div class="image-container" v-if="step === 1">
          <img src="./assets/waa-history.png"/>
        </div>
      </eg-transition>

      <eg-transition enter="fadeInRight" leave="fadeOutLeft">
        <div class="image-container" v-if="step === 2">
          <img src="./assets/angry-birds.png"/>
        </div>
      </eg-transition>

      <eg-transition enter="fadeInRight" leave="fadeOutLeft">
        <div class="image-container" v-if="step === 3">
          <img src="./assets/hangouts.png"/>
        </div>
      </eg-transition>

      <eg-transition enter="fadeInRight" leave="fadeOutLeft">
        <div class="image-container" v-if="step === 4">
          <img class="synth-img" src="./assets/synth.jpg"/>
        </div>
      </eg-transition>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      step: {
        type: Number,
        default: 1,
      },
    },
  }
</script>
