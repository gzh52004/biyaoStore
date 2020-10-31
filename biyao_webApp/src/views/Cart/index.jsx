import React, { useState, useEffect, useMemo } from "react";
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { withAuth } from "@/utils/hoc";

import None from "./child/none"
import "./style.scss"; //引入自定义样式


let Cart = (props) => {
    let [i, change] = useState(JSON.parse(localStorage.getItem("goods")));
    console.log(i, "最初的")
    let allcheck = i.every((val) => val.check == true)
    let [isallcheck, transform] = useState(allcheck)

    if (i == null) {
        return <None></None>
    } else {
        const totalPrice = useMemo(function () {
            //计算总价格
            let z = i.filter((item) => item.check == true)
            console.log(z, 585858)
            const total = z.reduce((prev, item) => prev + item.num * item.price, 0)
            return total
        }, [i])
        // useEffect(function () {
        //     //didmao //didupdata
        //     console.log(1)
        // })
        console.log(props)
        console.log(isallcheck, "新的全选")
        console.log(i, "最新的i")
        // console.log(i, 7788)
        return (
            <div className="cart">
                <div className="head">
                    <h5 onClick={() => {
                                    props.history.go(-1)
                                }}><img src="/img/back.png" alt="" /></h5>
                    <div className="shopcart"><p>购物车</p></div>
                </div>
                {
                    i.map((item, idx) => {
                        return (
                            <div className="showList" key={idx}>
                                <input type="checkbox" onChange={() => { }} checked={item.check} onClick={() => {
                                    item.check = !item.check;
                                    allcheck = i.every((val) => val.check == true)
                                    console.log(allcheck)
                                    transform(allcheck);
                                    change([...i])
                                }} />
                                <h3 ><img src={item.src} alt="" /></h3>
                                <div className="describe">
                                    <p>{item.text}</p>
                                    <div className="d_choose">已选:<span className="color">{item.color}</span>{item.size}</div>
                                    <div className="dddd">
                                        <span className="d_money">￥{item.price}</span>
                                        <span className="d_add">x{item.num}</span>
                                    </div>
                                </div>
                                <div className="tri">
                                    <span onClick={() => {
                                        if (item.num <= 2) {
                                            item.num = 1
                                        } else {
                                            item.num--
                                        }
                                        change([...i])
                                        localStorage.setItem("goods", JSON.stringify(i))
                                        //    change(newgoods)
                                    }}>-</span>
                                    <span className="show_middle">{item.num}</span>
                                    <span onClick={() => {
                                        item.num++;
                                        change([...i])
                                        localStorage.setItem("goods", JSON.stringify(i))
                                    }}>+</span>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="foot">
                    <div className="all">
                        <input type="checkbox" onChange={() => { }} checked={isallcheck} onClick={() => {

                            i.map((item) => {
                                item.check = !isallcheck
                            })

                            transform(!isallcheck);

                            // localStorage.setItem("goods", JSON.stringify(i))
                            change([...i])
                        }} /><p>全选</p>
                    </div>
                    <div className="total">
                        合计:{totalPrice}.00
                        <WingBlank>
                            <Button type="warning" inline size="small" style={{ marginRight: '4px' }}>结算</Button><WhiteSpace />
                        </WingBlank>

                    </div>
                </div>
            </div>
        );
    }

};

Cart = withAuth(Cart);
export default Cart;
