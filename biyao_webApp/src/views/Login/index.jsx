import React from "react";
import SHA256 from "crypto-js/sha256";
import { Form, Input, Button, Checkbox, message } from "antd";
// import request from "@/utils/request";
import userApi from "@/api/userApi";
import { getUser, setToken, setUser } from "@/utils/auth";
import "./style.scss"; //引入自定义样式

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 }
};

const rules = {
    username: [{ required: true, message: "用户名不能为空" }],
    password: [{ required: true, message: "密码不能为空" }]
};
const Login = props => {
    // console.log("Login.props", props);

    let username = props.location.state ? props.location.state.username : "";
    // console.log("username:", username);
    const onFinish = async values => {
        // console.log("加密前=", values);
        // 把密码通过Crypto进行加密（加密算法：sha256）
        let { username, password, remember } = values;
        password = SHA256(values.password).toString();
        // console.log("加密后=", password);

        const { data } = await userApi.login(username, password);
        // console.log(data);
        if (data.code == 1) {
            // data.username = username;
            if (values.remember) {
                //保存7天
                setToken(data.token, 7);
                setUser(username, 7);
            } else {
                //会话级别:关掉浏览器就没有了
                setToken(data.token, 7);
                setUser(username, 7);
            }
            message.success("登录成功");
            // 提取目标地址
            const { search } = props.location;
            const pathname = search.match(/targetUrl\=([\/\w\-]+)/);
            let targetUrl;
            if (pathname) {
                targetUrl = pathname[1];
            }
            console.log("targetUrl", targetUrl);
            props.history.push({
                pathname: targetUrl || "/user"
            });
        } else {
            message.error("用户名或密码错误");
        }
    };
    return (
        <div className="loginWrap">
            <h2 style={{ backgroundImage: "url('/img/user/topBg.png')" }}>
                <span>用户登录</span>
                <i
                    onClick={() => {
                        props.history.push("/home");
                    }}
                >
                    &nbsp;&nbsp;&lt;&nbsp;&nbsp;
                </i>
            </h2>
            <br />
            <br />
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    initialValue={username}
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
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>

                <Form.Item
                    // {...tailLayout}
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>七天内免登陆</Checkbox>
                </Form.Item>
            </Form>
            <p>
                <span>忘记密码</span>
                <span
                    onClick={() => {
                        props.history.push("/reg");
                    }}
                >
                    快速注册
                </span>
            </p>
        </div>
    );
};

export default Login;
