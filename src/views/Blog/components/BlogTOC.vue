<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from "@/views/Blog/components/RightList";
import { deBounce } from "@/utils";
export default {
  props:{
    toc:{
      type:Array,
    }
  },
  data(){
    return {
      activeAnchor:""
    }
  },
  computed:{
    //根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
    tocWithSelect(){
      const getTOC = (toc = [])=>{
        // [ {name:"xxx", isSelect:true, children:[ {name:"yyy", isSelect:false} ]} ]
        return toc.map((item)=>{
          return { ...item, isSelect:item.anchor === this.activeAnchor, children: getTOC(item.children)}
        })
      }
      return getTOC(this.toc)
    },
    //根据toc得到它们对应的Dom元素数组
    doms(){
      const doms = [];
      const addToDoms = (toc)=>{
        for(const item of toc){
          doms.push(document.getElementById(item.anchor));
          if(item.children && item.children.length){
            addToDoms(item.children)
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    }
  },
  components:{
    RightList,
  },
  created(){
    //全局事件总线
    this.newSetSelect = deBounce(this.setSelect, 50);
    this.$bus.$on("mainScroll",this.newSetSelect);
  },
  destroyed(){
    this.$bus.$off("mainScroll",this.newSetSelect);
  },
  methods:{
    handleSelect(item){
      //设置锚点跳转
      location.hash = item.anchor;
    },
    setSelect(scrollDom){
      if(!scrollDom){
        return;
      }
      this.activeAnchor = ""; //由于后续要重新设置，先清空之前的状态
      const range = 200;
      //设置activeAnchor为正确的值
      for(const dom of this.doms){
        //判断当前的这个dom元素是不是应该被选中
        if(!dom){
          continue;
        }
        //得到元素距离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        if(top >= 0 && top <= range){
          //在规定的范围内
          this.activeAnchor = dom.id;
          return;
        }else if(top > range){
          //在规定的范围下方
          return;
        }else{
          //在规定的范围上方
          this.activeAnchor = dom.id;
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.blog-toc-container{
  width: 100%;
  h2{
    font-size: 1em;
    letter-spacing: 2px;
    font-weight: bold;
  }
}

</style>