<template>
  <div class="videoList">
    <!-- 类名可能不太对应文件，因为html和样式都是直接搬MusicListIndex里面的 -->
    <!-- 视频列表 -->
    <!-- 视频navbar -->
    <div class="musicListNavBar" v-if="videoCategory.length != 0">
      <div class="right">
        <second-nav-bar
          :SecondNavBarData="videoCategory"
          :itemWidth="0"
          :currentTag="currentTag"
          @clickSecondBarItem="clickSecondBarItem"
        ></second-nav-bar>
      </div>
    </div>
    <div class="list">
      <!-- 视频卡片列表 -->
    <video-list-card
      :videoList="videoList"
      :isLoad="true"
      :videoType="'video'"
      class="cardList"
      @clickListCardItem="goToVideoDetail"
      @bottomLoad="bottomLoad"
    >
    </video-list-card>
    </div>
    
  </div>
</template>

<script>
import {reqGetVideos,reqGetVideosTags,reqGetVideosNum} from '@/request/api/video.js';
import SecondNavBar from "@/components/secondNavBar/SecondNavBar.vue";
import VideoListCard from "@/components/videoListCard/VideoListCard.vue";
export default {
  components: { SecondNavBar, VideoListCard, },
  name: "VideoList",
  data() {
    return {
      // 视频分类
      videoCategory: [],
      // 当前标签
      currentTag: {},
      // 当前视频页数
      videoPage: 1,
      // 是否还有更多视频数据
      hasMore: true,
      // 视频列表数据
      videoList: [],
      // 视频分类tag列表
      sortList: [],
    };
  },
  methods: {
    // 请求
    // 请求视频分类
    async getVideoCategory() {
      let res = await reqGetVideos();
      this.videoCategory = res.data.data;
      this.currentTag = res.data.data[0];
      // console.log(this.videoCategory);
    },
    //获取分类下的视频
    // 这个接口一次只能获取8条数据, 所以我每次请求循环2次这个请求 拿16条数据
    // 因为是每次8条数据push进去的 push了前 8条时因为高度不够，触发了组件video-list-card的触底，
    // 又调用了一次请求，所以第一次请求会请求32条数据，后面高度够了都是一次请求16条，我觉得挺好的，就不理这个bug了
    async getVideoList(id) {
      let i = 2;
      while (i) {
        if (this.hasMore) {
          let data = {
            id,
            offset: 56,
          };
          let res = await reqGetVideosNum(data);
          this.hasMore = res.data.hasmore;
          this.videoList.push(...res.data.datas);
          this.videoPage += 1;
          i--;
        } else {
          return;
        }
      }
      // console.log(this.videoList);
    },

    // 获取视频分类tag
    async getSortList() {
      let res = await reqGetVideosTags();
      // console.log(res);
      // console.log(res.data.data);
      this.sortList = res.data.data;
    },

    // 事件
    // 点击分类的回调
    clickSecondBarItem(index) {
      // console.log("clickSecondBarItem");
      this.videoPage = 1;
      this.videoList = [];
      this.currentTag = this.videoCategory[index];
      this.getVideoList(this.currentTag.id);
    },
    // 进入视频详情页面
    goToVideoDetail({ id }) {
      this.$router.push({
        name: "videoDetail",
        params: { id, type: "video" },
      });
    },
    // 上拉触底的回调
    bottomLoad() {
      // console.log("goToVideoDetail");
      if (this.hasMore) {
        this.getVideoList(this.currentTag.id);
      }
    },

    // 点击sortBoxItem的分类item的回调
    clickSortBoxItem(item) {
      this.currentTag = item;
      this.videoPage = 1;
      this.videoList = [];
      this.getVideoList(item.id);
    },
  },
  async created() {
    await this.getVideoCategory();
    await this.getVideoList(this.currentTag.id);
  },
};
</script>

<style scoped>
.videoList{
  background: linear-gradient(to bottom, #e8ecf5, #f8f9fd);
}
/* .list{
  position: absolute;
  top: 1.3rem;
} */
.musicListNavBar {
  background-color: #e8ecf5;
  /* position: fixed; */
  z-index: 3;
  padding: 0  .2rem;
  /* display: flex; */
  justify-content: space-between;
  font-size: 12px;
}

.page {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
}

.cardList {
  overflow-y: scroll;
  margin-bottom: 1rem;
}
</style>