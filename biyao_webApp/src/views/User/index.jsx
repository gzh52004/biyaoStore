import React from "react";
import { Grid } from "antd-mobile";
import { withAuth } from "@/utils/hoc";
import { getUser, logOut } from "@/utils/auth.js";

import "./style.scss"; //引入自定义样式
import GoodList from "@/components/GoodsList";

let User = props => {
    // console.log(props);
    let { currentUser: username } = props;
    let dataList = [
        {
            icon: "/img/user/person_center_icon_order_all.png",
            text: "全部订单"
        },
        {
            icon: "/img/user/person_center_icon_order_pay.png",
            text: "待付款"
        },
        {
            icon: "/img/user/person_center_icon_order_receive.png",
            text: "待发货"
        },
        {
            icon: "/img/user/person_center_icon_order_receive.png",
            text: "待收货"
        },
        {
            icon: "/img/user/person_center_icon_order_evaluate.png",
            text: "待评价"
        },
        {
            icon: "/img/user/person_center_icon_order_refund.png",
            text: "退款 / 售后"
        },
        {
            icon: "/img/user/icon_address_location.webp",
            text: "收货地址"
        }
    ];
    let data = dataList.map(item => ({
        icon: item.icon,
        text: item.text
    }));

    let quit = () => {
        logOut();
        props.history.push("/home");
    };

    return (
        <div className="userWrap">
            <div className="contentTop">
                <div className="headercontent">
                    <div className="box1">
                        <span>
                            <img
                                src="/img/user/person_center_icon_order_pay.png"
                                alt="用户头像"
                            />
                        </span>
                        <h2>{username}</h2>
                    </div>
                    <div
                        className="box2"
                        onClick={() => {
                            quit();
                        }}
                    >
                        <i className="iconfont icon-tuichu"></i>
                        <span>退出</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="sub-title">
                    <span>我的主页</span>
                    <i>&gt;</i>
                </div>

                <div className="gridWrap">
                    <Grid
                        className="grid"
                        data={data}
                        isCarousel
                        activeStyle={{ backgroundColor: "#f5f5f9" }}
                        onClick={_el => console.log(_el)}
                    />
                </div>

                <GoodList />
            </div>
        </div>
    );
};
User = withAuth(User);
export default User;
