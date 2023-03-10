<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside/>
        </div>
      </template>
      <template>
        <router-view></router-view>
      </template>
    </Layout>
    <ToTop/>
  </div>
</template>

<script>
import SiteAside from "@/components/SiteAside";
import Layout from "@/components/Layout";
import ToTop from "@/components/ToTop";
export default{
  components:{
    SiteAside,
    Layout,
    ToTop
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/mixin.less");
  .app-container{
    .self-fill(fixed);
    .aside{
      width: 250px;
      height: 100%;
    }
  }
</style>