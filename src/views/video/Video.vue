<template>
  <div class="guding">
    <!-- 榜单头部 -->
    <div class="bgtop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>视频</span>
    </div>
  </div>
  <div class="video">
    <!-- <nav-bar @clickBarItem="clickBarItem" :navBarItem="navBarData"></nav-bar> -->
    <router-view class="videoList"></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import secondNavBar from "@/components/secondNavBar/SecondNavBar.vue";
export default {
  components: { NavBar,secondNavBar },
  name: "Video",
  data() {
    return {
      navBarData: [
        { name: "视频", path: "/video/videolist" },
        { name: "MV", path: "/video/mvlist" },
      ],
    };
  },
  methods: {
    // 接收navbar传来的点击事件
    clickBarItem(path) {
      this.$router.push(path);
    },
  },
  created() {
    if (!this.$store.state.isLogin) {
      this.$message.error("视频页面只有登录后才能访问哦!");
      this.$router.replace("/index");
    }
  },
};
</script>

<style scoped lang="less">
.video {
  position: relative;
  top: 1.2rem;
  // overflow-y: hidden;
  padding: 0 !important;
}
body {
  z-index: 0;
  position: relative;
  background: linear-gradient(to bottom, #e8ecf5, #f8f9fd);
}
.guding {
  position: relative;
  z-index: 4;
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
.musicListNavBar {
  background-color: #e8ecf5;
  position: fixed;
  overflow: auto;
  top: 1.2rem;
  left: 0;
  z-index: 999;
}
</style>