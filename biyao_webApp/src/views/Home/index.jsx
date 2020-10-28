import React from "react";
import { Button } from "antd-mobile";

import "./style.scss"; //引入自定义样式
import userApi from "@/api/userApi";

const Home = function () {
    // 测试法请求
    const test = () => {
        userApi
            .getUser()
            .then(res => {
                console.log("成功", res);
            })
            .catch(err => {
                throw new Error("出错了", err);
            });
    };

    return (
        <div>
            Home
            <Button type="primary" size="small" onClick={test}>
                测试发送请求
            </Button>
        </div>
    );
};

export default Home;
