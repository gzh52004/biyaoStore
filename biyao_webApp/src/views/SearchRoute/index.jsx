import React, { Component } from "react";

import "./style.scss"; //引入自定义样式
import GoodList from "@/components/GoodsList"
import { inject_unount } from '@/utils/hoc'

@inject_unount
class SearchRoute extends Component {

    state = {
        searchQuery: '',
    }

    UNSAFE_componentWillMount() {
        const { search } = this.props.location;
        // 存在查询条件
        if (search) {
            const query = search.slice(7);
            this.setState({
                searchQuery: query
            })
        }
    }
    render() {
        return (
            <div className='SearchRoute'>
                <GoodList searchQuery={this.state.searchQuery} />
            </div>
        )
    }
}


export default SearchRoute;