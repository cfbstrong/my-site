<template>
  <div class="carousel-item-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="carousel-img" :style="imagePosition" ref="image">
        <ImageLoader @load="showWords" :src="carousel.bigImg" :placeholder="carousel.midImg"/>
    </div>
    <div class="title" ref="title">
        {{ carousel.title }}
    </div>
    <div class="desc" ref="desc">
        {{ carousel.description }}
    </div>
  </div>
</template>

<script>
// CarouselItem组件负责呈现单张轮播图
import ImageLoader from "@/components/ImageLoader";

export default {
    components:{
        ImageLoader,
    },
    props:["carousel"],
    data(){
        return{
            titleWidth:0,
            descWidth:0,
            containerSize:null, //外层容器的尺寸
            innerSize:null, //内层图片的尺寸
            mouseX:0, //鼠标的横坐标
            mouseY:0, //鼠标的纵坐标
        }
    },
    mounted(){
        this.titleWidth = this.$refs.title.clientWidth;
        this.descWidth = this.$refs.desc.clientWidth;
        this.setSize();
        // 初始化图片在容器的正中间
        this.mouseX = this.center.x;
        this.mouseY = this.center.y;
        window.addEventListener("resize",this.setSize);
    },
    destroyed(){
        window.removeEventListener("resize",this.setSize)
    },
    computed:{
        //得到图片坐标
        imagePosition(){
            if(!this.innerSize || !this.containerSize){
                //元素未挂载上去 没有值
                return undefined;
            }
            const extraWidth = this.innerSize.width - this.containerSize.width; //极端情况下进行分析
            const extraHeight = this.innerSize.height - this.containerSize.height;
            const left = -extraWidth / this.containerSize.width * this.mouseX;
            const top = -extraHeight / this.containerSize.height * this.mouseY;
            return{
                // left: left + 'px',
                // top: top + 'px',
                //提高效率
                transform:`translate(${left}px, ${top}px)`
            }
        },
        center(){
            return{
                x: this.containerSize.width / 2,
                y:this.containerSize.height / 2,
            }
        }
    },
    methods:{
        showWords(){
            //调用该方法来显示文字，//显示文字，同时width设置为0 图片加载完成（load）后再调用这个方法显示文字
            this.$refs.title.style.opacity = 1;
            this.$refs.title.style.width = 0;
            //浏览器会等代码执行完再渲染，因此这里需要强制渲染一次 形成两个状态

            this.$refs.title.clientWidth; //强制渲染reflow
            this.$refs.title.style.transition = "2s";
            this.$refs.title.style.width = this.titleWidth + 'px';

            //描述
            this.$refs.desc.style.opacity = 1;
            this.$refs.desc.style.width = 0;
            //浏览器会等代码执行完再渲染，因此这里需要强制渲染一次 形成两个状态

            this.$refs.desc.clientWidth; //强制渲染reflow
            this.$refs.desc.style.transition = "3s 2s";
            this.$refs.desc.style.width = this.descWidth + 'px';
        },
        setSize(){
            this.containerSize = {
            width: this.$refs.container.clientWidth,
            height: this.$refs.container.clientHeight,
         };
            this.innerSize = {
            width: this.$refs.image.clientWidth,
            height: this.$refs.image.clientHeight,
         };
        },
        handleMouseMove(e){
            //给carousel-item-container注册鼠标移动事件

            //获取容器 相对于视口 的top left值
            const rect = this.$refs.container.getBoundingClientRect();

            //e.clientX获取鼠标相对于视口的位置
            this.mouseX = e.clientX - rect.left //获取鼠标相对于 容器 的位置X
            this.mouseY = e.clientY - rect.top //获取鼠标相对于 容器 的位置Y
        },
        handleMouseLeave(){
            //处理鼠标移出,图片又回到容器的正中间
            this.mouseX = this.center.x;
            this.mouseY = this.center.y;
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/var.less");
.carousel-item-container{
    width: 100%;
    height: 100%;
    background: @dark;
    color: #fff;
    position: relative;
    overflow: hidden;
    .carousel-img{
        width: 110%;
        height: 110%;
        position: absolute;
        left:0;
        top:0;
        // 防止鼠标刚移入时发生抖动
        transition: .3s;
    }
    .title, .desc{
        position:absolute;
        left:30px;
        color:#fff;
        letter-spacing: 3px;
        // 文字描边 当背景比较浅色时 可以防止文字看不清楚
        text-shadow: 1px 0 0 rgba(0,0,0,.5), -1px 0 0 rgba(0,0,0,.5),
        0 1px 0 rgba(0,0,0,.5), 0 -1px 0 rgba(0,0,0,.5);
        white-space: nowrap;
        overflow: hidden;
        //隐藏文字并拿到宽度
        opacity: 0;
    }
    .title{
        top:calc(50% - 40px);
        font-size: 2em;
    }
    .desc{
        top:calc(50% + 20px);
        font-size: 1.2em;
        color: lighten(@gray, 20%);
    }
}


//文字逐渐显现效果：
// 由于wdith： 0-->auto 不能形成过渡效果， 但是 0--> 固定宽度 可以形成过渡效果
// 又因为文字是由服务器传过来的 我们事先并不知道有多宽，因此我们要获取Dom元素来获取宽度width.
</style>