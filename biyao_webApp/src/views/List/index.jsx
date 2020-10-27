import React, { Component } from "react";
import { Grid } from 'antd-mobile';

import goodsApi from "@/api/goodsApi";
import "./style.scss"; //引入自定义样式

class List extends Component {

    state = {
        dataList: []
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


    render() {
        const { dataList } = this.state;
        return (
            <div className='List'>
                <div className='title'>
                    女装
                </div>
                <div className='select '>
                    <div className='classify'>
                        分类选择
                    </div>
                    <div className='sort'>
                        排序选择
                    </div>
                </div>
                <div className='contentWrap'>
                    {
                        <Grid data={dataList}
                            columnNum={2}
                            itemStyle={{ height: '309px' }}
                            renderItem={dataItem => (
                                <div className='singleContent'>
                                    <img src={'/img/classify/female/shirt/' + dataItem.imageOrigin} alt='' />
                                    <dl>
                                        <dt>
                                            ￥{dataItem.priceStr}
                                        </dt>
                                        <dd>
                                            {/* {dataItem.subtitle} */}
                                            XXX制造商
                                        </dd>
                                        <dd>
                                            {dataItem.mainTitle}
                                        </dd>
                                        <dd>
                                            {dataItem.thirdContent}
                                        </dd>
                                    </dl>
                                </div>
                            )}
                        />
                    }
                </div>
                <div className='goTop'></div>
            </div>
        )
    }
}
export default List;
