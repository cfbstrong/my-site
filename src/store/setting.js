import {getSetting} from "@/api/setting";
import {titleController} from "@/utils";

export default {
    namespaced:true,
    state:{
        loading:false,
        data:null,
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
        async fetchSetting(context){
            context.commit("setLoading", true);
            const resp = await getSetting();
            context.commit("setData",resp);
            context.commit("setLoading", false);
            if(resp.siteTitle){
                titleController.setSiteTitle(resp.siteTitle);
            }
        }
    }
}