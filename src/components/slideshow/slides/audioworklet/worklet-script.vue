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
            // my-processor.js
            class MyWorkletProcessor extends AudioWorkletProcessor {

            static get parameterDescriptors() {
              return [{
                name: 'myParam',
                defaultValue: 0.707
              }];
            }

            constructor() { super(); }

            process(inputs, outputs, parameters) {
                // Something cool goes here ...
            }
          </eg-code-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
