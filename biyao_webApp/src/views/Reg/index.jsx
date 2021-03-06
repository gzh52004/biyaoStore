import React from "react";
import SHA256 from "crypto-js/sha256";
import { Form, Input, Button, Checkbox, message } from "antd";
// import request from "@/utils/request";
import userApi from "@/api/userApi";
import "./style.scss"; //引入自定义样式

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 }
};

const rules = {
    username: [
        { required: true, message: "用户名不能为空" },
        { pattern: /^[0-9a-zA-Z_]{5,12}$/, message: "请输入5~12位数字或字母" },
        {
            async validator(rule, value) {
                if (!value) {
                    return;
                }
                // 根据输入的用户名校验用户名是否被占用
                const { data } = await userApi.checkName(value);
                // console.log(data);
                if (data.code == 1) {
                    return Promise.resolve();
                }
                return Promise.reject("用户名已存在");
            }
        }
    ],
    password: [
        { required: true, message: "密码不能为空" },
        {
            pattern: /^[0-9a-zA-Z_]{6,18}$/,
            message: "请输入6~18位数字或字母。"
        }
    ]
};
const Reg = props => {
    // console.log("Login.props", props);
    const onFinish = async values => {
        // 注册
        // console.log("加密前=", values);
        values.password = SHA256(values.password).toString();
        // console.log("加密后=", values);

        const { data } = await userApi.reg(values.username, values.password);
        // console.log(data);
        if (data.code == 1) {
            message.success("注册成功");
            props.history.push({
                pathname: "/login",
                state: { username: values.username }
            });
        } else {
            message.error("注册失败");
        }
    };
    return (
        <div className="loginWrap">
            <h2 style={{ backgroundImage: "url('/img/user/topBg.png')" }}>
                <span>免费注册</span>
                <i
                    onClick={() => {
                        props.history.push("/home");
                    }}
                >
                    &nbsp;&nbsp;&lt;&nbsp;
                </i>
            </h2>
            <br />
            <div className="loginWrap">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={rules.username}
                        hasFeedback
                        className="formItem"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={rules.password}
                        className="formItem"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                    // {...tailLayout}
                    >
                        <div className="box1">
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </div>
                    </Form.Item>

                    <Form.Item
                    // {...tailLayout}
                    // name="remember"
                    // valuePropName="checked"
                    >
                        * 点击注册代表同意《必要软件隐私声明》
                    </Form.Item>
                </Form>
                <p>
                    <span></span>
                    <span
                        onClick={() => {
                            props.history.push("/login");
                        }}
                    >
                        已有账号，去登录
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Reg;
