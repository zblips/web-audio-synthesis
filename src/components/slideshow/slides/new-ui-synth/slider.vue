<style lang="scss" type="text/scss" scoped>
  @import '../../../../assets/styles/synth-card';
  @import '../../../../assets/styles/colors';

  .slider {
    &.active {
      cursor: move;
    }
    .curse {
      stroke: none;
      fill: white;
    }

    .handle {
      fill: black;
      stroke-linecap: round;
      cursor: pointer;

      &.active {
        cursor: move;
      }
    }

    &.red {
      .handle {
        fill: #f02614;
      }
    }

    &.blue {
      .handle {
        fill: #3a95de;
      }
    }

    &.cyan {
      .handle {
        fill: #82bbb8;
      }
    }

    &.green {
      .handle {
        fill: #4cae5e;
      }
    }

    .cursor {
      fill: #fdfdfd;
      cursor: pointer;
      &.active {
        cursor: move;
      }
    }

    .label {
      font-size: $input-label-size;
      text-align: center;
      display: block;
      margin: 0 auto;
      color: #2c3e50;
      font-family: "Lucida Console", Monaco, monospace;
    }
  }

</style>

<template>
  <div :class="{ 'slider': true, active }">
    <svg :viewBox="viewBox" @mousedown="toggleActive" @mousewheel="wheel" :style="sliderStyle" ref="viewBox">
      <g>
        <rect class="curse" id="svg_1" :height="viewBoxDimensions.height" width="3" x="24" y="0"></rect>
        <rect :class="{handle: true, active }" ref="handle" id="svg_1" :height="viewBoxDimensions.width / 2"
              :width="viewBoxDimensions.width" x="0" y="0" rx="8" ry="8"></rect>
        <rect class="cursor" ref="cursor" id="svg_1" height="2" :width="viewBoxDimensions.width" x="0"
              :y="viewBoxDimensions.width / 4"></rect>

      </g>
    </svg>
    <span class="label">{{label}}</span>
  </div>
</template>

<script>
  import * as R from 'ramda'
  import { scale, unscale } from 'wasa'

  export default {
    props: {
      value: {
        type: Number,
      },
      label: {
        type: String,
      },
      height: {
        type: Number,
      },
    },
    mounted() {
      this.moveFromValue(this.value)
    },
    watch: {
      value(newValue) {
        this.moveFromValue(newValue)
      },
    },
    computed: {
      viewBox() {
        return [
          this.viewBoxDimensions.x,
          this.viewBoxDimensions.y,
          this.viewBoxDimensions.width,
          this.viewBoxDimensions.height,
        ].join(' ')
      },
      slide() {
        return `translate(0, ${this.position})`
      },
      sliderStyle() {
        return {
          height: `${this.height}px`,
          width: `${this.height / 4}px`,
        }
      },
    },
    data: () => ({
      active: false,
      viewBoxDimensions: {
        x: 0,
        y: 0,
        width: 50,
        height: 200,
      },
    }),
    methods: {
      toggleActive(event) {
        if (event.which !== 1) {
          return
        }
        this.active = true
        document.addEventListener('mousemove', this.drag)
        document.addEventListener('mouseup', this.toggleInactive)
      },
      toggleInactive() {
        this.active = false
        document.removeEventListener('mouseup', this.toggleInactive)
        document.removeEventListener('mousemove', this.drag)
      },
      drag(event) {
        event.preventDefault()
        const coord = this.getMousePosition(event)
        if (coord.y < -25 || coord.y > 225) {
          return
        }
        this.move(coord.y)
      },
      wheel(event) {
        event.preventDefault()
        const newPos = Number(this.$refs.handle.getAttributeNS(null, 'y')) + (-event.wheelDeltaY * 0.01)
        this.move(newPos)
      },
      move(mousePos) {
        const yMax = this.viewBoxDimensions.height - this.viewBoxDimensions.width / 2
        const yMin = 0
        const cursorRelativePos = this.viewBoxDimensions.width / 4
        const cursorMin = yMin + cursorRelativePos
        const cursorMax = yMax + cursorRelativePos
        const newCursorPos = R.clamp(cursorMin, cursorMax, mousePos + cursorRelativePos)
        const newYPos = R.clamp(yMin, yMax, mousePos)
        this.$refs.handle.setAttributeNS(null, 'y', newYPos)
        this.$refs.cursor.setAttributeNS(null, 'y', newCursorPos)
        this.$emit('update', scale({ max: cursorMin, min: cursorMax }, newCursorPos))
      },
      moveFromValue(value) {
        const yMax = this.viewBoxDimensions.height - this.viewBoxDimensions.width / 2
        const yMin = 0
        const cursorRelativePos = this.viewBoxDimensions.width / 4
        const max = yMin + cursorRelativePos
        const min = yMax + cursorRelativePos
        this.move(unscale({ min, max }, value))
      },
      getMousePosition(event) {
        const ctm = this.$refs.viewBox.getScreenCTM()
        return {
          x: (event.clientX - ctm.e) / ctm.a,
          y: (event.clientY - ctm.f) / ctm.d,
        }
      },
    },
  }
</script>
