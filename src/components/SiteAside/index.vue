<template>
  <div class="site-aside-container">
    <Avatar url="http://mdrs.yuanjin.tech/img/20201130153821.png" alt="image-20201130153821293" />
    <h1 class="title" v-if="data">{{ data.siteTitle }}</h1>
    <Menu/>
    <Contact/>
    <p class="footer"  v-if="data">
      {{ data.icp }}
    </p>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Avatar from "@/components/Avatar"
import Menu from "@/components/SiteAside/Menu"
import Contact from "@/components/SiteAside/Contact"
export default {
    components:{
        Avatar,
        Menu,
        Contact,
    },
    computed:{
      ...mapState("setting" ,["data"])
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less" ;
.site-aside-container{
    width: 100%;
    height: 100%;
    background: @dark;
    padding: 20px 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    .avatar-container{
        margin: 0 auto;
    }
    .footer{
      text-align: center;
      font-size: 12px;
    }
    .title{
      text-align: center;
      font-size: 1.2em;
      color: #fff;
    }
}
</style>p