import requests from "..";
// 获取首页的轮播图
export const reqGetBanner = ()=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:'/banner?type=2',});
}

// 获取发现好歌单
export const reqGetMusicList = ()=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:'/personalized?limit=10',});
}

// 获取每日推荐
export const reqGetRecommendMusic = ()=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:'/recommend/songs'});
}

// 每日推荐歌单
export const reqGetRecommend = ()=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:'/recommend/resource'});
}

// 获得私人FM
export const reqGetPersonalFM = ()=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:'/personal_fm'});
}