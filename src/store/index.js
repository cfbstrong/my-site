import Vue from "vue";
import { Store, install } from "vuex";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";

if(!window.Vuex){
    install(Vue);
}

const store = new Store({
    modules:{
        banner,
        setting,
        about,
        project,
    },
    strict:true,
})


export default store;