<!--
 * @Author: zy.min
 * @Date: 2022-05-01 15:36:01
 * @LastEditTime: 2022-05-01 15:43:51
 * @LastEditors: zy.min
-->
<template>
    <div ref="dragBox" style="display: flex; width: 100%; height: 100%">
        <slot></slot>
    </div>
</template>
<script>
export default {
    mounted() {
        this.setDragItemFlex();
        this.dragControllerDiv();
    },

    methods: {
        // 如果dragItem 没有定义宽度，则flex=1
        setDragItemFlex() {
            const dragBox = this.$refs.dragBox;
            const childsLen = dragBox.children.length;

            for (let i = 0; i < childsLen; i++) {
                const node = dragBox.children[i];
                if (!node.style.width) {
                    // 如果没有定义宽度，则flex=1
                    node.style.flex = 1;
                }
            }
        },
        // 拖拽逻辑
        dragControllerDiv() {
            const resize = document.getElementsByClassName('resize'); // 拖拽条
            // 循环为每个拖拽条添加事件
            for (let i = 0; i < resize.length; i++) {
                // 鼠标按下事件
                resize[i].addEventListener('mousedown', this.onMouseDown);
            }
        },
        // 鼠标按下逻辑
        onMouseDown(e) {
            this.resizeBox = e.target;
            this.currentBox = this.resizeBox.parentNode; // 当前盒子
            this.rightBox = this.getNextElement(this.currentBox); // 当前盒子的下个兄弟节点
            if (!this.rightBox) return;
            this.curLen = this.currentBox.clientWidth;
            this.otherBoxWidth =
                this.$refs.dragBox.clientWidth - this.currentBox.clientWidth - this.rightBox.clientWidth; // 其他盒子的宽度
            // 颜色改变提醒
            this.resizeBox.style.background = '#818181';
            this.startX = e.clientX;
            document.addEventListener('mousemove', this.onMousemove);
            document.addEventListener('mouseup', this.onMouseup);
        },

        // 获取下一个兄弟元素的兼容函数
        getNextElement(element) {
            if (element.nextElementSibling) {
                return element.nextElementSibling;
            } else {
                var next = element.nextSibling; // 下一个兄弟节点
                while (next && next.nodeType !== 1) {
                    // 有 并且 不是我想要的
                    next = next.nextSibling;
                }
                return next;
            }
        },
        // 鼠标移动事件
        onMousemove(e) {
            const endX = e.clientX;
            const moveLen = endX - this.startX; // （endx-startx）= 移动的距离
            const CurBoxLen = this.curLen + moveLen; // resize[i].left+移动的距离=左边区域最后的宽度
            const rightBoxLen = this.$refs.dragBox.clientWidth - CurBoxLen - this.otherBoxWidth; // 右侧宽度=总宽度-左侧宽度-其它盒子宽度
            // 当最小宽度时，无法继续拖动
            if (CurBoxLen <= 200 || rightBoxLen <= 200) return;
            this.currentBox.style.width = CurBoxLen + 'px'; // 当前盒子的宽度
            this.resizeBox.style.left = CurBoxLen; // 设置左侧区域的宽度
            this.rightBox.style.width = rightBoxLen + 'px';
        },

        //鼠标抬起事件
        onMouseup() {
            // 颜色恢复
            this.resizeBox.style.background = '#d6d6d6';
            document.removeEventListener('mousedown', this.onMouseDown);
            document.removeEventListener('mousemove', this.onMousemove);
        }
    }
};
</script>
