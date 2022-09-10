import requests from "..";
// 获取热门歌单tag数据
export const reqGetHotTags = ()=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:'/playlist/hot',});
}

//对应tag获取歌单
export const reqGetHotMusicList = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/top/playlist?limit=10&cat=${data.cat}`,data});
}