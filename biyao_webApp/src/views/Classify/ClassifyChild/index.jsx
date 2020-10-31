import React, { Component } from 'react';

import goodsApi from "@/api/goodsApi";
import "./style.scss"; //引入自定义样式
import { inject_unount } from '@/utils/hoc'

let UNLISTEN;
@inject_unount
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
            const { data } = await goodsApi.getGoodsinf('5f9b8f1fb1eccbfdb5d7b4c7');
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

    // 数据挂载前
    UNSAFE_componentWillMount() {
        // 初始获取数据
        this.initData();
        // 使用路由监听的时后不要忘记解绑监听事件，不然会累积监听事件，监听事件的返回值是解绑函数；
        let oldpath = '1';
        UNLISTEN = this.props.history.listen((location, type) => {
            if (location.pathname.includes('/classify/') && location.pathname[10] !== oldpath) {
                this.initData(location.pathname[10]);
                oldpath = location.pathname[10];
            }
        });

    }

    componentWillUnmount() {
        UNLISTEN && UNLISTEN(); // 监听执行解绑
    }


    render() {
        let { title, dataList } = this.state;
        return (
            <div className="ClassifyChild">
                <div className="title">
                    <span>&nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;</span>
                    {title}
                    <span>&nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;</span>
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
                                    item.typeArr.map(typeItem =>
                                        <div
                                            key={typeItem.typeName}
                                            className='contentWrap'
                                            onClick={() => this.props.history.push('/list')}
                                        >
                                            <img src={typeItem.imgUrl} alt='' />
                                            <div >
                                                <span>{typeItem.typeName}</span>
                                            </div>
                                        </div>
                                    )
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

