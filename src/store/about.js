import {getAbout} from "@/api/about";

export default {
    namespaced: true,
    state:{
        loading: false,
        data:""
    },
    mutations:{
        setLoading(state, payload){
            state.loading = payload 
        },
        setData(state, payload){
            state.data = payload
        }
    },
    actions:{
        async fetchAbout(context){
            if(context.state.data){
                //当有数据时就别再次请求了
                return;
            }
            context.commit("setLoading", true);
            const resp = await getAbout();
            context.commit("setData", resp);
            context.commit("setLoading", false);
        }
    }
}