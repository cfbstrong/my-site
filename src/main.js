import "@/mock"; //相当于运行了所有mock拦截规则，运行之后才能生效
import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from "@/router"
import store from "@/store"
import showMessage from '@/utils/showMessage'
import VLoading from '@/directives/loading'
import Vlazy from "@/directives/lazy"
import "./eventBus";

// import "./api/banner" 调试使用

store.dispatch("setting/fetchSetting") //全局网站设置在一开始就需要获取出来

Vue.config.productionTip = false
Vue.prototype.$showMessage = showMessage; //组件实例上可以直接使用 this.$showMessage 调用该函数弹出消息，不用再import进行导入
Vue.directive("loading", VLoading) //注册全局指令
Vue.directive("lazy", Vlazy) //注册全局指令

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')




//测试mock数据
// import * as blogApi from "@/api/blog";
// blogApi.getBlogTypes().then(r=>console.log(r))
// blogApi.getBlogs(2,30,-1).then(r=>console.log(r))
// blogApi.getBlog(2).then((r)=>{
//   console.log(r);
// })
// blogApi.postComment({
//   nickname:"小灰灰",
//   content:"给作者打call",
//   blogId:"123"
// }).then((r)=>{
//   console.log(r)
// })

// blogApi.getComments('123123').then((r)=>{
//   console.log(r)
// })
// import {getSetting} from "./api/setting";
// getSetting().then((r)=>{
//   console.log(r);
// })

// import {getAbout} from "./api/about";
// getAbout().then((r)=>{console.log(r);})

// import {getMessages} from "./api/message";
// getMessages().then((r)=>{console.log(r);})