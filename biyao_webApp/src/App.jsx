import React from 'react';//React.createElement()，用组件的地方都需要引用；
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';// React-router4 提供了导航功能的组件；安装npm install react-router-dom -D

import 'antd-mobile/dist/antd-mobile.css';
import '@/assets/sass/common.scss';

import Home from '@/views/Home';
import List from '@/views/List';
import Cart from '@/views/Cart';
import User from '@/views/User';
import Login from '@/views/Login';
import Reg from '@/views/Reg';

class App extends React.Component {
    state = {
        // 配置一级路由表
        menu: [
            {
                text: '首页',
                path: '/home',
                name: 'home',
                component: Home,
            },
            {
                text: '分类',
                path: '/list',
                name: 'list',
                component: List
            },
            {
                text: '购物车',
                path: '/cart',
                name: 'cart',
                component: Cart,
            },
            {
                text: '我的',
                path: '/user',
                name: 'user',
                component: User,
            },
            {
                text: '注册',
                path: '/reg',
                name: 'reg',
                component: Reg,
            },
            {
                text: '登录',
                path: '/login',
                name: 'login',
                component: Login,
            },
        ],
    };


    render() {
        const { menu } = this.state;
        return (
            <div>
                <Switch>
                    {
                        menu.map((item) => {
                            return <Route key={item.name} path={item.path} component={item.component} />
                        })
                    }
                    <Route path='/notfound' exact render={() => { <div>404</div> }} />
                    <Redirect from='/' to='/home' exact />
                    <Redirect to='/notfound' />
                </Switch>
            </div>
        )
    }
}

export default App;