<template>
  <!-- 头部 -->
  <div class="bgtop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <span>收藏And喜欢</span>
  </div>
<!-- 内容 -->
  <div class="list">
    <!-- 视频卡片列表 -->
    <video-list-card
      :videoList="SubVideoList"
      :isLoad="true"
      :videoType="'video'"
      class="cardList"
      @clickListCardItem="goToVideoDetail"
    >
    </video-list-card>
  </div>
</template>

<script>
import VideoListCard from "@/components/videoListCard/VideoListCard.vue";
import { mapState } from "vuex";
import {reqGetSubVideoList} from '@/request/api/video.js';
export default {
  name: "collection",
  data(){
    return{
        SubVideoList:[],
    }
  },
  components: {
    VideoListCard,
  },
  computed: {
    // ...mapState(['SubVideoList', 'LikeVideoList']),
  },
  methods:{
    async get(){
         let timestamp = Date.parse(new Date());
      let data = { limit: 1000, timestamp };
      let res = await reqGetSubVideoList(data);
      if (res.data.code != 200) {
        this.$message.error("获取用户收藏视频失败,请稍后重试!");
        return;
      }
      this.SubVideoList = res.data.data;
      console.log("请求了用户收藏的视频列表");
    },
      // 进入视频详情页面
    goToVideoDetail({ id }) {
      this.$router.push({
        name: "videoDetail",
        params: { id, type: "video" },
      });
    },
  },
  async created() {
    this.SubVideoList.value = [];
    await this.get();
  },
};
</script>

<style lang="less">
.list{
  position: absolute;
  top: 1.5rem;
}
.bgtop {
  background-color: #e8ecf5;
  overflow: auto;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  padding: 0.2rem;
  width: 100%;
  line-height: 0.9rem;
  display: flex;
  align-items: center;
  span {
    padding: 0 0.2rem;
  }
  .icon {
    fill: #999;
  }
}
.cardList {
  overflow-y: scroll;
  margin-bottom: 1rem;
}
</style>