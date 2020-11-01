import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import goodsApi from "@/api/goodsApi";
import "./style.scss"; //引入自定义样式
import { inject_unount } from '@/utils/hoc'

@inject_unount
@withRouter
class GoodList extends Component {

    state = {
        // 数据
        dataList: [],
        // 是否展示
        isShow: { display: "none" },
        // 价格排序
        priceIsSort: true,
        // 查询条件
        searchQuery: '',
    }

    // 功能：获取数据
    async initData(sortquery) {
        const { searchQuery } = this.state;
        try {
            //  findquery是'{user:xxx}'
            const { data } = await goodsApi.getGoods(sortquery, searchQuery ? searchQuery : { typeName: "衬衫/雪纺" });
            if (data.code) {
                // 查询成功
                let newdataList = data.data;
                this.setState({
                    dataList: newdataList
                });
            }
        } catch (err) {
            throw new Error('出错了', err);
        }

    }

    async UNSAFE_componentWillMount() {
        let search = {
            mainTitle: this.props.searchQuery
        }
        if (this.props.searchQuery) {
            await this.setState({
                searchQuery: search
            })
            // 获取数据 
            await this.initData();
        } else {
            // 获取数据
            this.initData();
        }

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        //滚动条滚动高度
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 100 && this.state.isShow.display !== 'flex') {
            this.setState({
                isShow: { display: "flex", }
            })
        } else if (scrollTop < 100 && this.state.isShow.display !== 'none') {
            this.setState({
                isShow: { display: "none", }
            })
        }
    }
    // 回到顶部
    goTop() {
        document.documentElement.scrollTop = 0;
    }

    // 热门排序
    hotSort() {
        this.initData({
            commentNum: -1
        });

    }

    // 价格排序
    priceSort() {
        let { priceIsSort } = this.state;
        this.initData({
            priceStr: priceIsSort ? -1 : 1
        });
        let newPriceIsSort = !priceIsSort;
        this.setState({
            priceIsSort: newPriceIsSort
        })
    }

    render() {
        const { dataList, isShow } = this.state;
        return (
            <div className='GoodList'>
                {
                    dataList.length ?
                        <>
                            <div className='sort'>
                                <ul>
                                    <li onClick={() => {
                                        this.hotSort()
                                    }}>
                                        热门
                            </li>
                                    <li onClick={() => {
                                        this.priceSort()
                                    }}>
                                        价格↑↓
                                    </li>
                                </ul>
                            </div>
                            <div className='contentWrap'>
                                {
                                    dataList.map(item =>
                                        <div
                                            key={item.mainTitle}
                                            className='singleContent'
                                            onClick={() => {
                                                this.props.history.push('/details/' + item.id)
                                            }}>
                                            <img src={'/img/classify/female/shirt/' + item.imageOrigin} alt='' />
                                            <dl>
                                                <dt>
                                                    ￥{item.priceStr}
                                                </dt>
                                                <dd className="subtitle">
                                                    {
                                                        item.subtitle.split("|")[0]
                                                    }
                                                </dd>
                                                <dd className="mainTitle">
                                                    {item.mainTitle}
                                                </dd>
                                                <dd className="commentNum">
                                                    {item.commentNum ? item.commentNum + '条评论' : '暂无评论'}
                                                </dd>
                                            </dl>
                                        </div>)
                                }
                            </div>
                        </>
                        : ''
                }

                <div className='goTop'
                    style={isShow}
                    onClick={() => {
                        this.goTop()
                    }}
                >
                    <img src="/img/goTop.png" alt="" />
                </div>
                {
                    this.props.searchQuery && dataList.length === 0 ? <div style={{ textAlign: "center" }}> 商品有限，您查询的商品不存在</div> : ''
                }
            </div>
        )
    }
}

export default GoodList;
