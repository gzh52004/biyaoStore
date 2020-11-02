import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss"; //引入自定义样式

class TabBar extends React.Component {
    render() {
        const { routes, path } = this.props;
        //商品列表页，详情页隐藏TabBar
        return path == "list" ||
            path == "details" ||
            path == "login" ||
            path == "cart" ||
            path == "reg" ? null : (
            <nav>
                <ul className="tabbar-container">
                    {routes.map(item => (
                        <NavLink
                            to={item.path}
                            activeStyle={{ color: "#d70057" }}
                            key={item.name}
                            replace
                        >
                            <li className="tabbar-item tabbar-action ">
                                <i className={item.icon}></i>
                                {item.name == "cart" ? (
                                    // <b className="cartNum">0</b>
                                    null
                                ) : null}
                                <div className="tabbar-itemtitle">
                                    {item.text}
                                </div>
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default TabBar;
