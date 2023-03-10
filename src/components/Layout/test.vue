<template>
  <div class="test-container">
    <Layout>
        <template #left>
            <div class="left">
                左边栏
            </div>
        </template>
        <template #default>
            <div class="main">
                中间区域
            </div>
        </template>
        <template #right>
            <div class="right">
                右边栏
            </div>
        </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./"
export default {
    components:{
        Layout,
    }
}
</script>

<style lang="less" scoped>
.test-container{
    height: 600px;
    width: 80%; //这里必须使用百分比才能测试响应式布局
    margin:0 auto;
    .left{
        width: 200px;
        height: 100%;
        background: #bfa;
    }
    .main{
        background: blue;
        height: 100%;
    }
    .right{
        background: red;
        width: 150px;
        height: 100%;
    }
}
</style>