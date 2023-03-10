import request from "@/api/request";

export async function getProjects(){
    return await request.get("/api/project")
}   