import React from "react";
import { withRouter } from "react-router-dom";
import "./none.scss"



let none = function (props) {
    // console.log(props)
    return (
        <div id="none">
            <div className="cart">
                <div className="head">
                    <h5 style={{ display: 'flex' }}
                        onClick={() => {
                            // props.history.go(-1)
                            props.history.push('/home')
                        }}
                    >
                        {/* <img src="/img/back.png" alt="" /> */}
                        <i style={{ margin: 'auto' }}> <span className="iconfont icon-home2"></span></i>
                    </h5>
                    <div className="shopcart"><p>购物车</p></div>
                </div>
            </div>
            <div className="gold">
                <h1><img src="/img/空.jpg" alt="" /></h1>
                <div className="air">你的车很空😭</div>
            </div>

        </div>

    )

}
none = withRouter(none);
export default none;