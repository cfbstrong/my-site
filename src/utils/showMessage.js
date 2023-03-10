import getComponentRootDom from "./getComponentRootDom"
import Icon from "@/components/Icon"
import styles from "@/utils/showMessage.module.less";

/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则显示到页面正中
 */
export default function(options = {}){
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;

    //创建消息元素
    const div = document.createElement('div');
    //拿到组件渲染出来的Dom ☆ 对象 ☆
    const IconDom = getComponentRootDom(Icon,{
        type,
    })
    div.innerHTML = `<span class="${styles.icon}">${IconDom.outerHTML}</span><div>${content}</div>`;
    //设置div的样式
    const typeClassName = `message-${type}` //类型样式名
    div.className = `${styles.message} ${styles[typeClassName]}`
    //将div加到容器container中
    
        //容器的position是否改动过
        if(options.container){
            //这里不能让body设置为relative，如果absolute没有找到包含块的话 那么就相对于整个网页进行定位
            if(getComputedStyle(container).position === "static"){
                container.style.position = "relative";
            }
        }
    
    container.appendChild(div); //未渲染

    //强制浏览器渲染
    div.clientHeight; //导致reflow重排 <状态1>

    // 浏览器渲染是异步的，会等js代码执行完才进行渲染，如果不强制进行渲染 那么就只有回归到正常位置的一个状态
    // 要形成过渡效果，一定需要有两种状态 状态1 --> 状态2 的过程(1s)


    //回归到正常位置 <状态2>
    div.style.opacity = 1;
    div.style.transform = "translate(-50%,-50%)";

    //等一段时间后 往上移动并消失 transition(1s) 状态2-->状态3
    setTimeout(()=>{
        div.style.transform = "translate(-50%,-50%) translateY(-25px)";
        div.style.opacity = 0;
        div.addEventListener("transitionend",function(){
            //运行回调函数
            if(options.callback){
                options.callback();
            }
            div.remove()
        },{once:true})
    },duration)
}