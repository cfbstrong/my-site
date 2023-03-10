import {getProjects} from "@/api/project";

export default {
    namespaced:true,
    state:{
        loading:false,
        data:[]
    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload;
        },
        setData(state,payload){
            state.data = payload;
        }
    },
    actions:{
        async fetchProject(context){
            if(context.state.data.length){
                return;
            }
            context.commit("setLoading",true);
            const resp = await getProjects();
            context.commit("setData",resp);
            context.commit("setLoading",false)
        }
    }
}