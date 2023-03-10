<template>
  <div class="blog-container">
    <Layout>
      <BlogList/>
      <template #right>
        <BlogCategory/>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList.vue";
import BlogCategory from "./components/BlogCategory.vue"
export default {
  components:{
    Layout,
    BlogList,
    BlogCategory
  }
}
</script>

<style scoped lang="less">
.blog-container{
  width: 100%;
  height: 100%;
}
</style>