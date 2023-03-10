<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <!-- 附加信息 [日期、评论、浏览人数等等] -->
      <span>日期：{{  formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论：{{ blog.commentNumber }}</a>
      <RouterLink :to="{
        name:'CategoryBlog',
        params:{
          categoryId:blog.category.id
        }
      }">
        {{ blog.category.name }}
      </RouterLink>
    </div>
    <!-- {{ blog.htmlContent }} 防止XSS攻击-->
    <!-- v-html 相当于设置 div.innerHTML 使用该指令后，div中写的东西无效 -->
    <div v-html="blog.htmlContent" class="markdown-body"></div>

  </div>
</template>

<script>
import {formatDate} from "@/utils"
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
export default {
  props:{
    blog:{
      type:Object,
      required:true
    }
  },
  methods:{
    formatDate,
  }
}
</script>

<style scoped lang="less">
@import url("~@/styles/var.less");
.blog-detail-container{
  .aside{
    font-size: 12px;
    color:@gray;
    span,a{
      margin-right: 15px;
    }
  }
  .markdown-body{
    margin: 2em;
  }
}

</style>