<template>
<!-- 抽离歌曲卡片组件，方便后面使用 -->
   <span style="font-size: 0.2rem; color: #999"
        >({{ musicList.length }}个,被收藏{{
          changeCount(colNum("collect"))
        }}次)</span
      >
       <router-link class="SongContent" v-for="(item, i) in musicList" :key="i" :to="{path:'/itemMusic',query:{id:item.id}}" >
        <div>
          <img class="song_img" :src="item.coverImgUrl" alt="" />
        </div>
        <div class="song_message">
          <div class="song_name">{{ item.name }}</div>
          <div class="song_detail">
            {{ item.trackCount }}首,播放{{ item.playCount }}次
          </div>
        </div>
       </router-link>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            name:"",
        }
    },
    props:['musicList'],
    computed:{
    ...mapState([
      "createdMusicList",
      "collectedMusicList",
    ]),
    },
    methods: {
        colNum() {
            let count = 0;
            for (let i = 0; i < this.musicList.length; i++) {
                if (this.musicList[i].subscribedCount) {
                count += this.musicList[i].subscribedCount;
                }
            }
            return count;
        },
        changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿";
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万";
            }else{
                return num;
            }
        },
    },
}
</script>

<style lang="less" scoped>

    .SongContent {
      height: 1.2rem;
      margin: 0.2rem 0rem;
      display: flex;
      align-items: center;
      .song_message {
        margin-left: 0.2rem;
        .song_name {
          font-size: 0.3rem;
        }
        .song_detail {
          padding: 0.1rem 0;
          font-size: 0.16rem;
          color: #999;
        }
      }
      .song_img {
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 0.2rem;
      }
    }
  
</style>