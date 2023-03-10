//导出指令的配置对象

//通过js动态绑定时，需要导入来获取最新链接
import loadingUrl from "@/assets/loading.svg"
import style from "@/directives/loading.module.less"

//得到el中loading效果的img元素
function getLoadingImage(el){
    return el.querySelector("img[data-role = loading]")
}

function createLoadingImg(){
    const img = document.createElement('img');
    img.dataset.role = "loading";
    //通过js动态绑定时，需要导入来获取最新链接
    img.src = loadingUrl;
    img.className = style.loading;
    return img;
}

export default function(el, binding){
    // bind 和 update 时会调用这个函数
    // 根据 binding.value 的值来决定是否创建或删除img元素
    const curImg = getLoadingImage(el);  
    if(binding.value){
        if(!curImg){
            //判断是否已经有img元素，如果有就不创建了，防止多次创建
            const img = createLoadingImg();
            el.appendChild(img);
        }
    }else{
        if(curImg){
            curImg.remove();
        }
    }
}