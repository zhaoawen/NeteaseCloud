<template class="clearfix">
<!-- 页面头部 -->
  <div class="bgtop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <span>歌单广场</span>
  </div>
  <!-- 歌单标签 -->
  <div class="musicListNavBar">
    <div class="right">
      <second-nav-bar
        :SecondNavBarData="hotTags"
        :itemWidth="0"
        :currentTag="currentTag"
        @clickSecondBarItem="clickSecondBarItem"
      ></second-nav-bar>
    </div>
  </div>
  <!-- 歌单列表 -->
  <div class="musicContent clearfix">
    <div v-for="item in musicList.playlists" :key="item" class="songs">
      <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
        <img :src="item.coverImgUrl" alt="" />
        <span class="palyCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gl-play-copy"></use>
          </svg>
          {{ changeCount(item.playCount) }}
        </span>
        <span class="name">{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { reqGetHotTags, reqGetHotMusicList } from "@/request/api/musicList.js";
import SecondNavBar from "@/components/secondNavBar/SecondNavBar.vue";
export default {
  name: "musicList",
  components: {
    SecondNavBar,
  },
  data() {
    return {
      hotTags: [],
      musicList: {},
      currentTag: {},
      currentPage: 1,
      // 分类数据
      sortList: [],
    };
  },
  async created() {
    await this.getHotTag();
    this.getMusicList();
  },
  methods: {
    // 获取热门歌单tag数据
    async getHotTag() {
      let result = await reqGetHotTags();
      this.currentTag = result.data.tags[0];
      this.hotTags = result.data.tags;
    },
    // 根据歌名请求歌单列表
    async getMusicList() {
      this.musicList = {};
      let data = {
        cat: this.currentTag.name,
        offset: 50 * (this.currentPage - 1),
      };
      let result = await reqGetHotMusicList(data);
      // 里面的total可以用于分页，所以把整个对象都保存下来
      this.musicList = result.data;
    },
    // 处理点击事件
    // 接收点击二级navbar的回调
    clickSecondBarItem(index) {
      this.currentTag = this.hotTags[index];
      this.currentPage = 1;
      // 先清空musicList
      this.getMusicList();
    },
    changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.clearfix:after,
.clearfix:before {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
.bgtop {
  border-radius: 0.3rem;
  padding: 0.2rem;
  width: 100%;
  line-height: 1rem;
  display: flex;
  align-items: center;
  span {
    padding: 0 0.2rem;
  }
  .icon {
    fill: #999;
  }
}
.musicContent {
  width: 100%;
  padding: 0.2rem;
  // height: 3.6rem;
  .songs {
    padding: 0.2rem;
    position: relative;
    height: 3.8rem;
    width: 3.3rem;
    float: left;
    margin: 0 0.1rem;
    img {
      width: 100%;
      height: 2.4rem;
      border-radius: 0.2rem;
    }
    .palyCount {
      position: absolute;
      margin-top: 0.3rem;
      top: 0px;
      right: 0.3rem;
      color: whitesmoke;
      z-index: 99;
      .icon {
        height: 0.3rem;
        width: 0.3rem;
        fill: whitesmoke !important;
      }
    }
    .name {
      bottom: 0px;
    }
  }
}
</style>