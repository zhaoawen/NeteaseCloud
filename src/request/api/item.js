import requests from "..";
// 获取歌单详情页的数据
export const reqGetMusicItemList = (data)=>{
    return requests({method:'get',url:`/playlist/detail?id=${data.id}`})
}

// 获取歌单的所有歌曲详情
export const reqGetMusicItems = (ids)=>{
    // 1905157827,1906097379,17724526,
    return requests({method:'get',url:`/song/detail?ids=${ids}`})
    // return requests({method:'get',url:`/song/detail?ids=1905157827`})
}

// 获取歌曲的歌词
export const reqGetMusicLyric = (id)=>{
    return requests({method:'get',url:`/lyric?id=${id}`})
}
