import React from 'react';
import "./label.scss";

class TabExample extends React.Component {
  constructor() {
    super();
    //改变this指向
    this.Update = this.Update.bind(this)
    this.windowOnScroll = this.windowOnScroll.bind(this)
    this.windowOnScroll();
  }
  state = {
    data: [
      {
        num: 1,
        text: "商品",
      },
      {
        num: 2,
        text: "详情",
      },
      {
        num: 3,
        text: "评价",
      }
    ],
    currindex: "",
    contentClass: "",
    position: "",
    top: "",
  }
  //赋值currindex且高亮
  Update(id) {
    console.log("id=", id)
    this.setState({
      currindex: id
    })
    setTimeout(() => {
      console.log("currindex=", this.state.currindex)
    }, 100)
  };

  //吸顶
  windowOnScroll() {
    let timer = null;
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //console.log(this,8888)
      // console.log(scrollTop)
      
      // 节流模式
      clearInterval(timer)
      timer = setTimeout(() => {
        if (scrollTop > 346) {
          this.setState({
            contentClass: "flex",
            position: "fixed",
            top: "0"
          })
        }
         else {
          this.setState({
            contentClass: "none",
            position: "",
            top: ""
          })
        }
        console.log(1)
      }, 20);
    }
  }

  render() {
    console.log(this.state.currindex, 7788);
    let { data, contentClass, position, top } = this.state
    return (
      <div>
        <ul style={{ display: `${contentClass}`, position: `${position}`, top: `${top}` }}>
          {
            data.map((item) => {
              return <li key={item.num} onClick={this.Update.bind(null, item.num)} > <a className={this.state.currindex === item.num ? "active" : ""}>{item.text}</a></li>
            })
          }
        </ul>
      </div>
    )
  }
}




export default TabExample

