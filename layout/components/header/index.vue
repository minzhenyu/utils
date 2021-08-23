<template>
  <div class="header">
    header
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../assets/css/index';
.header {
  width: 100%;
  height: $headerHeight;
  background: #cf8673;
  position: absolute;
  top: 0;
}
</style>
