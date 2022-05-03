# vue 实现vscode效果 宽度拖拽组件
    参考地址:https://blog.csdn.net/Little_Fishs/article/details/120150460
# 使用



`<template>
  <div id="app" style="width: 100%; height: 100vh; border:1px solid #ccc;">
    <drag-box style="width: 100%; height: 100%;">
      <drag-item style="width: 20%;">item1</drag-item>
      <drag-item>item2</drag-item>
      <drag-item style="width: 20%;" :resizeShow='false'>item3</drag-item>
    </drag-box>
  </div>
</template>

<script>
import {DragBox, DragItem} from './components/dragLayouter'

export default {
  name: 'App',
  components: {
    DragBox,
    DragItem
  }
}
</script>
`