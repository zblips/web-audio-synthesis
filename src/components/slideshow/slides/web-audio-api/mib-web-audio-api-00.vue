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

        .source-link {
          display: block;
          text-align: right;
          font-size: 0.6em;
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
          <a class="source-link" href="https://www.davrous.com/2015/11/05/creating-fun-immersive-audio-experiences-with-web-audio/">
            Source
          </a>
        </div>
      </eg-transition>

      <eg-transition enter="fadeInRight" leave="fadeOutLeft">
        <div class="image-container" v-if="step === 2">
          <img src="./assets/angry-birds.png"/>
          <a class="source-link" href="https://9to5mac.com/2011/05/11/angry-birds-hits-chrome-web-store-yes-its-free/">
            Source
          </a>
        </div>
      </eg-transition>

      <eg-transition enter="fadeInRight" leave="fadeOutLeft">
        <div class="image-container" v-if="step === 3">
          <img src="./assets/hangouts.png"/>
          <a class="source-link" href="https://globaldatinginsights.com/2015/08/18/180815-google-releases-website-for-hangouts/">
            Source
          </a>
        </div>
      </eg-transition>

      <eg-transition enter="fadeInRight" leave="fadeOutLeft">
        <div class="image-container" v-if="step === 4">
          <img class="synth-img" src="./assets/synth.jpg"/>
          <a class="source-link" href="https://fr.wikipedia.org/wiki/Yamaha_DX7">
            Source
          </a>
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
