import React, { Component } from "react";

import GoodList from "@/components/GoodsList";
import "./style.scss"; //引入自定义样式

class List extends Component {

    state = {
        navList: [
            '羊绒羊毛衫',
            '针织衫',
            '连衣裙',
            '衬衫/雪纺',
            'T恤',
            '卫衣',
            '风衣/大衣',
            '外套马甲',
            '皮衣皮革',
            '羽绒服/棉衣',
            '休闲裤',
            '牛子裤',
            '半身裙',
            '短裤',
            '孕妇装',
        ],
    }

    render() {
        const { navList, navStyle } = this.state;
        return (
            <div className='List'>
                <div className='title'>
                    <i onClick={() => this.props.history.push('/home')}>首页</i>
                    女装
                </div>
                <div className='select '>
                    <div className='classify'>
                        <ul>
                            {
                                navList.map(item =>
                                    <li key={item}>
                                        {item}
                                    </li>)
                            }
                        </ul>
                    </div>
                </div>
                <GoodList />
            </div>
        )
    }
}
export default List;
