import React from "react";
import { List, Toast, Button, InputItem as _InputItem } from "antd-mobile";
import { create, addErrorExplanation } from "ant-design-mobile-form";
// import "./App.css";
// import { createForm } from "rc-form";

const InputItem = addErrorExplanation(_InputItem);

const checkUser = (rule, value, callback) => {
    // check code
    if (value && value.length === 11) {
        callback();
    } else if (value.length === 0) {
        callback(new Error("请输入账号"));
    } else {
        callback(new Error("账号不合法"));
    }
};

class Login extends React.Component {
    handleSubmit = () => {
        this.props.form.validateFields(async (errors, value) => {
            if (errors === null) {
                Toast.success(JSON.stringify(value));
            }
        });
    };

    render = () => {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="container">
                <List>
                    {getFieldDecorator("phone", {
                        rules: [
                            {
                                required: true,
                                message: "请输入您的账号"
                            },
                            {
                                validator: checkUser
                            }
                        ]
                    })(<InputItem placeholder="账号" />)}

                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "请输入密码"
                            }
                        ]
                    })(<InputItem placeholder="密码" type="password" />)}
                </List>

                <Button
                    style={{ marginTop: 24 }}
                    onClick={this.handleSubmit}
                    type="primary"
                >
                    登录
                </Button>
            </div>
        );
    };
}

export default create()(Login);
