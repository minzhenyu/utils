/*
 * @Author: zy.min
 * @Date: 2022-05-01 15:46:58
 * @LastEditTime: 2022-05-01 15:55:59
 * @LastEditors: zy.min
 */
import DragBox from './drag-box.vue';
import DragItem from './drag-item.vue';

const Loading = {
    install: function (Vue) {
        Vue.component('DragBox', DragBox);
        Vue.component('DragItem', DragItem);
    }
};

export default Loading;
