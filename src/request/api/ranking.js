import requests from "..";
// 获取所有排行榜
export const reqGetRanking = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/toplist`,data});
}

// 传来的 id 查询歌单
export const reqGetRankingDetail = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/playlist/detail?id=${data.id}`,data});
}