<template>
  <!-- <VueDragResize
    class="right-bar"
    :isActive="true"
    :w="200"
    :h="200"
    v-on:resizing="resize"
    :isDraggable="false"
    :x="x"
    :y="100"
  >
    content
  </VueDragResize> -->
  <div class="right-bar">
    contant
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import VueDragResize from 'vue-drag-resize'
@Component({
  components: {
    // VueDragResize
  }
})
export default class RightBar extends Vue {
  // width = 0
  // height = 0
  // top = 0
  // left = 0
  // x = document.body.offsetWidth
  // resize(newRect: any) {
  //   this.width = newRect.width
  //   this.height = newRect.height
  //   this.top = newRect.top
  //   this.left = newRect.left
  // }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/index';
.right-bar {
  width: $rightBarWidth;
  background: #e95aee;
  position: absolute;
  right: 0;
  top: $headerHeight;
  bottom: 0;
}
</style>
