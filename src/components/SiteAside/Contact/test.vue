<template>
  <div class="test-container">
    <Contact/>
  </div>
</template>

<script>
import Contact from "./"
import "@/styles/global.less" //使用vue serve会生成一个很干净的启动文件，需要再次引入全局样式进行测试
export default {
    components:{
        Contact,
    }
}
</script>

<style>
.test-container{
    width: 400px;
    height: 400px;
    border: 2px solid red;
    background-color: #000;
    margin:0 auto;
    padding-top: 200px;
}

</style>