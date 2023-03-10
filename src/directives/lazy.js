import eventBus from "@/eventBus";
import deBounce from "@/utils/deBounce";
import imageUrl from "@/assets/default.gif";
//调用该函数，就会显示出当前用户看到的地方的图片，而其他用户暂时没看到的图片先不加载

let imgs = [] //只需要存储当前页面上的图片即可

function setImage(img){
    img.dom.src = imageUrl; //先暂时使用着默认图片
    //没有处理过，处理图片（已处理：看一下需不需要显示）
    const clientHeight = document.documentElement.clientHeight;
    const rect = img.dom.getBoundingClientRect();
    //由于图片一开始还没加载出来，此时它还没有高度没有出现在视口内，如果加载出来了，有高度之后又会出现在视口内
    //因此我这里给一个最小高度150
    const height = rect.height || 150;
    if(rect.top >= -height && rect.top <= clientHeight){
        //在视口范围内
        const tempImg = new Image();
        tempImg.src = img.src
        tempImg.onload = function(){
            //当真实图片加载完成时
            img.dom.src = img.src
        }
        imgs = imgs.filter((i)=>{
            //删除当前处理完的这张图片
            return i !== img
        })
        // console.log(img.src,"不在视口范围内");
    }

}

function setImages() {
    //从数组中找到哪些图片该显示，哪些不该显示
    for(const img of imgs){
        //处理单张图片
        setImage(img)
    }
}

function handleScroll(){
    setImages();
}

eventBus.$on("mainScroll", deBounce(handleScroll,100))

export default {
    inserted(el, bindings){
        //这里调用了10次，因为v-for有10张图片
        const img = {
            dom:el,
            src:bindings.value,
        }
        imgs.push(img)
        //立即看一下需不需要显示
        setImage(img)
    },
    unbind(el){
        //指令与元素解绑时调用,即切换页面或者页码时的情况
        imgs = imgs.filter((img)=>{
            //留下与解绑元素无关的图片
            return img.dom !== el
        })
    }   
}