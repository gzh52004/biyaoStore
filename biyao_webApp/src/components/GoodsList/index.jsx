import React, { Component } from "react";
import { Grid } from 'antd-mobile';
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
    }

    // 功能：获取数据
    async initData(findquery) {
        try {
            //  findquery是'{user:xxx}'
            const { data } = await goodsApi.getGoods(findquery, { typeName: "衬衫/雪纺" });
            let newdataList = data.data;
            this.setState({
                dataList: newdataList
            });
            // details
            console.log(newdataList)
        } catch (err) {
            throw new Error('出错了', err);
        }

    }

    UNSAFE_componentWillMount() {
        // 获取数据
        this.initData();
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
                            价格
                            <span></span>
                            <span></span>
                        </li>
                    </ul>
                </div>
                <div className='contentWrap'>
                    {
                        <Grid data={dataList}
                            columnNum={2}
                            activeStyle={false}
                            itemStyle={{ height: '20rem' }}
                            renderItem={dataItem => (

                                <div className='singleContent' onClick={() => {
                                    this.props.history.push('/details/' + dataItem.id)
                                }}>
                                    <img src={'/img/classify/female/shirt/' + dataItem.imageOrigin} alt='' />
                                    <dl>
                                        <dt>
                                            ￥{dataItem.priceStr}
                                        </dt>
                                        <dd className="subtitle">
                                            {
                                                dataItem.subtitle.split("|")[0]
                                            }
                                        </dd>
                                        <dd className="mainTitle">
                                            {dataItem.mainTitle}
                                        </dd>
                                        <dd className="commentNum">
                                            {dataItem.commentNum ? dataItem.commentNum + '条评论' : '暂无评论'}
                                        </dd>
                                    </dl>
                                </div>
                            )}
                        />
                    }
                </div>
                <div className='goTop'
                    style={isShow}
                    onClick={() => {
                        this.goTop()
                    }}
                >
                    <img src="/img/goTop.png" alt="" />
                </div>
            </div>
        )
    }
}

export default GoodList;
