<template>
  <div id="app">
    <li v-for="(img, index) in images" :key="index">
      <p>img: {{ img }}</p>
      <img :src="imgUrl(img)" alt="" />
    </li>
  </div>
</template>

<script>
const req = require.context("@/assets/images", false, /(\.jpg|\.gif)$/);

export default {
  name: "App",
  data() {
    return {
      images: [],
    };
  },
  created() {
    this.images = req.keys();
  },
  methods: {
    imgUrl(path) {
      return req(path);
    },
  },
};
</script>

<style>
img {
  height: 30px;
}
</style>
