import React from "react";
import "./label.scss";

class TabExample extends React.Component {
    constructor() {
        super();
        //改变this指向
        this.Update = this.Update.bind(this);
        this.windowOnScroll = this.windowOnScroll.bind(this);
        this.windowOnScroll();
    }
    state = {
        data: [
            {
                num: 1,
                text: "商品"
            },
            {
                num: 2,
                text: "详情"
            },
            {
                num: 3,
                text: "评价"
            }
        ],
        currindex: 1,
        contentClass: "none",
        position: "",
        top: ""
    };
    //赋值currindex且高亮
    Update(id) {
        this.setState({
            currindex: id
        });
        setTimeout(() => {
            // console.log("currindex=", this.state.currindex);
        }, 100);
    }

    //吸顶
    windowOnScroll() {
        let timer = null;
        window.onscroll = () => {
            let scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            //console.log(this,8888)
            // console.log(scrollTop)

            // 节流模式
            clearInterval(timer);
            timer = setTimeout(() => {
                if (scrollTop > 346) {
                    this.setState({
                        contentClass: "flex",
                        position: "fixed",
                        top: "0",
                        currindex: 2
                    });
                } else {
                    this.setState({
                        contentClass: "none",
                        position: "",
                        top: "",
                        currindex: 1
                    });
                }
                // console.log(1);
            }, 20);
        };
    }

    //锚点定位
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
        }
    }

    render() {
        // console.log(this.state.currindex, 7788);
        let { data, contentClass, position, top } = this.state;
        return (
            <div className="label">
                <ul
                    className="oUl"
                    style={{
                        display: `${contentClass}`,
                        position: `${position}`,
                        top: `${top}`
                    }}
                >
                    {data.map(item => {
                        return (
                            <li
                                className="oLi"
                                key={item.num}
                                onClick={this.Update.bind(null, item.num)}
                            >
                                {" "}
                                <a
                                    onClick={() => this.scrollToAnchor(`A${item.num}`)}
                                    className={
                                        this.state.currindex === item.num
                                            ? "active"
                                            : ""
                                    }
                                >
                                    {item.text}
                                </a>
                            </li>

                        );
                    })}
                </ul>

            </div>
        );
    }
}

export default TabExample;
