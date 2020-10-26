// 引入封装的axios
import request from "@/utils/request"; //后缀是js可以省略

// request == axios
// 调用方式，导出至某一个vue组件文件，执行接口函数；

// 获取商品信息 proxy 跨域;
// 功能：获取单个用户信息       findquery是'{user:xxx}'
function getGoods(findquery) {
    return request.get("/goods/list", {
        params: {
            page: 1,
            pagesize: 1000,
            findquery: findquery, // sortquery,
        }
    });
}

export default {
    getGoods
};
