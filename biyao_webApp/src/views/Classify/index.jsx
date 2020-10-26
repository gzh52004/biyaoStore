import React, { Component } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";

import goodsApi from "@/api/goodsApi";
import "./style.scss"; //引入自定义样式

import Female from "@/views/Classify/Female";
import BeautyMakeup from "@/views/Classify/BeautyMakeup";
import Underwear from "@/views/Classify/Underwear";
import Male from "@/views/Classify/Male";
import Boot from "@/views/Classify/Boot";
import InfantMom from "@/views/Classify/InfantMom";

class Classify extends Component {
    state = {
        // 导航跳转
        navClassify: [
            {
                text: "女装",
                path: "/classify/1",
                name: "Female",
                component: Female
            },
            {
                text: "美妆",
                path: "/classify/2",
                name: "BeautyMakeup",
                component: BeautyMakeup
            },
            {
                text: "内衣配饰",
                path: "/classify/3",
                name: "Underwear",
                component: Underwear
            },
            {
                text: "男装",
                path: "/classify/4",
                name: "Male",
                component: Male
            },
            {
                text: "鞋靴",
                path: "/classify/5",
                name: "Boot",
                component: Boot
            },
            {
                text: "母婴",
                path: "/classify/6",
                name: "InfantMom",
                component: InfantMom
            }
        ]
    };

    render() {
        const { navClassify } = this.state;
        return (
            <div className="classify">
                <nav>
                    <ul>
                        {navClassify.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                activeClassName="active"
                            >
                                {item.text}
                            </NavLink>
                        ))}
                    </ul>
                </nav>
                <hr />
                <div className="content">
                    <Switch>
                        {navClassify.map(item => {
                            return (
                                <Route
                                    key={item.name}
                                    path={item.path}
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

// async UNSAFE_componentWillMount() {
//     // 获取数据
//     try {
//         const { data } = await goodsApi.getGoodsinf('5f96afcbb1eccbfdb5d7608b');
//         const newClassify = data.data[0].goodsClassify;
//         this.setState({
//             classifyClassify: newClassify
//         });
//     } catch (err) {
//         throw new Error('出错了', err);
//     }

// }

/* 
    {
        classify: '女装',
        type: '裙装上装',
        typeName: '羊绒羊毛衫',
        imgUrl: '/imges/classify/female/rBACW18rlJiABn8_AAgHTsEORK8792_360x360.jpg'
    },
*/
export default Classify;
