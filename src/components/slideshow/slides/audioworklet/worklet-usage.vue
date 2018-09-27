<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

</style>

<template>
  <div class="slide">
    <h2>Audioworklet</h2>
    <div class="snippets">
      <div class="snippet">
        <eg-code-block lang="javascript">
        </eg-code-block>
      </div>
      <div class="snippets">
        <div class="snippet">
          <eg-code-block lang="javascript">
            const context = new AudioContext();

            context.audioWorklet.addModule('my-processor.js').then(() => {
                let oscillator = new OscillatorNode(context);

                let myWorkletNode = new AudioWorkletNode(context, 'my-processor');

                oscillator.connect(myWorkletNode).connect(context.destination);
                oscillator.start();
            });
          </eg-code-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
