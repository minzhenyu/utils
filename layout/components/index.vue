<template>
  <div class="dag-box">
    <div class="canvas" id="canvas">
      canvas
    </div>
    <Header>2121</Header>
    <LeftBar></LeftBar>
    <RightBar></RightBar>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import '../assets/css/index.scss'
import Header from './header/index.vue'
import LeftBar from './left-bar/index.vue'
import RightBar from './right-bar/index.vue'
import Footer from './footer/index.vue'

@Component({
  components: { Header, LeftBar, RightBar, Footer }
})
export default class DagEditer extends Vue {}
</script>

<style lang="scss" scoped>
.dag-box {
  width: 100%;
  height: 100%;
  background: #f00;
  position: relative;
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #1a015e;
  }
}
</style>
