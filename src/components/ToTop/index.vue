<template>
  <div v-show="show" class="to-top-container" @click="handleClick">
    Top
  </div>
</template>

<script>
export default {
    data(){
        return {
            show:false,
        }
    },
    created(){
        //一般在这绑定$on
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    methods:{
        handleScroll(dom){
            if(!dom){
                this.show = false;
                return;
            }
            this.show = dom.scrollTop >= 500;
        },
        handleClick(){
            //回到顶部
            this.$bus.$emit("setMainScroll", 0);
        }
    }

}
</script>

<style scoped lang="less">
@import url("~@/styles/var.less");
.to-top-container{
    background-color: @primary;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    position: fixed;
    z-index: 99;
    right: 50px;
    bottom:50px;
    text-align: center;
    cursor: pointer;
    color:#fff;
}
</style>