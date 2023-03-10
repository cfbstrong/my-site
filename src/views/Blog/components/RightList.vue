<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i" >
        <span @click="handleClick(item)" :class="{active: item.isSelect}">{{ item.name }}</span>
        <span v-if="item.aside" class="aside" @click="handleClick(item)" :class="{active: item.isSelect}">{{ item.aside }}</span>
        <!-- 组件递归 -->
        <RightList :list="item.children" @select="handleClick"/>
    </li>
  </ul>
</template>

<script>
export default {
    name:"RightList", //递归组件要加上name属性，才能在自己里面使用自己
    props:{
        // [ {name:"xxx", isSelect:true, children:[ {name:"yyy", isSelect:false} ]} ]
        // 嵌套数据采用组件递归（自己用自己）
        list:{
            type:Array,
            //默认值是数组或对象的情况下，得把它写成函数，函数的返回值是这个对象或数组
            default: () => []
        }
    },
    methods:{
        handleClick(item){
            if(!item.isSelect){
                this.$emit("select", item)
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/var.less");
.right-list-container {
    list-style: none;
    padding: 0;
    .right-list-container{
        margin-left: 1em;
    }
    li{
        min-height: 40px;
        line-height: 40px;
        cursor: pointer;
        font-size: 14px;
    }
    .active{
        color: @warn;
        font-weight: bold;
    }
}
.aside{
 font-size: 12px;
 margin-left: 1em;
 color: @gray;
}
</style>