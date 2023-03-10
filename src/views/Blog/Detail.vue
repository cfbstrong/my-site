<template>
  <Layout>
    <div class="main-container" v-loading="isLoading" ref="mainContainer">
      <BlogDetail :blog="data" v-if="data"/>
      <BlogComment v-if="!isLoading"/>
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data"/>
      </div>
    </template>
  </Layout>
</template>

<script>
import { getBlog } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail.vue";
import BlogTOC from "./components/BlogTOC.vue";
import BlogComment from "./components/BlogComment.vue";
import mainScroll from "@/mixins/mainScroll";
import { titleController } from "@/utils";
export default {
  mixins:[fetchData(), mainScroll("mainContainer")],
  components:{
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  updated(){
    const hash = location.hash;
    location.hash = "";
    setTimeout(()=>{
      location.hash = hash;
    },50)
  },
  methods:{
    async fetchData(){
      const resp = await getBlog(this.$route.params.id);
      // resp = null; 测试404
      if(!resp){
        //文章不存在
        this.$router.push({path:"/404"});
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  }
}
</script>

<style lang="less" scoped>
.main-container{
  overflow-y: scroll;
  // 哪个滚动条需要平滑滚动，就在哪里设置
  scroll-behavior: smooth;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width:100%;
  overflow-x: hidden;
}
.right-container{
    width: 250px;
    height: 100%;
    overflow-y:auto ;
    box-sizing: border-box;
    position: relative;
    padding: 20px;
  }

</style>