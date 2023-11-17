<template>
  <div
    id="tags-view-container"
    ref="tagViewContainer"
    class="tags-view-container"
  >
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in showVisitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
      <el-tooltip  effect="dark" :content="tag.title" placement="bottom" :open-delay="500" :disabled='tag.title.length<=10'>
        <span>{{ tag.title | ellipsis(10) }}</span>
      </el-tooltip>
        <i
          :class="tag.isLoading ? 'el-icon-loading' : 'el-icon-close'"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
      <div class="show-more-tab">
        <el-dropdown @visible-change="onVisibleChange" trigger="click">
          <span class="el-dropdown-link">
            <i
              class="el-icon--right"
              :class="
                visibleDropdown ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
              "
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="header-drop-more">
            <div class="drop-list">
              <el-dropdown-item
                v-for="(menu, index) in hiddenVisitedViews"
                :key="index"
                class="drop-item"
              >
                <div class="item-tab-title">
                  <el-tooltip  effect="dark" :content="menu.title" placement="bottom" :open-delay="500" :disabled='menu.title.length<=10'>
                    <span>{{ menu.title | ellipsis(10) }}</span>
                  </el-tooltip>
                  <i class="el-icon-close"></i>
                </div>
              </el-dropdown-item>
            </div>
            <el-dropdown-item
              :divided="hiddenVisitedViews.length > 0"
              class="close-all"
              >全部关闭</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="closeSelectedTag(selectedTag)">关闭当前页</li>
      <li @click="closeOthersTags">关闭其他页</li>
      <li @click="closeAllTags(selectedTag)">全部关闭</li>
      <li @click="refreshSelectedTag(selectedTag)">刷新当前页</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import path from "path";
import { debounce } from "lodash";
export default {
  components: { ScrollPane },
  mounted() {
    const deRest = debounce(() => this.computedTagsNumByWidth(), 500);
    const element = this.$refs.tagViewContainer;
    var ro = new ResizeObserver((entries) => {
      // eslint-disable-next-line no-unused-vars
      for (let _entry of entries) {
        deRest();
      }
    });
    // 观察一个或多个元素
    ro.observe(element);
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      visibleDropdown: false,
      maxIndex: 0,
    };
  },
  computed: {
    visitedViews() {
      return [
        {
          fullPath: "/dashboard",
          path: "/dashboard",
          name: "Dashboard",
          meta: { title: "Dashboard", icon: "dashboard", affix: true },
          title: "Dashboard",
        },
        {
          fullPath: "/dashboard/main-layout",
          path: "/dashboard/main-layout",
          name: "main-layout",
          meta: { title: "main-layout", icon: "main-layout", affix: true },
          title: "main-layout111111111111111111111",
        },
        {
          fullPath: "/gf.workbench.home",
          path: "/gf.workbench.home",
          name: "gf.workbench.home",
          meta: { title: "首页", icon: "main-layout", affix: true },
          title: "首页",
        },
        {
          name: "Profile",
          meta: { title: "Profile", icon: "user", noCache: true },
          path: "/profile/index",
          hash: "",
          query: {},
          params: {},
          fullPath: "/profile/index",
          title: "Profile",
        },
        {
          fullPath: "/dashboard/main-layout1",
          path: "/dashboard/main-layout1",
          name: "main-layout",
          meta: { title: "main-layout", icon: "main-layout", affix: true },
          title: "main-layout111111111111111111111",
        },
        {
          fullPath: "/dashboard/main-layout2",
          path: "/dashboard/main-layout2",
          name: "main-layout",
          meta: { title: "main-layout", icon: "main-layout", affix: true },
          title: "main-layout111111111111111111111",
        },
        {
          fullPath: "/dashboard/main-layout3",
          path: "/dashboard/main-layout3",
          name: "main-layout",
          meta: { title: "main-layout", icon: "main-layout", affix: true },
          title: "main-layout111111111111111111111",
        },
        {
          fullPath: "/dashboard/main-layout4",
          path: "/dashboard/main-layout4",
          name: "main-layout",
          meta: { title: "main-layout", icon: "main-layout", affix: true },
          title: "main-layout111111111111111111111",
        },
        {
          fullPath: "/dashboard/main-layout5",
          path: "/dashboard/main-layout5",
          name: "main-layout",
          meta: { title: "main-layout", icon: "main-layout", affix: true },
          title: "main-layout111111111111111111111",
        },
        {
          fullPath: "/dashboard/main-layout6",
          path: "/dashboard/main-layout6",
          name: "main-layout",
          meta: { title: "main-layout", icon: "main-layout", affix: true },
          title: "main-layout111111111111111111111",
        },
      ];
      // return this.$store.state.tagsView.visitedViews;
    },
    showVisitedViews({ visitedViews, maxIndex }) {
      if (visitedViews.length == maxIndex + 1) return visitedViews;
      const res = visitedViews.filter((item, index) => {
        return index < maxIndex - 1;
      });
      return res;
    },
    hiddenVisitedViews({ visitedViews, maxIndex }) {
      if (visitedViews.length == maxIndex + 1) return [];
      const res = visitedViews.filter((item, index) => {
        return index >= maxIndex - 1;
      });
      return res;
    },
    routes() {
      return this.$store.state.permission.routes;
    },
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
    visitedViews() {
      this.$refs.tagViewContainer&&this.computedTagsNumByWidth();
    },
  },
  methods: {
    // 显示隐藏下拉框
    onVisibleChange(e) {
      this.visibleDropdown = e;
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    addTags() {
      //tabMap 等修改更新
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("tagsView/updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath,
          });
        });
      });
    },
    closeSelectedTag(view) {
      this.$store
        .dispatch("tagsView/delView", view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view);
          }
        });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store
        .dispatch("tagsView/delOthersViews", this.selectedTag)
        .then(() => {
          this.moveToCurrentTag();
        });
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (this.affixTags.some((tag) => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 9; // 9: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY - 38;
      this.visible = true;
      this.selectedTag = tag;
      tag.isLoading = true;
    },
    closeMenu() {
      this.visible = false;
      this.visitedViews.forEach((item) => (item.isLoading = false));
    },
    handleScroll() {
      this.closeMenu();
    },
    onMousemove(item) {
      item.isShowClose = true;
    },
    computedTagsNumByWidth() {
      const wrapWidth = this.$refs.tagViewContainer.clientWidth - 53;
      let tagsWidth = 0;
      this.visitedViews.forEach((view, index) => {
        if (tagsWidth > wrapWidth) {
          return;
        }
        this.maxIndex = index-1;
        if (view.title.length > 10) {
          tagsWidth = tagsWidth + 103 + 5;
        } else {
          tagsWidth = tagsWidth + view.title.length * 10 + 5;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 38px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      color: #5e5e5e;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 6px;
      border-radius: 2px;
      border: 1px solid #ebeced;

      &:first-of-type {
        margin-left: 9px;
      }

      &:last-of-type {
        margin-right: 9px;
      }

      &.active,
      &:hover {
        background-color: mix(#2d6adf, #fff, 10%);
        color: #2d6adf;
        border-color: mix(#2d6adf, #fff, 10%);
      }
    }

    .el-dropdown {
      line-height: 38px;
      text-align: center;
      width: 26px;
      height: 26px;
    }

    .show-more-tab {
      float: right;
      margin-right: 18px;
    }
  }

  .contextmenu {
    width: 84px;
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 2px;
    font-size: 12px;
    font-weight: 500;
    color: #5e5e5e;
    border-radius: 3px;
    box-shadow: 0 1px 6px 0 mix(#000, #fff, 10%);

    li {
      margin: 0;
      padding: 5px 10px;
      cursor: pointer;
      color: #333333;
      font-family: "PingFang SC";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      width: 80px;
      height: 28px;
      display: flex;
      align-items: center;

      &:hover {
        border-radius: 1px;
        background: #eaf0fc;
        color: #2d6adf;
      }

      &:last-child {
        border-top: 1px solid #ebeced;
      }
    }
  }
}

.close-all {
  padding: 0 6px;
  &:hover {
    background: #eaf0fc;
    color: #2d6adf;
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    //.el-icon-close {
    //    width: 12px;
    //    height: 12px;
    //    font-size: 12px;
    //    vertical-align: 2px;
    //    border-radius: 50%;
    //    text-align: center;
    //    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    //    transform-origin: 100% 50%;
    //
    //    &:before {
    //        transform: scale(0.8);
    //        display: inline-block;
    //        vertical-align: -3px;
    //    }
    //
    //    &:hover {
    //        background-color: #b4bccc;
    //        color: #fff;
    //    }
    //}
  }
}
</style>
