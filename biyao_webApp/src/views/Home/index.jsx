import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

import './style.scss'//引入自定义样式
import GoodList from "@/components/GoodsList"
import Search from "@/components/Search"

class Home extends Component {
    state = {
        // 照片数据
        data: [
            'rBACVF-GuXSAJ1ikAABiRr_tye4342',
            'rBACVF-XevmAYffrAABL4LcJxRc476',
            'rBACW1-SjViAFItwAABDx6GYwTI528',
            'rBACW17HsPyASmdlAAAzEYDPHeU556',
            'rBACYV-GrLqAVBYyAABOVuRXtHI908',
            'rBACYV-GsfqAbRkeAABO8unAeq8028'
        ],
    }

    render() {
        return (
            <div className='Home'>

                <Search />

                <Carousel
                    autoplay={true}
                    infinite
                    style={{ touchAction: 'none' }}
                >
                    {this.state.data.map(item => (
                        <img
                            src={`/img/banner/${item}.jpg`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            key={item}
                        />
                    ))}
                </Carousel>

                <GoodList />
            </div>
        )
    }
}

export default Home;
