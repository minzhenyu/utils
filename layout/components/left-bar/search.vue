<template>
  <div class="search-bar">
    搜索框
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  height: 60px;
  background: #70c2c2;
}
</style>
