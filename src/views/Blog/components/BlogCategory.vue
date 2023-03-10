<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from "../components/RightList.vue";
import {getBlogTypes} from "@/api/blog";
import fetchData from "@/mixins/fetchData";
export default {
    mixins:[fetchData([])],
    components:{
        RightList,
    },
    computed:{
        categoryId(){
            return +this.$route.params.categoryId || -1;
        },
        limit(){
            return +this.$route.query.limit || 10;
        },
        list(){
            const totalArticleCount = this.data.reduce((a, b)=>{
                    return a + b.articleCount
                }, 0)
            const result = [
                {name:"全部", id:-1, articleCount:totalArticleCount},
                ...this.data
            ]
            return result.map((item)=>{
                return {
                    ...item,
                    isSelect: item.id === this.categoryId,
                    aside:`${item.articleCount}篇`
                }
            })
        }
    },
    methods:{
        async fetchData(){
            return await getBlogTypes();
        },
        handleSelect(item){
            const query = {
                page:1,
                limit: this.limit
            }
        if(item.id === -1){
        this.$router.push({
            name:'Blog',
            query,
        })
        }else{
            this.$router.push({
            name:'CategoryBlog',
            params:{
                categoryId:item.id
            },
            query,
        })
      }
        }
    }
    
}
</script>

<style scoped lang="less">
.blog-category-container{
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    height: 100%;
    overflow-y: auto;
    h2{
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 1em;
        margin: 0;
    }
}
</style>