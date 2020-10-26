import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import goodsApi from '@/api/goodsApi'
import './style.scss'//引入自定义样式


import Female from '@/views/List/Female';
import BeautyMakeup from '@/views/List/BeautyMakeup';
import Underwear from '@/views/List/Underwear';
import Male from '@/views/List/Male';
import Boot from '@/views/List/Boot';
import InfantMom from '@/views/List/InfantMom';

class List extends Component {
    state = {
        // 导航跳转
        navList: [
            {
                text: '女装',
                path: '/list/1',
                name: 'Female',
                component: Female
            },
            {
                text: '美妆',
                path: '/list/2',
                name: 'BeautyMakeup',
                component: BeautyMakeup
            },
            {
                text: '内衣配饰',
                path: '/list/3',
                name: 'Underwear',
                component: Underwear
            },
            {
                text: '男装',
                path: '/list/4',
                name: 'Male',
                component: Male
            },
            {
                text: '鞋靴',
                path: '/list/5',
                name: 'Boot',
                component: Boot
            },
            {
                text: '母婴',
                path: '/list/6',
                name: 'InfantMom',
                component: InfantMom
            },
        ],

    }

    render() {
        const { navList } = this.state;
        return (
            <div className='list'>
                <nav>
                    <ul>
                        {
                            navList.map(item =>
                                <NavLink key={item.name} to={item.path} activeClassName="active">
                                    {item.text}
                                </NavLink>)
                        }
                    </ul>
                </nav>
                <hr />
                <div className='content'>
                    <Switch>
                        {
                            navList.map((item) => {
                                return <Route key={item.name} path={item.path} component={item.component} />
                            })
                        }
                        <Redirect from='/list' to='list/1' />
                    </Switch>
                </div>


            </div>
        )
    }
}

// async UNSAFE_componentWillMount() {
//     // 获取数据
//     try {
//         const { data } = await goodsApi.getGoodsinf('5f96afcbb1eccbfdb5d7608b');
//         const newList = data.data[0].goodsClassify;
//         this.setState({
//             classifyList: newList
//         });
//     } catch (err) {
//         throw new Error('出错了', err);
//     }

// }

/* 
    {
        classify: '女装',
        type: '裙装上装',
        typeName: '羊绒羊毛衫',
        imgUrl: '/imges/classify/female/rBACW18rlJiABn8_AAgHTsEORK8792_360x360.jpg'
    },
*/
export default List;
