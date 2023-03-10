<template>
  <div class="test-container">
    <MessageArea/>
  </div>
</template>

<script>
import MessageArea from "./"
export default {
    components:{
        MessageArea
    }

}
</script>

<style lang="less" scoped>
.test-container{
    height: 800px;
    width: 500px;
    margin: 0 auto;
}
</style>