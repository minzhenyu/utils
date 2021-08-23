<template>
  <div class="footer">
    footer logs 命令行
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../assets/css/index';
.footer {
  height: 300px;
  background: #73cf82;
  position: absolute;
  bottom: 0;
  left: $leftBarWidth;
  right: $rightBarWidth;
}
</style>
