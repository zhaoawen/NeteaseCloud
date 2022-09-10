<template>
  <img :src="img_show" alt="" class="bgImg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color: white">{{ musicList.name }}</Vue3Marquee>
        <span v-for="(item, i) in musicList.ar||musicList.artists" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow"  @click="isLyricShow=true">
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img :src="img_show" alt="" class="img_bg" :class="{img_bg_active:!isbtnShow,img_bg_paused:isbtnShow}" />
  </div >
  <!-- 歌词 -->
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow"  @click="isLyricShow=false">
    <p v-for="item in lyric" :key="item"  :class="{active:currentTime * 1000 >= item.time && currentTime * 1000 < item.pre}">
      <!-- 歌词如果是空不显示 -->
      {{ item.lrc!='null'?item.lrc:'' }}
    </p>
  </div>

  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
        <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footer">
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        v-if="isbtnShow"
        @click="play"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else  @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from 'vuex';
export default {
  name: "MusicDetail",
  props: ["musicList",'isbtnShow','play','addDuration'],
  data() {
    return {
      // 是否显示歌词
      isLyricShow:false,
    }
  },
  mounted() {
    // console.log(this.musicList);
    this.addDuration;
  },
  computed:{
    img_show(){
      let src = (this.musicList.album)?(this.musicList.album.artist.img1v1Url):this.musicList.al.picUrl
      return src;
    },
    ...mapState(['lyricList','currentTime','playListIndex','playList','duration']),
    lyric:function(){
      // console.log(this.lyricList);
      let arr;
      if(this.lyricList.lyric){
        arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
          let min = item.slice(1,3);
          let sec = item.slice(4,6);
          let mill = item.slice(7,10);
          let lrc = item.slice(11,item.length);
          let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
          if(isNaN(Number(mill))){
            mill = item.slice(7,9);
            lrc = item.slice(10,item.length);
            time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
          }
          return {min,sec,mill,lrc,time};
        })
        // 正则表达式
        // arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
        //   let min = String(item.match(/\d{2}(?=:)/gm)) ;
        //   let sec = String(item.match(/\d{2}(?=\.)/gm));
        //   let mill = String(item.match(/\d{2,3}(?=])/gm));
        //   let lrc = String(item.slice(0,item.length).match(/([^\]]+)$/gm));
        //   // console.log(min,sec,mill,lrc); 
        //   return {min,sec,mill,lrc};
        // })
      }
      arr.forEach((item,i) => {
        if(i===arr.length-1 || isNaN(arr[i+1].time)){
          item.pre=0;
        }else{
          item.pre=arr[i+1].time;
        }
      });
      // console.log(arr);
      return arr;
    }
  },
  components: {
    Vue3Marquee,
  },
  methods: {
    backHome(){
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay(num){
      let index = this.playListIndex + num;
      if(index<0){
        index = this.playList.length-1;
      }else if(index== this.playList.length){
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(['updateDetailShow','updatePlayListIndex']),

  },
  watch:{
    currentTime: function (newValue) {
      // 操作dom元素
      let p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      // 这首歌结束自动切换到下一首
      if(newValue===this.duration){
        if(this.playListIndex===this.playList.length-1){
          this.updatePlayListIndex(0);
          this.play()
        }else{
           this.updatePlayListIndex(this.playListIndex+1);
        }
      }
    },
  }
};
</script>

<style lang="less">
.bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-content: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      // 跑马灯的长度
      width: 1.5rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        font-size: .05rem;
        color: rgb(110, 106, 106);
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: rgb(110, 106, 106);
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_bg {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_bg 10s linear infinite;
  }
  .img_bg_active {
    animation-play-state: running;
  }
  .img_bg_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_bg {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(104, 99, 99);
    margin-bottom: 0.3rem;
  }
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>