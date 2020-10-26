// 入口文件
import React from 'react';
import { render } from 'react-dom';//ReactDOM.render
import { HashRouter, BrowserRouter } from 'react-router-dom';// 路由组件，路由模式：开发下用(HashRouter),上线用(BrowserRouter)

// 定义路由模式
let Router = process.env.NODE_ENV === "development" ? HashRouter : BrowserRouter;

//自定义APP组件 
import App from './App'

render(
    /* 我们在入口文件使用路由模式(开发下HashRouter)包囊，等同于作用于全部的组件了 */
    <Router>
        <App />
    </Router>
    ,
    document.querySelector('#app')
)