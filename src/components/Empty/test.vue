<template>
    <div class="test-container">
        <Empty />
    </div>
</template>

<script>
import Empty from "./"
export default {
    components:{
        Empty,
    }
}
</script>

<style lang="less" > 
// 测试不需要加scoped 
.test-container{
    width: 500px;
    height: 200px;
    margin: 0 auto;
    position:relative;
}

</style>