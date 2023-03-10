<template>
  <div class="image-loader-container">
    <!-- <img :src="src" class="origin"> -->
    <!-- 注意定位顺序 -->
    <img :src="placeholder" v-if="!everythingDone" class="placeholder" />
    <img
      @load="handleLoad"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
      :src="src"
      class="origin"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false, //原图是否加载完毕,一切从状态出发
      everythingDone: false, //原图加载完毕并且opacity已经从0 --> 1过渡完毕 这时才能将占位图删除 否则会有短暂白屏
    };
  },
  methods: {
    handleLoad() {
      console.log("图片加载完成");
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit("load");
      }, this.duration);
    },
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/mixin.less");
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    // 虚化，视口越宽，越虚化
    filter: blur(2vw);
  }
}
</style>