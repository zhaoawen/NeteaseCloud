<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft" @click="playAllMusic">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span
          >播放全部<span>(共{{itemlist.length }}首)</span></span
        >
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>{{ isSub ? "已收藏" : "收藏" }}</span>
        <span>({{subscribedCount }})</span>
      </div>
    </div>
  <ItemList :list="itemlist"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    setup(props) {
        console.log(props);
    },
    props:['itemlist','subscribedCount','isSub'],
    methods:{
      // 播放所有歌曲
      playAllMusic(){
        let res = confirm("您将修改所有的歌单列表？");
        if(res){
          this.updatePlayList(this.itemlist);
        }
      },
      ...mapMutations(['updatePlayList',])
    },
}
</script>

<style lang="less" scoped>
    .itemMusicList {
    width: 100%;
    // 这里如果设置高度的话就会定死 歌曲如果很多的话高度就会溢出
    // height: 10rem;
    background-color: #fff;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    .itemListTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .listLeft {
        width: 3rem;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
            stroke: #333333;
            stroke-width: 20;
        }
        span {
            font-weight: 700;
            span {
            font-weight: 400;
            font-size: 0.24rem;
            color: #999;
            }
        }
        }
        .listRight {
        display: flex;
        align-items: center;
        background-color: red;
        padding: 0.2rem;
        border-radius: 0.4rem;
        color: #fff;
        .icon {
            width: 0.3rem;
            height: 0.3rem;
            fill: #fff;
            margin-right: 0.1rem;
            stroke: #fff;
            stroke-width: 50;
        }
        }
    }
    }
</style>