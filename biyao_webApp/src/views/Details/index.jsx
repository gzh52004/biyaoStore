import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import RenderTabBar from "./child/label.jsx"
import './style.scss'//引入自定义样式

class Details extends React.Component {
    constructor() {
        super();
        
        let isScrollTop = true;
    }
    state = {
        data: ['cccc', 'xxxx', 'zzzz'],
        imgHeight: 176,
        
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['cccc', 'xxxx', 'zzzz'],
            });
        }, 100);
    }
  

    render() {
        
        return (
            <div>
                <RenderTabBar />
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (

                            <img
                                src={`../img/${val}.jpg`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />

                        ))}
                    </Carousel>
                </WingBlank>

                <div style={{ height: "1000px" }}></div>
                <footer>
                    <div>
                        <span className="service">购物车</span>
                        <span>新人购买</span>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Details;