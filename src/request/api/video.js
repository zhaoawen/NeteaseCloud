import requests from "..";
// 获取所有视频
export const reqGetVideos = () => {
    // 发请求:返回的是Promise对象
    return requests({ method: 'get', url: `/video/category/list` });
}

// 获取所有视频分类
export const reqGetVideosTags = () => {
    // 发请求:返回的是Promise对象
    return requests({ method: 'get', url: "/video/group/list" });
}

// 获取视频
export const reqGetVideosNum = (data) => {
    // 发请求:返回的是Promise对象
    return requests({ method: 'get', url: `/video/group?id=${data.id}&offset=${data.offset}`, data });
}


// 根据id获取视频
export const reqGetMVByID = (data) => {
    // 发请求:返回的是Promise对象
    return requests({ method: 'get', url: `/mv/detail?mvid=${data.mvid}`, data });
}

// 请求mv相关地址
export const reqGetMVAdress = (data) => {
    return requests({ method: 'get', url: `/mv/url?id=${data.id}`, data });
}

// 请求相关视频
export const reqGetRelatedVideo = (data) => {
    return requests({ method: 'get', url: `/related/allvideo?id=${data.id}`, data });
}


// 获取mv评论
export const reqGetMVCommit = (data) => {
    return requests({ method: 'get', url: `/comment/mv?id=${data.id}&offset=${data.offset}&timestamp=${data.timestamp}`, data })
}

// 获取播放地址
export const reqGetBofangAdress = (data) => {
    return requests({ method: 'get', url: `/video/url?id=${data.id}`, data });
}

// 获取视频详情
export const reqGetVideoDetail = (data) => {
    return requests({ method: 'get', url: `/video/detail?id=${data.id}`, data });
}

// 获取视频评论
export const reqGetVideoCommit = (data) => {
    return requests({ method: 'get', url: `/comment/video?id=${data.id}&offset=${data.offset}&timestamp=${data.timestamp}`, data });
}

// 请求用户收藏的视频列表
export const reqGetSubVideoList = (data) => {
    return requests({ method: 'get', url: `/mv/sublist?limit=${data.limit}&timestamp=${data.timestamp}`, data });
}

// 请求用户喜欢的视频列表
export const reqGetLikeVideoList = (data) =>{
    return requests({method:'get',url:`/playlist/mylike?limit=${data.limit}&timestamp=${data.timestamp}`,data});
}

// 用户发送评论
export const reqSendComment = (data) => {
    return requests({ method: 'get', url: `/comment?t=${data.t}&id=${data.id}&type=${data.type}&content=${data.content}`, data });
}

// 点赞某条评论
export const reqGreatComment = (data) => {
    return requests({ method: 'get', url: `/comment/like?id=${data.id}&cid=${data.cid}&t=${data.t}&type=${data.type}&timestamp=${data.timestamp}`, data });
}

// 用户向某一楼层发送评论
export const reqSendFloorComment = (data) => {
    return requests({ method: 'get', url: `/comment?t=${data.t}&id=${data.id}&type=${data.type}&content=${data.content}&commentId=${data.commentId}`, data });
}

// 收藏视频
export const reqGetSub = (data) =>{
    return requests({method:'get',url:`/video/sub?id=${data.id}&t=${data.t}`,data});
}

// 点赞视频
export const reqGetGreat = (data) =>{
    return requests({method:'get',url:`/resource/like?id=${data.id}&t=${data.t}&timestamp=${data.timestamp}`,data});
}