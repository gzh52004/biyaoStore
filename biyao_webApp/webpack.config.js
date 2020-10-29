const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入创建 html 页面的模块

module.exports = {
    // webpack的配置

    // 入口，分析项目的所有依赖，
    entry: "./src/main.jsx",

    //  出口，编译文件时候出口
    // output:{

    // },

    // 测试服务器，记得去package.json配置启动服务器的运行命令脚本：webpack-dev-server
    devServer: {
        // 配置服务器根目录
        contentBase: path.join(__dirname, "./public"), //拼接绝对路径
        port: 8888, //默认不写是 8080
        host: "10.3.140.152", //主机名， 本地：localhost     127.0.0.1， 真机 0.0.0.0，
        https: false, //协议
        open: true, //启动服务时自动打开浏览器访问
        //设置跨域代理
        proxy: {
            // 匹配 /dev-api 开头的请求     (/dev-api可以修改，不固定；)
            "/dev-api": {
                // 目标服务器, 代理访问到 https://localhost:8001
                target: "http://47.112.170.225:60001",
                // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
                // 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                changOrigin: true, //开启代理
                pathRewrite: {
                    // 会将 /dev-api 替换为 '',也就是 /dev-api 会移除，
                    // 如 /dev-api/db.json 代理到 https://localhost:8080/db.json
                    "^/dev-api": ""
                }
            }
        }
    },

    resolve: {
        // 路径别名
        alias: {
            "@": path.resolve("./src")
        },
        // 默认js文件可以省略，但是jsx不可省略，这里将jsx添加为默认扩展名
        extensions: [".js", ".jsx"]
    },

    // babel-loader加载器：作用是 编译文件，主要是编译成浏览器能识别的东西(.js/.css/.jpg/.png)【注】不同种的文件有不同的加载器
    module: {
        rules: [
            //rules数组里面，每一个对象就是一个加载器
            {
                test: /\.jsx?$/, //测验：编译js/jsx文件，正则。以.js结尾的文件
                //use是需要用到的加载器
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-react"], // 这是插件集合(蒋多个插件集合在一起的)；用于把JSX编译成React.createElement()
                            plugins: [
                                [
                                    "@babel/plugin-proposal-decorators",
                                    { legacy: true }
                                ],
                                [
                                    "@babel/plugin-proposal-class-properties",
                                    { loose: true }
                                ],
                                //antd，antd-mobile按需引入
                                [
                                    "import",
                                    {
                                        libraryName: "antd",
                                        libraryDirectory: "es",
                                        style: "css"
                                    },
                                    "antd"
                                ],
                                [
                                    "import",
                                    {
                                        libraryName: "antd-mobile",
                                        style: "css"
                                    },
                                    "adtd-mobile"
                                ]
                            ]
                            // @babel/plugin-proposal-class-properties箭头函数写法，
                            // @babel/plugin-proposal-decorators是ES7装饰器，需要配置插件legacy: true，写成数组
                        }
                    }
                ]
            },

            // css loader:css-loader + style-loader(放在head的style里)
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] //编译顺序是从右往左的顺序加载
            },
            // sass: sass-loader
            // sass->css->style
            // 需要下载node-sass插件；npm采用方式(先修改该模块下载源：npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass)
            // yarn采用方式(先修改该模块下载源：yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass)
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

    // 插件：plugins，用于生成html文件
    plugins: [
        new HtmlWebpackPlugin({
            // template是以什么为模板，生成html文件
            template: path.join(__dirname, "./public/index.html") //绝对路径可靠
            // filename:'home.html'//filename是最终生成的文件名，不写默认生成为为index.html
        })
    ]
};
