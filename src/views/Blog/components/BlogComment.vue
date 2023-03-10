<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getComments, postComment } from "@/api/blog";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created(){
    // window.fetchMore = this.fetchMore;
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed(){
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed:{
    hasMore(){
      return this.data.rows.length < this.data.total;
    }
  },
  methods: {
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    async fetchMore(){
      //加载下一页
      if(!this.hasMore){
        //没有更多的数据了
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback){
      // console.log(formData)
      const resp = await postComment({
        blogId:this.$route.params.id,
        ...formData
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("评论成功"); //告诉后代组件，这边处理完成了，后代组件继续
    },
    handleScroll(dom){
      // console.log(dom);
      if(this.isLoading || !dom){
        //目前正在加载更多，没必要继续加载更多
        return;
      }
      const range = 100; //设定一个可接受的范围，在这个范围内都算到达底部
      const dec = Math.abs((dom.scrollTop + dom.clientHeight) - dom.scrollHeight);
      if(dec <= range){
        //到达底部了
        // console.log("到达底部")
        this.fetchMore();
      }
    }
  },
};
</script>

<style>
</style>