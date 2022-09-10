<template>
  <div class="musicList">
        <div class="musicTop">
          <div class="title">发现好歌单</div>
          <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="130" class="my-swipe" :show-indicators="false">
                <van-swipe-item v-for="item in state.List" :key="item">
                    <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                        <img :src="item.picUrl" alt="">
                        <span class="palyCount">
                            <svg class=" icon" aria-hidden="true">
                                <use xlink:href='#icon-gl-play-copy'></use>
                            </svg>
                            {{changeCount(item.playCount)}}
                        </span>
                        <span class="name">{{item.name}}</span>
                    </router-link>
                   
                </van-swipe-item>
            </van-swipe>
        </div>
  </div>
</template>

<script>
import {reqGetMusicList} from '@/request/api/home.js'
import {reactive,onMounted,onBeforeMount} from 'vue';
export default {
    name:'MusicList',
    setup() {
        const state = reactive({
            List:[],
        });
        function changeCount(num){
            if(num>=100000000){
                return (num/100000000).toFixed(1)+"亿";
            }else if(num>=10000){
                return (num/10000).toFixed(1)+"万";
            }
        }
        // 利用下面这个生命钩子可以在vue3的setup函数里面使用async
        onMounted(async()=>{
            const res = await reqGetMusicList();
            state.List = res.data.result;
        })
        return { state ,changeCount};
    },
}
</script>

<style lang="less">
    .musicList{
        width:100%;
        height: 5rem;
        padding: 0.2rem;
        .musicTop{
            width: 100%;
            height: 0.6rem;
            display:flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            .title{
                font-size: 0.4rem;
                font-weight: 900;
            }
            .more{
                border: 1px solid #ccc;
                text-align: center;
                line-height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
            }
        }
        .musicContent{
            width: 100%;
            height: 3.6rem;
            .van-swipe-item{
                padding-right: 0.2rem;
                position: relative;
                height: 3.8rem;
                img{
                    width: 100%;
                    height: 2.4rem;
                    border-radius:0.2rem ;
                }
                .palyCount{
                    position: absolute;
                    margin-top: 0.06rem;
                    top:0px;
                    right: 0.3rem;
                    color: whitesmoke;
                    z-index: 99;
                    .icon{
                        height: .3rem;
                        width: .3rem;
                        fill: whitesmoke !important;
                    }
                
                }
                .name{
                    bottom: 0px;
                }
            }
               
        }
    }
</style>