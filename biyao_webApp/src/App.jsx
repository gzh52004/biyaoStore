import React, { Suspense, lazy } from "react";//通过 `React.lazy()` 与 `import()` 实现组件的懒加载（需要安装`@babel/plugin-syntax-dynamic-import`进行支持）
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
// React-router4 提供了导航功能的组件；安装npm install react-router-dom -D
import "antd-mobile/dist/antd-mobile.css";
import "@/assets/sass/common.scss";
import TabBar from "@/components/TabBar";
import "./App.scss";

const Home = lazy(() => import("@/views/Home"));
const Classify = lazy(() => import("@/views/Classify"));
const Cart = lazy(() => import("@/views/Cart"));
const User = lazy(() => import("@/views/User"));
const Login = lazy(() => import("@/views/Login"));
const Reg = lazy(() => import("@/views/Reg"));
const List = lazy(() => import("@/views/List"));
const Details = lazy(() => import("@/views/Details"));
const Notfound = lazy(() => import("@/views/Notfound"));
const SearchRoute = lazy(() => import("@/views/SearchRoute"));

// import Home from "@/views/Home";
// import Classify from "@/views/Classify";
// import Cart from "@/views/Cart";
// import User from "@/views/User";
// import Login from "@/views/Login";
// import Reg from "@/views/Reg";
// import List from "@/views/List";
// import Details from "@/views/Details";
// import Notfound from "@/views/Notfound";
// import SearchRoute from "@/views/SearchRoute";


class App extends React.Component {
    state = {
        // 配置一级路由表，isNav: true 会渲染在底部导航栏
        routes: [
            {
                text: "首页",
                path: "/home",
                name: "home",
                component: Home,
                isNav: true,
                icon: "iconfont icon-home2"
            },
            {
                text: "分类",
                path: "/classify",
                name: "classify",
                component: Classify,
                isNav: true,
                icon: "iconfont icon-fenlei"
            },
            {
                text: "购物车",
                path: "/cart",
                name: "cart",
                component: Cart,
                isNav: true,
                icon: "iconfont icon-cart"
            },
            {
                text: "我的",
                path: "/user",
                name: "user",
                component: User,
                isNav: true,
                icon: "iconfont icon-wode"
            },
            {
                text: "注册",
                path: "/reg",
                name: "reg",
                component: Reg,
                isNav: false
            },
            {
                text: "登录",
                path: "/login",
                name: "login",
                component: Login,
                isNav: false
            },
            {
                text: "商品列表",
                path: "/list",
                name: "list",
                component: List,
                isNav: false
            },
            {
                text: "商品详情",
                path: "/details/:id",
                name: "details",
                component: Details,
                isNav: false
            },
            {
                text: "搜索页面",
                path: "/search",
                name: "search",
                component: SearchRoute,
                isNav: false
            },
            {
                text: "404",
                path: "/notfound",
                name: "notfound",
                component: Notfound,
                isNav: false
            }
        ]
    };

    render() {
        const { routes } = this.state;
        //路由地址监听
        const currPath = this.props.location.pathname.split("/")[1];
        const tabbarRoutes = routes.filter(route => route.isNav === true);
        return (
            <div className="App">
                {/* 给底部导航栏TabBar传参 */}
                <TabBar routes={tabbarRoutes} path={currPath} />
                <Suspense fallback={<div>loading...</div>}>
                    <Switch>
                        {routes.map(item => {
                            return (
                                <Route
                                    key={item.name}
                                    path={item.path}
                                    component={item.component}
                                />
                            );
                        })}
                        <Route path="/notfound" component={Notfound} />
                        <Redirect from="/" to="/home" exact />
                        <Redirect to="/notfound" />
                    </Switch>
                </Suspense>
            </div >
        );
    }
}

export default withRouter(App);
