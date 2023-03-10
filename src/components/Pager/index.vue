<template>
    <!-- 只有总页数大于1时才有显示的必要 -->
    <div class="pager-container" v-if="pageNumber > 1">
        <a @click="handleClick(1)" :class="{disabled: current === 1}">|&lt;&lt;</a>
        <a @click="handleClick(current - 1)" :class="{disabled: current === 1}">&lt;&lt;</a>
        <a @click="handleClick(n)"  v-for="(n,index) in number" :key="index" :class="{active: current===n}">{{ n}}</a>
        <a @click="handleClick(current + 1)" :class="{disabled: current === pageNumber }">&gt;&gt;</a>
        <a @click="handleClick(pageNumber)" :class="{disabled: current === pageNumber }">&gt;&gt;|</a>
    </div>
</template>


<script>
    export default{
        props:{
            current:{
                type:Number,
                default:1
            },
            total:{
                //总数据量
                type:Number,
                default:0
            },
            limit:{
                //每页里面可以有几条数据
                type:Number,
                default: 10
            },
            visibleNumber:{
                //页码条上最多可以看到多少个页码
                type:Number,
                default:10
            }
        },
        computed:{
            //总页数
            pageNumber(){
                return Math.ceil(this.total / this.limit)
            },
            visibleMin(){
                //显示页码条中最小的页码数字，同时保证current在中间
                let min = this.current - Math.floor(this.visibleNumber / 2)
                if(min < 1){
                    min = 1
                }
                return min
            },
            visibleMax(){
                //显示页码条中最大的页码数字，同时保证current在中间
                let max =  this.visibleMin + this.visibleNumber - 1
                if(max > this.pageNumber){
                    max = this.pageNumber
                }
                return max
            },
            number(){
                //存放页码的数组
                let pageNumberArr = []
                for(let i = this.visibleMin; i <= this.visibleMax; i++){
                    pageNumberArr.push(i)
                }
                return pageNumberArr
            }
        },
        methods:{
            handleClick(newPage){
                if(newPage <= 0){
                    newPage = 1
                }
                if(newPage > this.pageNumber){
                    newPage = this.pageNumber
                }
                if(this.current === newPage){
                    return
                }
                this.$emit("pageChange",newPage)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url("~@/styles/var.less");
    //  ~@ 表示src目录【样式写法】
    //  @ 表示src目录【js写法】
    .pager-container{
        display: flex;
        justify-content: center;
        margin:20px 0;
        a{
            color: @primary;
            margin: 0 6px;
            //默认鼠标样式
            cursor: pointer;
            &.disabled{
                color: @lightWords;
                cursor: not-allowed;
            }
            &.active{
                color: @words;
                font-weight: bold;
                cursor: text;
            }
        }
    }
</style>