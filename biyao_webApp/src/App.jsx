import React from "react"; //React.createElement()，用组件的地方都需要引用；
import { Route, Redirect, Switch, withRouter, NavLink } from "react-router-dom";
// React-router4 提供了导航功能的组件；安装npm install react-router-dom -D

import "antd-mobile/dist/antd-mobile.css";
import "@/assets/sass/common.scss";

import Home from "@/views/Home";
import Classify from "@/views/Classify";
import Cart from "@/views/Cart";
import User from "@/views/User";
import Login from "@/views/Login";
import Reg from "@/views/Reg";
import List from "@/views/List";
import Details from "@/views/Details";
import "./App.scss";

@withRouter
class App extends React.Component {
    state = {
        // 配置一级路由表
        route: [
            {
                text: "首页",
                path: "/home",
                name: "home",
                component: Home
            },
            {
                text: "分类",
                path: "/classify",
                name: "classify",
                component: Classify
            },
            {
                text: "购物车",
                path: "/cart",
                name: "cart",
                component: Cart
            },
            {
                text: "我的",
                path: "/user",
                name: "user",
                component: User
            },
            {
                text: "注册",
                path: "/reg",
                name: "reg",
                component: Reg
            },
            {
                text: "登录",
                path: "/login",
                name: "login",
                component: Login
            },
            {
                text: "商品列表",
                path: "/list",
                name: "list",
                component: List
            },
            {
                text: "商品详情",
                path: "/details",
                name: "details",
                component: Details
            }
        ],

        //底部导航栏
        menu: [
            {
                text: "首页",
                path: "/home",
                name: "home",
                component: Home,
                icon: "iconfont icon-home2"
            },
            {
                text: "分类",
                path: "/classify",
                name: "classify",
                component: Classify,
                icon: "iconfont icon-fenlei"
            },
            {
                text: "购物车",
                path: "/cart",
                name: "cart",
                component: Cart,
                icon: "iconfont icon-cart"
            },
            {
                text: "我的",
                path: "/user",
                name: "user",
                component: User,
                icon: "iconfont icon-wode"
            }
        ]
    };

    render() {
        const { route, menu } = this.state;

        let currPath = this.props.location.pathname.split("/")[1];
        // console.log(currPath);
        return (
            <div className="App">
                {/* 根据哈西值判断是否显示底部导航栏：商品列表，商品详情页不显示 */}
                {currPath != "details" && currPath != "list" ? (
                    <nav>
                        <ul className="tabbar-container">
                            {menu.map(item => (
                                <NavLink
                                    to={item.path}
                                    activeStyle={{ color: "#d70057" }}
                                    key={item.name}
                                    replace
                                >
                                    <li className="tabbar-item tabbar-action ">
                                        <i className={item.icon}></i>
                                        {item.name == "cart" ? (
                                            <b className="cartNum">0</b>
                                        ) : null}
                                        <div className="tabbar-itemtitle">
                                            {item.text}
                                        </div>
                                    </li>
                                </NavLink>
                            ))}
                        </ul>
                    </nav>
                ) : null}
                <Switch>
                    {route.map(item => {
                        return (
                            <Route
                                key={item.name}
                                path={item.path}
                                component={item.component}
                            />
                        );
                    })}
                    <Route
                        path="/notfound"
                        render={() => {
                            <div>404</div>;
                        }}
                    />
                    <Redirect from="/" to="/home" exact />
                    <Redirect to="/notfound" />
                </Switch>
            </div>
        );
    }
}

export default App;
