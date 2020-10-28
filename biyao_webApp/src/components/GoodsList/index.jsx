import React, { Component } from "react";
import { Grid } from 'antd-mobile';

import goodsApi from "@/api/goodsApi";
import "./style.scss"; //引入自定义样式



class GoodList extends Component {

    state = {
        // 数据
        dataList: [],
        // 是否展示
        isShow: { display: "none" },
    }

    // 功能：获取数据
    async initData() {
        try {
            const { data } = await goodsApi.getGoods();
            let newdataList = data.data.slice(0, data.data.length - 1);
            this.setState({
                dataList: newdataList
            });
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

    render() {
        const { dataList, isShow } = this.state;
        return (
            <div className='GoodList'>
                <div className='sort'>

                </div>
                <div className='contentWrap'>
                    {
                        <Grid data={dataList}
                            columnNum={2}
                            activeStyle={false}
                            itemStyle={{ height: '20rem' }}
                            renderItem={dataItem => (
                                <div className='singleContent'>
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
                                        <dd className="thirdContent">
                                            {dataItem.thirdContent ? dataItem.thirdContent : '暂无评论'}
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
