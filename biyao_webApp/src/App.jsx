import React from "react"; //React.createElement()，用组件的地方都需要引用；
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
// React-router4 提供了导航功能的组件；安装npm install react-router-dom -D

import "antd-mobile/dist/antd-mobile.css";
import "@/assets/sass/common.scss";

import TabBar from "@/components/TabBar";
import Home from "@/views/Home";
import Classify from "@/views/Classify";
import Cart from "@/views/Cart";
import User from "@/views/User";
import Login from "@/views/Login";
import Reg from "@/views/Reg";
import List from "@/views/List";
import Details from "@/views/Details";
import Notfound from "@/views/Notfound";
import "./App.scss";

class App extends React.Component {
    state = {
        // 配置一级路由表，isNav: true为导航栏
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
                path: "/details",
                name: "details",
                component: Details,
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
        const currPath = this.props.location.pathname.split("/")[1];
        const tabbarRoutes = routes.filter(route => route.isNav === true);
        // console.log(tabbarRoutes);
        return (
            <div className="App">
                <TabBar routes={tabbarRoutes} path={currPath} />
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
            </div>
        );
    }
}

export default withRouter(App);
