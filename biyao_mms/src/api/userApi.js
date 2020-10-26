// 引入封装的axios
import request from "@/utils/request"; //后缀是js可以省略

//功能：验证用户是否存在：存在就不给注册
// 【注】get请求需要放在params对象里面； params: { username,},
function checkname(username) {
    return request.get("/user/checkname", {
        params: {
            username,
        },
    });
}

//功能：注册功能
function reg(username, password) {
    return request.post("/user/reg", {
        username,
        password,
    });
}

// 功能：登录
function login(username, password) {
    return request.get("/user/login", {
        params: {
            username,
            password
        },
    });
}

// 功能：获取单个用户信息       findquery是'{user:xxx}'
function getuser(findquery) {
    return request.get("/user/list", {
        params: {
            page: 1,
            pagesize: 20,
            findquery,
            // sortquery,
        },
    });
}

// 功能：验证token       
function checktoken(token) {
    return request.get("/user/verify", {
        params: {
            token,
        },
    });
}

// 功能：修改用户地址信息       
function edit(id, addList) {
    return request.put("/user/edit/" + id, {
        addList,
    });
}

// 功能：修改用户地址信息       
function editCart(id, cartList) {
    return request.put("/user/edit/" + id, {
        cartList,
    });
}




export default {
    checkname,
    reg,
    login,
    getuser,
    checktoken,
    edit,
    editCart,
};
