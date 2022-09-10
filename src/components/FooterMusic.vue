<template>
      <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="img_show" alt="" />
            <div>
                <p>{{ playList[playListIndex].name}}</p>
                <span>横滑切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg
                class="icon liebiao"
                aria-hidden="true"
                @click="play"
                v-if="isbtnShow"
            >
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`/api/song/media/outer/url?id=${playList[playListIndex].id}.mp3`" ></audio>
        <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%',width:'100%' }" >
            <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"/>
        </van-popup>
    </div>
    <!-- <div class="box"></div> -->
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import MusicDetail from './Item/MusicDetail.vue';
export default {
    name:'FooterMusic',
    data() {
        return {
            timer:0,
        }
    },
    computed:{
        img_show(){
            let src = (this.playList[this.playListIndex].album)?(this.playList[this.playListIndex].album.artist.img1v1Url):(this.playList[this.playListIndex].al.picUrl)
            return src;
        },
        ...mapState(['playList','playListIndex','isbtnShow','detailShow'])
    },
    components:{
        MusicDetail,
    },
    mounted() {
        console.log(this.$refs);
        this.getLyric();

    },
    updated() {
        this.getLyric();
        this.addDuration();
    },
    methods: {
        play:function(){
            // 判断音乐是否播放
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                // 播放就调用函数进行传值
                this.updateTime();
            }else{
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                // 暂停清除定时器
                clearInterval(this.timer);
            }
        },
        // 派发action获取歌词
        getLyric(){
            this.$store.dispatch('getMusicLyric',this.playList[this.playListIndex].id);
        },
        // 改变时间
        updateTime:function(){
            this.timer = setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime);
            },1000)
        },
        // 添加总时长
        addDuration:function(){
            this.updateDuration(this.$refs.audio.duration);
        },

        ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime','updateDuration']),
    },
    watch:{
        playListIndex:function(){
            this.$refs.audio.autoplay = true;
            if(this.$refs.audio.paused){
                this.updateIsbtnShow(false);
            }
        },
        playList:function(){
            // 播放就调用函数进行传值
            this.updateTime();
            if(this.isbtnShow){
                this.$refs.audio.autoplay = true;
                this.updateIsbtnShow(false);
            }
        },
    }
}
</script>

<style lang="less">
      .FooterMusic{
        width: 100%;
        height: 1.4rem;
        background-color: #fff;
        position: fixed;
        z-index: 999;
        bottom: 0;
        border-top: 1px solid rgb(230, 223, 223);
        display: flex;
        padding: .2rem;
        justify-content: space-between;
        .footerLeft {
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            img {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
            p{
                padding-bottom: 0.02rem;
                font-weight: 900;
                font-size: .36rem;
            }
        }
        .footerRight {
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon {
                width: 0.6rem;
                height: 0.6rem;
            }
        }
    }
  
</style>