<template>
  <div class="home-container" ref="container" @wheel="handleWheel" v-loading="loading">
    <ul class="carousel-container" :style="{
      //通过margin-top来切换显示出来的li（轮播图）同时设置过渡500ms内完成这个变化
      marginTop
      }"
      @transitionend="handleTransitionend">
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item"/>
      </li>
    </ul>
    <div v-show="index > 0" @click="switchTo(index - 1)" class="icon icon-up" >
      <Icon type="arrowUp"/>
    </div>
    <div v-show="index < data.length - 1" @click="switchTo(index + 1)" class="icon icon-down">
      <Icon type="arrowDown"/>
    </div>
    <ul class="indicator">
      <!-- 通过index===1是否成立来决定active的样式是否添加上 -->
      <li @click="switchTo(i)" v-for="(item,i) in data" :key="item.id" :class="{active: index === i }" ></li> 
    </ul>
  </div>
</template>

<script>
// Home组件负责呈现整体效果
import {mapState} from "vuex";
import CarouselItem from './CarouseIitem.vue';
import Icon from "@/components/Icon";
export default {
  components:{
    CarouselItem,
    Icon,
  },
  data(){
    return{
      index: 0,//当前显示的是第几张轮播图
      containerHeight:0, //轮播图切换时，一版容器的高度，每次切换一版
      switching:false, //表示是否正在翻页中，如果正在翻页，那么不允许再次翻页 翻动完成之后改为false
    }
  },
  created(){
    this.$store.dispatch("banner/fetchBanner");
  },
  computed:{
    marginTop(){
      //第一张轮播图 0  第二张轮播图 -781 ...... 图示参见草稿
      return -this.index * this.containerHeight + 'px'
    },
    ...mapState("banner",{
      loading: "loading",
      data: "data",
    })
  },
  mounted(){
    //获取containerHeight即一版的高度(注意这里只会运行一次 当浏览器窗口尺寸变化时，获取的高度会不准确)
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize",this.handleResize);
      //监听浏览器窗口尺寸的变化，变化后重新获取浏览器窗口尺寸大小
  },
  destroyed(){
    //移除监听事件(牢记要移除)
    window.removeEventListener("resize",this.handleResize)
  },
  methods:{
    switchTo(i){
      //切换轮播图i
      this.index = i;
    },
    handleWheel(e){
      //e.deltayY表示鼠标滚轮滚动的幅度大小
      if(this.switching){
        //滚动幅度比较小( -5<= 滚动幅度 <= 5 )或者如果正在滚动的话 不会触发函数
        return;
      }
      if(e.deltaY < -5 && this.index > 0){
        //向上翻页
        this.switching = true;
        this.index--;
      }else if(e.deltaY > 5 && this.index < this.data.length - 1){
        //向下翻页
        this.switching = true;
        this.index++;
      }
    },
    handleTransitionend(){
      this.switching = false; //过渡效果结束之后说明翻页已经完成，此时将翻页状态 switching 改为false
    },
    handleResize(){
      this.containerHeight =  this.$refs.container.clientHeight;
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/var.less");
.home-container{
  // 使用margin-top会产生垂直外边距重叠的问题，开启BFC来解决
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  // 测试
  // width: 400px;
  // height: 300px;
  // overflow: visible;
  // border: 2px solid red;
  // margin: 0 auto;

  ul{
    margin: 0;
    list-style: none;
    padding: 0;
  }
  .carousel-container{
    width: 100%;
    height: 100%;
    //500ms内完成这个变化
    transition: 500ms;
    li{
      width: 100%;
      height: 100%;
    }
  }
  .icon{
    position: absolute;
    font-size: 30px;
    color:@gray;
    cursor: pointer;
  }
  .icon-up{
    top:15px;
    left:50%;
    transform: translateX(-50%);
    animation: jump-up 2s infinite;
  }
  .icon-down{
    bottom:15px;
    left:50%;
    transform: translateX(-50%);
    animation: jump-down 2s infinite;
  }
  .indicator{
    position: absolute;
    right: 20px;
    top:50%;
    transform: translateY(-50%);
    li{
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: @words;
      cursor: pointer;
      margin-bottom:10px;
      border:1px solid #fff;
      box-sizing: border-box;
      &.active{
        background: #fff;
      }
    }
  }

  @jump:5px;
  @keyframes jump-up {
    0%{
      transform: translate(-50%, @jump);
    }
    50%{
      transform: translate(-50%,  -@jump);
    }
    100%{
      transform: translate(-50%,  @jump);
    }
  }

  @keyframes jump-down {
    0%{
      transform: translate(-50%, -@jump);
    }
    50%{
      transform: translate(-50%,  @jump);
    }
    100%{
      transform: translate(-50%,  -@jump);
    }
  }
}

</style>