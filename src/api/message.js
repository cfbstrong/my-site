import request from "@/api/request";

export async function getMessages(page = 1, limit = 10){
    return await request.get("/api/message", {
        params:{
            page,
            limit
        }
    })
}

export async function postMessage(msgInfo){
    return await request.post("/api/message", {
        data:{
            msgInfo,
        }
    })
}