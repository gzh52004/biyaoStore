// 引入封装的axios
import request from "@/utils/request"; //后缀是js可以省略

// request == axios
// 调用方式，导出至某一个vue组件文件，执行接口函数；

// 获取商品信息 proxy 跨域;
// 功能：获取单个用户信息       findquery是'{user:xxx}'
function getGoods(sortquery, findquery) {

    // { findquery: { text: /t/ }, sortquery: {}, page: 1, pagesize: 20 }
    return request.get("/goods/list", {
        params: {
            page: 1,
            pagesize: 100,
            findquery,
            sortquery: sortquery ? sortquery : { id: -1 }
        }
    });
}


// 利用动态路由查询单个商品
function getGoodsinf(id) {
    return request.get("/goods/getgoodsinf/" + id);
}

export default {
    getGoods,
    getGoodsinf,
};
