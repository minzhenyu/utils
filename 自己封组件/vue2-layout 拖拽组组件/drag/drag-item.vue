<!--
 * @Author: zy.min
 * @Date: 2022-05-01 15:37:01
 * @LastEditTime: 2022-05-02 15:13:30
 * @LastEditors: zy.min
-->
<template>
    <div ref="container" class="d-flex">
        <div style="width: 100%; height: 100%">
            <slot></slot>
        </div>
        <!-- 拖拽条 -->
        <div v-if="resizeShow" class="resize" />
    </div>
</template>
<script>
export default {
    props: {
        // 控制拖拽条的是否显示，默认显示
        resizeShow: {
            type: Boolean,
            default: true
        }
    }
};
</script>
<style>
.d-flex {
    min-width: 200px;
    position: relative;
}
.resize {
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    cursor: col-resize;
    background-color: #d6d6d6;
}
</style>
