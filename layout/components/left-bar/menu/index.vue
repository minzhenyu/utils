<template>
  <div class="menu">
    菜单
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Menu extends Vue {}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 400px;
}
</style>
