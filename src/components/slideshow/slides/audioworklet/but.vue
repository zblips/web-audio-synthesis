<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

</style>

<template>
  <div class="slide">
    <h2>But...</h2>
    <div class="snippets">
      <div class="snippet">
        <eg-code-block lang="javascript">
          // The script processor design flaw
          scriptNode.onaudioprocess = (audioProcessingEvent) => {
            const inputBuffer = audioProcessingEvent.inputBuffer;

            // Something cool should go there

            // The output buffer contains the samples that will be modified and played
            const outputBuffer = audioProcessingEvent.outputBuffer;
          }
        </eg-code-block>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
