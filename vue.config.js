// vue-cli的配置文件(在node环境中运行的因此用commonjs)

module.exports={
    devServer:{
        //devServe 开发服务器
        proxy:{
            "/api": {
                // 开发服务器代理解决跨域问题
                target:"http://rest.my-site.com",
            },
        },
    },
    configureWebpack: require("./webpack.config"),
}