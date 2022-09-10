<template>
      <!-- 每日推荐歌曲信息 -->
    <div class="recommendInfo">
      <div class="title">
        <div class="cover">
          <img src="@/assets/recommendMusic.png" alt="" />
        </div>
        <div class="titleInfo">
          <div class="infoTop">每日歌曲推荐</div>
          <div class="infoBottom">根据你的音乐口味生成，每天6:00更新</div>
        </div>
      </div>
      <!-- 操作按钮 -->
      <div class="buttons">
        <div class="buttonItem playAll" @click="playAllMusic">
          <i class="iconfont icon-bofang playAll"></i>
          <span>播放全部</span>
        </div>
        <div class="buttonItem" @click="collectAllMusic">
          <i class="iconfont icon-xihuan"></i>
          <span>收藏全部</span>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  computed:{
     ...mapState(["recommendMusicList",])
  },
  methods: {
    // 播放所有歌曲
      playAllMusic(){
        let res = confirm("您将修改所有的歌单列表？");
        if(res){
          this.updatePlayList(this.recommendMusicList.dailySongs);
        }
      },
      ...mapMutations(['updatePlayList',]),
  },
};
</script>

<style>
.recommendInfo {
  padding: 20px;
}

.title {
  display: flex;
}

.cover {
  width: 90px;
}

.cover img {
  width: 100%;
}

.titleInfo {
  padding: 15px 10px;
}

.infoTop {
  font-size: 19px;
  font-weight: bold;
  color: black;
  margin: 3px 0;
}

.infoBottom {
  font-size: 12px;
}

.buttons {
  margin: 8px 0 0 3px;
  display: flex;
}

.buttonItem {
  font-size: 12px;
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  transform: scale(0.9);
}

.buttonItem i {
  font-size: 12px;
  margin-right: 3px;
  transform: scale(0.9);
}

.playAll {
  background-color: #ec4141;
  color: white;
}

.placeholder {
  width: 100%;
  height: 50px;
}
</style>