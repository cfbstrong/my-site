import "nprogress/nprogress.css";
import {start ,done, configure} from "nprogress";
import NotFound from "@/views/NotFound.vue";


configure({
    trickleSpeed:20,
    showSpinner:false,
})

function delay(duration){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },duration)
    })
}

function getPageComponent(PageCompResolver){
    return async () => {
        start();
        if(process.env.NODE_ENV === "development"){
            await delay(2000)
        }
        const comp = await PageCompResolver();
        done();
        return comp;
    }
}

export default [{
        name: "Home",
        path: "/",  
        //动态依赖
        component: getPageComponent(() => import(/* webpackChunkName: "home" */"@/views/Home")),
        meta: {
            title: "首页"
        }
    },
    {
        name: "Project",  
        path: "/project",
        component:  getPageComponent(() => import(/* webpackChunkName: "project" */"@/views/Project")),
        meta: {
            title: "项目&效果"
        }
    },
    {
        name: "About",
        path: "/about",
        component:  getPageComponent(() => import(/* webpackChunkName: "about" */"@/views/About")),
        meta: {
            title: "关于我"
        }
    },
    {
        name: "Blog",
        path: "/blog",
        component:  getPageComponent(() => import(/* webpackChunkName: "blog" */"@/views/Blog")),
        meta: {
            title: "文章"
        }
    },
    {
        name: "CategoryBlog",
        path: "/blog/cate/:categoryId",
        component:  getPageComponent(() => import(/* webpackChunkName: "blog" */"@/views/Blog")),
        meta: {
            title: "文章"
        }
    },
    {
        name: "Message",
        path: "/message",
        component:  getPageComponent(() => import(/* webpackChunkName: "message" */"@/views/Message")),
        meta: {
            title: "留言板"
        }
    },
    {
        name: "BlogDetail",
        path: "/blog/:id",
        component:  getPageComponent(() => import(/* webpackChunkName: "blogdetail" */"@/views/Blog/Detail")),
        meta: {
            title: "文章详情"
        }
    },
    {
        name:"NotFound",
        component:NotFound,
        path:"*" //前面都没匹配到 就一定到这里匹配
    }
]