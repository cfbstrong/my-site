import request from "./request";

export async function getBanners (){
    //这里拿到的响应已经被拦截器处理过了,因此可以直接返回
    return await request.get("/api/banner");
}

// getBanners().then(r=>console.log(r)); 调试使用