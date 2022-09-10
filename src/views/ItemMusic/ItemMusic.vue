<template>
    <ItemMusicTop :playlist="state.playlist" />
    <ItemMusicList :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount"  :isSub="state.playlist.subscribed"/>
</template>

<script>
import {useRoute} from 'vue-router';
import {onBeforeMount,onMounted,reactive} from 'vue';
import {reqGetMusicItemList,reqGetMusicItems} from '@/request/api/item.js';
import ItemMusicTop from '@/components/Item/ItemMusicTop.vue';
import ItemMusicList from '@/components/Item/ItemMusicList.vue';
export default {
    name:'ItemMusic',
    setup(props) {
        const state = reactive({
            // 歌单详情页的数据
            playlist:{},
            // 歌单的歌曲的数据
            itemlist:[],
            // 所有歌曲id
            ids:[],
        });
        onBeforeMount(async()=>{
            try {
                let id = useRoute().query.id;
                // 获取歌单详情
                let res = await reqGetMusicItemList({id});
                state.playlist = res.data.playlist;
                console.log(state.playlist);
                // 拿到trackIds，过滤，得到全部的音乐id
                state.ids = res.data.playlist.trackIds.map(item=>{
                    return Number(item.id);
                })
                // 将所有的音乐id分割为数组
                state.ids = state.ids.join(',');
                if(res){
                    // 发请求获取所有歌单里的歌曲信息
                    let result = await reqGetMusicItems(state.ids);
                    state.itemlist = result.data.songs;
                } 
                // 防止页面刷新，数据丢失，将数据保存到sessionStorage中
                sessionStorage.setItem('itemDetail',JSON.stringify(state));
            } catch (error) {
                alert(error.message)
            }
        });
        return {state};
    },
    components:{
        ItemMusicTop,
        ItemMusicList,

    }
}
</script>

<style>

</style>