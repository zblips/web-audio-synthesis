<style lang="scss">
  @import '../../assets/styles/colors.scss';

  .eg-slideshow {
    font-family: "Lucida Console", Monaco, monospace;
    background-color: $bg-primary;
    overflow: hidden;
    height: 100%;
    width: 100%;

    .eg-slide {
      background-color: $bg-primary;

      .eg-slide-content {
        height: 100%;

        .slide {
          h1 {
            font-size: 2.5em;
            margin: 0.3em;
          }

          h2 {
            font-size: 2em;
            margin: 0.3em;
          }

          h3 {
            font-size: 1.3em;
          }

          ul {
            margin: auto;
            text-align: left;
            width: 40%;
          }

        }
      }
    }
  }
</style>

<template>
  <div class="eg-slideshow">
    <slide enter='fadeIn' leave='fadeOut'>
      <IntroDemo :options="{
                            isOsc2Disabled: false,
                            isFmDisabled: false,
                            isADSRDisabled: false,
                            isFilterDisabled: false,
                            isAccentDisabled: false,
                            isLFODisabled: false,
                            isReverbDisabled: false
                          }">
      </IntroDemo>
    </slide>

    <slide enter='fadeIn' leave='fadeOut'>
      <mib-title></mib-title>
    </slide>

    <!--WEB AUDIO API-->
    <slide enter='bounceInRight' leave='fadeOut' :steps="4">
      <mib-web-audio-api00 :step="step"></mib-web-audio-api00>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-web-audio-api01></mib-web-audio-api01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-web-audio-snippet></mib-web-audio-snippet>
    </slide>

    <!--MONOPHONIC-->
    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-monophonic-intro></mib-monophonic-intro>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-monophonic-graph></mib-monophonic-graph>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-monophonic-snippet></mib-monophonic-snippet>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-monophonic-demo :options="{
                                    isOsc2Disabled: true,
                                    isFmDisabled: true,
                                    isADSRDisabled: true,
                                    isFilterDisabled: true,
                                    isAccentDisabled: true,
                                    isLFODisabled: true,
                                    isReverbDisabled: true
                                  }">
      </mib-monophonic-demo>
    </slide>

    <!--POLYPHONIC-->
    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-polyphonic-intro></mib-polyphonic-intro>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-polyphonic-graph></mib-polyphonic-graph>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-polyphonic-snippet></mib-polyphonic-snippet>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-polyphonic-demo :options="{
                                    isOsc2Disabled: true,
                                    isFmDisabled: true,
                                    isADSRDisabled: true,
                                    isFilterDisabled: true,
                                    isAccentDisabled: true,
                                    isLFODisabled: true,
                                    isReverbDisabled: true
                                  }">
      </mib-polyphonic-demo>
    </slide>

    <!--ADDITIVE-->
    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-additive-intro></mib-additive-intro>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-additive-graph></mib-additive-graph>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-additive-snippet></mib-additive-snippet>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-additive-demo :options="{
                                    isOsc2Disabled: false,
                                    isFmDisabled: true,
                                    isADSRDisabled: true,
                                    isFilterDisabled: true,
                                    isAccentDisabled: true,
                                    isLFODisabled: true,
                                    isReverbDisabled: true
                                  }">
      </mib-additive-demo>
    </slide>

    <!--SUBSTRACTIVE-->
    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-substractive-intro></mib-substractive-intro>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-substractive-graph></mib-substractive-graph>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-substractive-demo :options="{
                                    isOsc2Disabled: false,
                                    isFmDisabled: true,
                                    isADSRDisabled: true,
                                    isFilterDisabled: false,
                                    isAccentDisabled: true,
                                    isLFODisabled: true,
                                    isReverbDisabled: true
                                  }">
      </mib-substractive-demo>
    </slide>

    <!--ENVELOPES-->
    <slide enter='bounceInRight' :mouseNavigation="false">
      <mib-envelopes-intro></mib-envelopes-intro>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false">
      <mib-envelopes-curves></mib-envelopes-curves>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false">
      <mib-envelopes-graph></mib-envelopes-graph>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false" :steps="2">
      <mib-envelopes-demo :options="{
                                    isOsc2Disabled: false,
                                    isFmDisabled: true,
                                    isADSRDisabled: false,
                                    isFilterDisabled: false,
                                    isAccentDisabled: false,
                                    isLFODisabled: true,
                                    isReverbDisabled: true
                                  }">
      </mib-envelopes-demo>
    </slide>

    <!--LFO-->
    <slide enter='bounceInRight' :mouseNavigation="false">
      <mib-lfo-intro></mib-lfo-intro>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false">
      <mib-lfo-graph></mib-lfo-graph>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false" :steps="2">
      <mib-lfo-demo :options="{
                                    isOsc2Disabled: false,
                                    isFmDisabled: false,
                                    isADSRDisabled: false,
                                    isFilterDisabled: false,
                                    isAccentDisabled: false,
                                    isLFODisabled: false,
                                    isReverbDisabled: false
                                  }">
      </mib-lfo-demo>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false">
      <custom></custom>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false">
      <but></but>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false">
      <mib-audio-worklet-script></mib-audio-worklet-script>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false">
      <mib-audio-worklet-usage></mib-audio-worklet-usage>
    </slide>

    <!--END-->
    <slide enter='bounceInRight' :mouseNavigation="false" :steps="2">
      <mib-the-end></mib-the-end>
    </slide>
  </div>
</template>

<script>
  import eagle from 'eagle.js'
  import MibTitle from './slides/mib-title.vue'
  import { gamepadHandler } from '../../core/utils/gamepad-service'

  import IntroDemo from './slides/web-audio-api/demo.vue'

  import MibWebAudioApi00 from './slides/web-audio-api/mib-web-audio-api-00'
  import MibWebAudioApi01 from './slides/web-audio-api/mib-web-audio-api-01'
  import MibWebAudioSnippet from './slides/web-audio-api/snippet'

  import MibMonophonicIntro from './slides/monophonic-synthesis/intro'
  import MibMonophonicSnippet from './slides/monophonic-synthesis/snippet.vue'
  import MibMonophonicGraph from './slides/monophonic-synthesis/graph.vue'
  import MibMonophonicDemo from './slides/monophonic-synthesis/demo.vue'

  import MibPolyphonicIntro from './slides/polyphonic-synthesis/intro'
  import MibPolyphonicSnippet from './slides/polyphonic-synthesis/snippet.vue'
  import MibPolyphonicGraph from './slides/polyphonic-synthesis/graph.vue'
  import MibPolyphonicDemo from './slides/polyphonic-synthesis/demo.vue'

  import MibAdditiveIntro from './slides/additive-synthesis/intro'
  import MibAdditiveGraph from './slides/additive-synthesis/graph.vue'
  import MibAdditiveSnippet from './slides/additive-synthesis/snippet.vue'
  import MibAdditiveDemo from './slides/additive-synthesis/demo.vue'

  import MibSubstractiveIntro from './slides/substractive-synthesis/intro'
  import MibSubstractiveGraph from './slides/substractive-synthesis/graph.vue'
  import MibSubstractiveDemo from './slides/substractive-synthesis/demo.vue'

  import MibEnvelopesIntro from './slides/envelopes/intro.vue'
  import MibEnvelopesCurves from './slides/envelopes/curves.vue'
  import MibEnvelopesGraph from './slides/envelopes/graph.vue'
  import MibEnvelopesDemo from './slides/envelopes/demo.vue'

  import MibLfoIntro from './slides/lfo/intro.vue'
  import MibLfoGraph from './slides/lfo/graph.vue'
  import MibLfoDemo from './slides/lfo/demo.vue'

  import But from './slides/audioworklet/but'
  import Custom from './slides/audioworklet/custom'
  import MibAudioWorkletScript from './slides/audioworklet/worklet-script'
  import MibAudioWorkletUsage from './slides/audioworklet/worklet-usage'
  import MibTheEnd from './slides/mib-the-end'

  const btnMapping = gamepadHandler.gamepadsMapping[0].buttonsMapping

  export default {
    mixins: [
      eagle.slideshow,
    ],
    components: {
      MibTitle,

      IntroDemo,

      MibWebAudioApi00,
      MibWebAudioApi01,
      MibWebAudioSnippet,

      MibMonophonicIntro,
      MibMonophonicGraph,
      MibMonophonicSnippet,
      MibMonophonicDemo,

      MibPolyphonicIntro,
      MibPolyphonicGraph,
      MibPolyphonicSnippet,
      MibPolyphonicDemo,

      MibAdditiveIntro,
      MibAdditiveGraph,
      MibAdditiveSnippet,
      MibAdditiveDemo,

      MibSubstractiveIntro,
      MibSubstractiveGraph,
      MibSubstractiveDemo,

      MibEnvelopesIntro,
      MibEnvelopesCurves,
      MibEnvelopesGraph,
      MibEnvelopesDemo,

      MibLfoIntro,
      MibLfoGraph,
      MibLfoDemo,

      But,
      Custom,
      MibAudioWorkletScript,
      MibAudioWorkletUsage,

      MibTheEnd,
    },
    created: function () {
      this.updateSlides()

      btnMapping[8].mode = 'ACTION'
      btnMapping[8].action = () => {
        this.previousStep()
      }
      btnMapping[9].mode = 'ACTION'
      btnMapping[9].action = () => {
        this.nextStep()
      }

      gamepadHandler.start()
    },
    methods: {
      updateSlides() {
        this.currentSlideIndex = +this.$route.params.slide
        this.$nextTick(() => {
          this.step = +this.$route.params.step
        })
      },
      updateURL() {
        this.$router.push(`/${this.currentSlideIndex}/${this.step}`)
      },
    },
    props: {
      mouseNavigation: false,
    },
    watch: {
      $route: 'updateSlides',
      step: 'updateURL',
      currentSlideIndex: 'updateURL',
    },
    destroyed() {
      btnMapping[8].mode = 'KEYBOARD_EVENT'
      btnMapping[9].mode = 'KEYBOARD_EVENT'
    },
  }
</script>
