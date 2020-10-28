import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import { getUser, logOut } from "@/utils/auth.js";

// 获取用户信息的高阶组件，函数组件方式，功能和上方函数组件一样；
function withUser(MyComponent) {
    // 返回一个新组件OuterComponent，其的返回值是传入的参数组件
    return function OuterComponent(props) {
        // 获取本地存储信息
        let currentUser = getUser();
        // console.log("currentUser：", currentUser);

        // 新组件OuterComponent的返回值，如果是Router,会丢失history,location,match；需要手动添加{...props}
        return <MyComponent {...props} currentUser={currentUser} />; //使用了该高阶组件，this.props.currentUser即可访问currentUser
    };
}

// 用户访问权限高阶组件，这种方式通用性强，函数组件和类组价都能用；
// 【注】这里采用了两个高阶的组件的省略写法，如果不理解可自行书写单个的高阶组件方法(把withUser(OuterComponent)去掉，把其return加在class，在书写获取用户信息的代码)；
function withAuth(InnerComponent) {
    // 返回一个新组件
    class OuterComponent extends React.Component {
        render() {
            //  使用了withUser高阶组件，包装OuterComponent组件，根据this.props.currentUser判断用户是否登录
            const {
                currentUser,
                location: { pathname }
            } = this.props; //location:{pathname},表示：this.props.location.pathname
            if (currentUser) {
                // 用户登录后显示内容
                // console.log("user");
                return <InnerComponent {...this.props} />;
            } else {
                // 没有登录,从定向去/login?targetUrl=
                // console.log("login");
                return <Redirect to={"/login?targetUrl=" + pathname} />;
            }
        }
    }
    // 使用了withUser高阶组件，包装OuterComponent组件，则可以this.props.currentUser即可访问currentUser
    return withUser(OuterComponent);
}

// 反向继承，只能适用于封装类组件，但是可操作性强：拦截生命周期、states、渲染过程等
// 【注】这里采用了两个高阶的组件的省略写法，如果不理解可自行书写单个的高阶组件方法(把withUser(OuterComponent)去掉，把其return加在class，在书写获取用户信息的代码)；
function withClassAuth(InnerComponent) {
    // 返回一个新组件
    // @withUser
    class OuterComponent extends InnerComponent {
        /* 
        // 当返回新组件体内的拥有的方法函数和传入参数组件体内的方法同名时，只会执行返回新组件体内的拥有的方法函数
        componentDidMount() {
            console.log('OuterComponent.componentDidMount')
            // 这时候我们需要手动添加同名方法
            super.componentDidMount();//super继承的就是InnerComponent
        } 
        */
        render() {
            //  使用了withUser高阶组件，包装OuterComponent组件，根据this.props.currentUser判断用户是否登录
            if (this.props.currentUser) {
                // 用户登录后显示内容
                return super.render(); //手动添加
            } else {
                // 没有登录
                return <Redirect to="/login" />;
            }
        }
    }
    // 使用了withUser高阶组件，包装OuterComponent组件，则可以this.props.currentUser即可访问currentUser
    return withUser(OuterComponent);
    // return OuterComponent;
}

export { withUser, withAuth, withClassAuth };
