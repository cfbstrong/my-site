<template>
  <div class="blog-list-container" v-loading="isLoading" ref="mainContainer">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{
            name:'BlogDetail',
            params:{
              id:item.id
            }
          }">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{
            name:'BlogDetail',
            params:{
              id:item.id
            }
          }">
            <h2>{{ item.title }}</h2>
         </RouterLink>
          <div class="aside">
            <span>{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink :to="{
              'name':'CategoryBlog',
              'params':{
                categoryId:item.category.id
              }
            }">{{ item.category.name }}</RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading"/>
    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData";
import { getBlogs } from "@/api/blog";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll";
import Empty from "@/components/Empty"
export default {
  mixins: [fetchData({total:0, rows:[]}), mainScroll("mainContainer")],
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    Pager,
    Empty,
  },
  computed: {
    //获取路由信息
    routeInfo() {
      //依赖地址栏路由变化，手动赋值修改无效(this.routeInfo.page = newPage)
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    handlePageChange(newPage){
      const query = {
        page:newPage,
        limit:this.routeInfo.limit
      }
      //跳转到 当前的分类id 当前的页容量 newPage的页码
      if(this.routeInfo.categoryId === -1){
        this.$router.push({
          //未分类
          name:'Blog',
          query,
        })
      }else{
        //有分类
        this.$router.push({
          name:'CategoryBlog',
          params:{
            categoryId:this.routeInfo.categoryId
          },
          query,
        })
      }
    }
  },
  watch:{
    //this.$route
    async $route(){
      this.isLoading = true;
      //滚动高度设置为0
      this.$refs.mainContainer.scrollTop = 0;
      //再次发出请求
      this.data = await this.fetchData();
      this.isLoading = false;
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
  box-sizing: border-box;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
