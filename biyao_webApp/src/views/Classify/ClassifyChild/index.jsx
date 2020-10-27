import React, { Component } from 'react';
import { Grid } from 'antd-mobile';

import goodsApi from "@/api/goodsApi";
import "./style.scss"; //引入自定义样式

class ClassifyChild extends Component {

    state = {
        title: '',
        dataList: [
            // 分类
            {
                type: '',
                // 分类里面的每一个
                typeArr: []
            },
        ]
    }

    // 功能：展示的标题
    showTitle(Id) {
        let { id } = this.props.match.params;
        let initTitle = null;
        switch (Id || id) {
            case '1':
                initTitle = '女装';
                break;
            case '2':
                initTitle = '美妆'
                break;
            case '3':
                initTitle = '内衣配饰'
                break;
            case '4':
                initTitle = '男装'
                break;
            case '5':
                initTitle = '鞋靴'
                break;
            case '6':
                initTitle = '母婴'
                break;
        }
        this.setState({
            title: initTitle,
        })
    }

    // 功能：获取数据
    async initData(id) {
        await this.showTitle(id)
        let { title } = this.state;
        try {
            const { data } = await goodsApi.getGoodsinf('5f97e82eb1eccbfdb5d765ea');
            let allData = data.data[0].goodsClassify;
            // 筛选同一classify数据
            let newData = allData.filter(item =>
                item.classify === title
            )
            // 得到重复的type数组
            let typeArr = [];
            for (let i = 0; i < newData.length; i++) {
                typeArr.unshift(newData[i].type)
            }
            // 得到去重的Set数据
            let setArr = new Set(typeArr);
            // 解构得到去重了的type数组；
            let newArr = [...setArr]
            // 定义新的分类数组
            let newTypeArr = [];
            newArr.map(mapItem => {
                newTypeArr.unshift({
                    type: mapItem,
                    typeArr: newData.filter(item =>
                        item.type === mapItem
                    )
                })
            })
            // 筛选同一type数据
            this.setState({
                dataList: newTypeArr
            });
        } catch (err) {
            throw new Error('出错了', err);
        }

    }

    // 路由监听.有问题，先用着
    listen = this.props.history.listen((location, type) => {
        let result = location.pathname.includes('/classify/')
        if (result) {
            // 会在全局环境上监听，跳到哪，就显示哪
            this.initData(location.pathname[10]);
        }
    });


    UNSAFE_componentWillMount() {
        // 获取数据
        this.initData();
    }

    render() {
        let { title, dataList } = this.state;
        return (
            <div className="ClassifyChild">
                <div className="title">
                    <span>一</span>
                    {title}
                    <span>一</span>
                </div>
                {
                    dataList.map(item =>
                        < div key={item.type}>
                            <div className="typeWrap">
                                <div>{item.type}</div>
                                <div>
                                    <i>更多</i>
                                </div>
                            </div>
                            <div className='main'>
                                {
                                    <Grid data={item.typeArr} columnNum={3} hasLine={false}
                                        renderItem={dataItem => (
                                            <div className='contentWrap'>
                                                <img src={dataItem.imgUrl} alt='' />
                                                <div >
                                                    <span>{dataItem.typeName}</span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

}



export default ClassifyChild;

