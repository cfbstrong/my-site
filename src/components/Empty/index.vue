<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/var.less");
@import url("~@/styles/mixin.less");
.empty-container{
    .self-center();
    //设置父元素来实现其中文字居中的效果
    text-align: center;
    .icon-container{
        color:@gray;
        font-size: 72px;
    }
    p{
        color:@gray;
    }
}
</style>