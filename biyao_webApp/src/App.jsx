import React from "react"; //React.createElement()，用组件的地方都需要引用；
import { Route, Redirect, Switch, withRouter, NavLink } from "react-router-dom";
// React-router4 提供了导航功能的组件；安装npm install react-router-dom -D

import "antd-mobile/dist/antd-mobile.css";

import Home from "@/views/Home";
import List from "@/views/List";
import Cart from "@/views/Cart";
import User from "@/views/User";
import Login from "@/views/Login";
import Reg from "@/views/Reg";
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
                path: "/list",
                name: "list",
                component: List
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
                text: "登录",
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
                path: "/list",
                name: "list",
                component: List,
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
        return (
            <div className="tabBarWrap">
                {/* 根据哈西判断是否显示底部导航栏 */}
                {currPath != "details" ? (
                    <nav>
                        <ul className="tabbar-container">
                            {menu.map(item => (
                                <NavLink
                                    to={item.path}
                                    activeStyle={{ color: "#7f4395" }}
                                    key={item.name}
                                >
                                    <li className="tabbar-item tabbar-action ">
                                        <i className={item.icon}></i>
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
                        exact
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
