<template>
  <div class="letf-bar">
    <Search />
    <Menu></Menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Menu from './menu/index.vue'
import Search from './search.vue'
@Component({
  components: {
    Menu,
    Search
  }
})
export default class LeftBar extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../assets/css/index';
.letf-bar {
  width: $leftBarWidth;
  background: #5c81c5;
  left: 0;
  top: $headerHeight;
  bottom: 0;
  position: absolute;
}
</style>
