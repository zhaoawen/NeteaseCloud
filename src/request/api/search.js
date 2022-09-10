import requests from "..";
// 搜索歌
export const reqSearchMusic = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:`/search?keywords=${data}`,});
}



