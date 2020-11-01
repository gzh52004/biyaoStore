import React from "react";
import { Carousel, List, WingBlank, Toast, WhiteSpace, Button } from 'antd-mobile';
import RenderTabBar from "./child/label.jsx";
import goods from "../../api/goodsApi"
import "./style.scss"; //引入自定义样式

class Details extends React.Component {
    constructor() {
        super();

    }
    state = {
        data:null,
        imgHeight: 176,
        popup: 'none',
        lock: "true",
        retreat: "none",
        currIdx: 0,// 修改获得数据，改变显示图片
        currl: null,//尺码选框高亮
        lsize: "",
        currcolor: null, //颜色框高亮
        lcolor: null,
        number: 1,//购买数目变化
        i: [],
        check: true
    }
    //弹出购物选项框
    popup() {
        this.setState({
            popup: "block"
        })
    }
    //隐藏购物选项框
    hide() {
        this.setState({
            popup: "none"
        })
    }
    //弹出服务说明框
    retreat() {
        this.setState({
            retreat: "block"
        })
    }
    //隐藏服务说明框
    outretreat() {
        this.setState({
            retreat: "none"
        })
    }
    //修改传入的图片，显示在单独购买隐藏框的商品图片
    xiugai(id, item) {
        // console.log(item)
        this.setState({
            currIdx: id,
            currcolor: id,
            lcolor: item
        })
    }
    //隐藏框的尺码框高亮
    highlight(id, item) {
        // console.log(item)
        this.setState({
            currl: id,
            lsize: item,
        })
    }
    //增加购买数量
    add() {
        this.setState({
            number: this.state.number + 1
        })
    }
    //减少购买数量
    minus() {
        if (this.state.number <= 1) {
            this.setState({
                number: 1
            })
        } else {
            this.setState({
                number: this.state.number - 1
            })
        }
    }
    //储存选择的商品数据
    storage(src, color, size, num, text, price, check) {
        if (size && color) {
            let arrData = JSON.parse(localStorage.getItem("goods"));
            // console.log("arrData:", arrData);
            let arr1;
            if (!arrData) {
                arr1 = [];
            } else {
                arr1 = arrData;
            }

            let arr2 = [
                { check, src, color, size, num, text, price }
            ];

            //把arr2合并到arr1，并返回新数据dataList
            let dataList = arr2.reduce((pre, cur) => {
                //find返回第一个符合条件的元素
                let target = pre.find(pre => {
                    //判断条件（要修改的地方）
                    if (pre.src == cur.src && pre.size == cur.size) {
                        //相同sku,size则数量添加
                        cur.num = cur.num + pre.num;
                        // console.log("sameSrc:", 111)
                        return true;
                    }
                });
                if (target) {
                    //相同则合并
                    Object.assign(target, cur);
                } else {
                    //不同则添加
                    pre.unshift(cur);
                }
                return pre;
            }, arr1);

            //dataList 是结果数据
            // console.log("dataList:", dataList);


            if (localStorage.getItem("goods")) {
                this.state.i = JSON.parse(localStorage.getItem("goods"));
                // this.state.i.push({ check, src, color, size, num, text, price })
                console.log(1)
            } else {
                console.log(this.state.i)
                // this.state.i.push({ check, src, color, size, num, text, price })
                console.log(2)
            }
            // this.state.i.push({src,color,size,num,text,price})
            localStorage.setItem("goods", JSON.stringify(dataList))
            setTimeout(() => {
                this.props.history.push("/cart")
            }, 20)
        } else {
            // console.log(size && color)
            return Toast.info('请选择颜色和尺码！！', 1);

        }

    }
    //生命周期
    componentWillMount() {
        goods.getGoods(null,{id:this.props.match.params.id}).then(res => {
            // console.log("data", res)
            this.setState({
                data: res.data.data
            })
        }).catch(err => {
            console.log("err", err)
        })
        // console.log(1)
    }
    render() {
        let { popup, retreat } = this.state
        let{ data} = this.state;
        data = data ? data[0] :data;
        let currType = data ? data.size[this.state.currIdx] :'' ;// 修改
        return (
            <div className="details">
                {
                    data ? 
                    <>
                    <RenderTabBar />
                    <WingBlank style={{ margin: "0" }}>
                        <Carousel
                            autoplay={false}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {data.banner.map((val,idx) => (
    
                                <img
                                    key={idx}
                                    id='A1'
                                    src={`${val}`}
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
                    <div className="price">
                        <span>￥{data.price}</span>
                        <h1 >{data.text1}</h1>
                        <h3>{data.text2}</h3>
                    </div>
                    <div className="retreat">
                        <ul className="retreat_u" onClick={() => {
                            this.retreat()
                        }}>
                            <li>&radic;7天无忧退货</li>
                            <li>&radic;先行赔付</li>
                            <li>&radic;超时赔偿</li>
                            <li>&radic;顺丰包邮</li>
                        </ul>
                    </div>
                    <div id="A2">
                        <div className="detail">
                            {
                                data.dl.map((item, index) => {
                                    return (
                                        <dl key={index}>
                                            <dt>{item.dt}</dt>
                                            <dd>{item.dd}</dd>
                                        </dl>
                                    )
                                })
                            }
                        </div>
                        <div className="photo">
                            {
                                data.detalis.map((item, index) => {
                                    return <img src={item} key={index} className="photo_1" />
                                })
                            }
                        </div>
                    </div>
    
                    <div className="retreat_d" style={{ display: `${retreat}` }}>
                        <div className="retreat_dt" >
                        </div>
                        <div className="retreat_db">
                            <div className="a">服务说明</div>
                            <div className="b">
                                <div className="ba">&radic;7天无忧退货</div>
                                <div className="bb">根据国家七天无理由退货规范，为您办理退货退款，具体退货政策见商品详情页。</div>
                            </div>
                            <div className="b">
                                <div className="ba">&radic;先行赔付</div>
                                <div className="bb">争议可申诉，申诉成功，立即退款。</div>
                            </div>
                            <div className="b">
                                <div className="ba">&radic;超时赔偿</div>
                                <div className="bb">未按承诺时间发货，系统自动赔付（赔款金额为订单商品金额的30%，上限500元）。</div>
                            </div>
                            <div className="b">
                                <div className="ba">&radic;顺丰包邮</div>
                                <div className="bb">运费由商家承担。</div>
                            </div>
                            <div className="confirm" onClick={() => {
                                this.outretreat()
                            }}>确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</div>
                        </div>
                    </div>
    
                    <div style={{ display: `${popup}` }} className="popup">
                        <div className="popup_top">
    
                        </div>
                        <div className="popup_under">
                            <div onClick={() => {
                                this.hide()
                            }} className="XX">❌</div>
                            <img src={currType.src} alt="" className="" />
                            <div className="coin">
                                <span className="coin_price">￥{data.price}</span>
                                <div className="coin_goods">
                                    已选：{this.state.lcolor}{this.state.lsize}
                                </div>
                                <br />
                            </div>
                            <div className="choose">
                                <h3>颜色：</h3>
                                <div className="choose1">{data.size.map((item, idx) => {
                                    return (
                                        <div key={idx} onClick={() => {
                                            this.xiugai(idx, item.color)
                                        }
                                        } className={this.state.currcolor === idx ? "active" : ""}>
                                            <span >{item.color}</span>
                                        </div>
    
                                    )
                                })}</div>
                                <br />
    
    
                                <div className="choose2">
                                    <h3>尺码：</h3>
                                    <div className="choose2a">
                                        {currType.sizes.map((item, index) => {
                                            return (
                                                <div key={index} onClick={() => {
                                                    this.highlight(index, item)
                                                }} className={this.state.currl === index ? "active" : ""}>
                                                    <span>{item}</span>
                                                </div>
                                            )
                                        })}</div>
                                </div>
                                <div className="amount">
                                    <h3 >购买数量:</h3>
                                    <div className="amount_choose">
                                        <span onClick={() => {
                                            this.minus()
                                        }} >-</span>
                                        <span className="middle">{this.state.number}</span>
                                        <span onClick={
                                            () => {
                                                this.add()
                                            }
                                        }>+</span>
                                    </div>
                                </div>
                            </div>
    
    
                            <div className="popup_b">
                                <span onClick={() => {
                                    this.storage(currType.src, 
                                        this.state.lcolor, 
                                        this.state.lsize, 
                                        this.state.number, data.text1, 
                                        data.price, 
                                        this.state.check)
                                }}>加入购物车</span>
                                <span className="buy">立即购买</span>
                            </div>
                        </div>
                    </div>
    
                    <div className="bottom"></div>
                    <footer>
                        <div>
                            <span className="service">购物车</span>
                            <span onClick={() => {
                                this.popup()
                            }} className="alone">单独购买{data.price}</span>
                        </div>
                    </footer>
                    </>
                    : ''
                }
            </div>
        );
    }

}


export default Details;
