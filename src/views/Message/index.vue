<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import * as msgApi from "@/api/message";
import mainScroll from "@/mixins/mainScroll";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
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
    async fetchData() {
      return await msgApi.getMessages(this.page, this.limit);
    },
    async handleSubmit(data,callback){
      const resp = await msgApi.postMessage(data);
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
      this.data.total++;
    },
    handleScroll(dom){
      // console.log(dom);
      if(this.isLoading){
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

<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  .message-area-container {
    margin: 0 auto;
    width: 700px;
  }
}
</style>