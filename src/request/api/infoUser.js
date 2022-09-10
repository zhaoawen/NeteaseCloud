import requests from "..";
// 获取用户资料
export const reqGetUser = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/user/detail?uid=${data}`});
}
// 获取用户创建的歌单
export const reqGetUserCreateSongs = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/user/playlist?uid=${data.userId}&timestamp=${data.timestamp}`});
}
// 获取粉丝列表
export const reqGetUserFollowed = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/user/followeds?uid=${data}`});
}

// 获取关注列表
export const reqGetUserFollow = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/user/follows?uid=${data}`});
}
// 关注或者取消关注用户
export const reqGetUserConcern = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/follow?id=${data.id}&t=${data.type}`});
}