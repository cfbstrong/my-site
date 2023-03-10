<template>
  <div class="about-container" v-loading="loading || !srcLoaded">
      <iframe v-if="src" class="about-content" :src="src" frameborder="0" @load="srcLoaded = true"></iframe>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  data(){
    return {
      srcLoaded:false
    }
  },
  computed:{
    ...mapState("about", {
      src:"data",
      loading:"loading"
    })
  },
  created(){
    //容易忘记的步骤
    this.$store.dispatch("about/fetchAbout")
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
.about-container{
  width:100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .about-content{
    width: 100%;
    height: 100%;
    // iframe默认是行盒
    display: block;
    box-sizing: border-box;
  }
}
</style>