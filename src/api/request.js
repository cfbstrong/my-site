import axios from "axios";
import showMessage from "@/utils/showMessage";

const ins = axios.create(); //创建一个axios的实例
ins.interceptors.response.use(function(resp){
    //凡是通过 ☆这个实例☆ 发出的请求，其返回的响应都会在这里被拦截
    if(resp.data.code === 0){
        return resp.data.data;
    }else{
        showMessage({
            content:resp.data.msg,
            type:"error",
            duration:1500,
        })
        return null;//这里return的数据会被getBanner拿到
    }
})

export default ins;