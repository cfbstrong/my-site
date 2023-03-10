<template>
  <div class="test-container">
    <SiteAside/>
  </div>
</template>

<script>
import SiteAside from "./"
export default {
    components:{
        SiteAside,
    }
}
</script>

<style>
    .test-container{
        width: 300px;
        height: 700px;
        /* background: #000; */
        border: 2px solid ;
        margin:0 auto;
    }
</style>