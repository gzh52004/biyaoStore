import React, { Component } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import { Flex } from 'antd-mobile';

import goodsApi from "@/api/goodsApi";
import "./style.scss"; //引入自定义样式

import ClassifyChild from "@/views/Classify/ClassifyChild";

class Classify extends Component {
    state = {
        // 导航跳转
        navClassify: [
            {
                text: "女装",
                path: "/classify/1",
                name: "Female",
                component: ClassifyChild
            },
            {
                text: "美妆",
                path: "/classify/2",
                name: "BeautyMakeup",
                component: ClassifyChild
            },
            {
                text: "内衣配饰",
                path: "/classify/3",
                name: "Underwear",
                component: ClassifyChild
            },
            {
                text: "男装",
                path: "/classify/4",
                name: "Male",
                component: ClassifyChild
            },
            {
                text: "鞋靴",
                path: "/classify/5",
                name: "Boot",
                component: ClassifyChild
            },
            {
                text: "母婴",
                path: "/classify/6",
                name: "InfantMom",
                component: ClassifyChild
            }
        ]
    };

    render() {
        const { navClassify } = this.state;
        return (
            <div className="classify">
                <nav>
                    <Flex direction='column'>
                        {navClassify.map(item => (
                            <Flex.Item key={item.name}>
                                <NavLink
                                    to={item.path}
                                    activeClassName="active"
                                >
                                    {item.text}
                                </NavLink>
                            </Flex.Item>
                        ))}
                    </Flex>
                </nav>

                <div className="content">
                    <Switch>
                        {navClassify.map(item => {
                            return (
                                <Route
                                    key={item.name}
                                    path="/classify/:id"
                                    component={item.component}
                                />
                            );
                        })}
                        <Redirect from="/classify" to="classify/1" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Classify;
