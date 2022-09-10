import requests from "..";
// 手机号+登录登录
export const reqGetPhone = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/login/cellphone?phone=${data.phone}&password=${data.password}`});
}
// 手机号+验证码登录
export const reqGetPhoneCode = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/captcha/sent?phone=${data.phone}`});
}
// 验证码验证
export const reqSubmitPhoneCode = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/captcha/verify?phone=${data.phone}&captcha=${data.code}`});
}

//登录状态
export const reqLoginStatus = ()=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/login/status`});
}