<template>
  <nav class="menu-container">
    <router-link
      v-for="item in items"
      :key="item.link"
      :to="item.link"
      :exact="item.exact"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span> {{ item.title }} </span>
    </router-link>
  </nav>
</template>

<script>
import "@/styles/global.less";
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          link: "/",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          link: "/blog", //只要当前路径以link开头，当前菜单就为选中状态
          title: "文章",
          icon: "blog",
          // startWith: true,
          exact: false,
        },
        {
          link: "/about",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          link: "/project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          link: "/message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
  methods: {
    // isSeleted(item) {
    //   if (item.startWith) {
    //     //模糊匹配
    //     return location.pathname.startsWith(item.link);
    //   } else {
    //     return location.pathname === item.link;
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/var.less");
.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    padding: 0 50px;
    display: block;
    display: flex;
    height: 45px;
    line-height: 45px;
    &:hover {
      color: #fff;
    }
    &.router-link-active {
      background: #2d2d2d;
    }
  }
  .icon {
    font-size: 16px;
    width: 24px;
  }
}
</style>