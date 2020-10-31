// 引入封装的axios
import request from "@/utils/request"; //后缀是js可以省略


// 获取商品信息 proxy 跨域;
// 功能：获取单个用户信息       findquery是'{user:xxx}'
function getComment(findquery) {
    return request.get("/comment/list", {
        params: {
            page: 1,
            pagesize: 1000,
            findquery: findquery, // sortquery,
        }
    });
}


export default {
    getComment
};