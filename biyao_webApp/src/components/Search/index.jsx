import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';

import './style.scss'//引入自定义样式
import goodsApi from "@/api/goodsApi";
class Search extends Component {

    state = {
        value: '',
    };

    // 高频事件
    onChange = (value) => {
        this.setState({ value });
    };


    // 点击搜索和案件搜索 // {name:/xxx/i}
    onSubmit(val) {
        let reg = new RegExp(val)
        console.log(reg)
        // goodsApi.getGoods()
        //     .then(res => console.log(res))
        //     .catch(err => {
        //         throw new Error('出错了' + err)
        //     })
        // this.setState({
        //     value: ''
        // })
    }

    render() {
        return (
            <div className='Search'>
                <SearchBar
                    value={this.state.value}
                    placeholder="请输入您想要的商品"
                    cancelText='搜索'
                    onSubmit={value => this.onSubmit(value)}
                    onCancel={value => this.onSubmit(value)}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export default Search;