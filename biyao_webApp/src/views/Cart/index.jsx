import React from "react";
import { withAuth } from "@/utils/hoc";
import "./style.scss"; //引入自定义样式

let Cart = function () {
    return <div>Cart</div>;
};
Cart = withAuth(Cart);
export default Cart;
