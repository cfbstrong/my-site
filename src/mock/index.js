//负责导入mock所有的拦截规则
//在main.js中只需导入执行这个文件即可


import "./banner"; //相当于运行了拦截规则，运行了之后才能生效
import "./blog";
import "./setting";
import Mock from "mockjs";
import "./about";
import "./project";
import "./message";

Mock.setup({
    timeout:"1000-2000"
})