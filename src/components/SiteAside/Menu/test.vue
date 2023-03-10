<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./"
export default {
    components:{
        Menu
    }
}
</script>

<style>
.test-container{
    height: 600px;
    width:400px;
    background: #000;
    border: 2px solid red;
    margin:0 auto;
}
</style>