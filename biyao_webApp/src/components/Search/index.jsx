import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import './style.scss'//引入自定义样式

@withRouter
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
        this.props.history.push({
            pathname: '/search',
            search: '?query=' + val,
        })
        this.setState({
            value: ''
        })
    }

    render() {
        return (
            <div className='Search'>
                <SearchBar
                    defaultValue={this.state.value}
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