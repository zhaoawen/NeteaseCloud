<template>
  <div class="guding">
    <!-- 榜单头部 -->
    <div class="bgtop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>排行榜</span>
    </div>
    <!-- 歌单标签 -->
    <div class="musicListNavBar">
      <div class="right">
        <second-nav-bar
          :SecondNavBarData="Tags"
          :itemWidth="0"
          :currentTag="currentTag"
          @clickSecondBarItem="clickSecondBarItem"
        ></second-nav-bar>
      </div>
    </div>
  </div>
  <div class="gundong">
    <!-- 榜单推荐 -->
    <div class="recommend">
      <div class="tuijian">
        <span>榜单推荐</span>
      </div>
      <div class="ranking">
        <div
          class="bangdan"
          style="background: linear-gradient(to bottom, #c7908f, #d7a4a1)"
        >
          <div class="bd">硬地原创音乐榜</div>
          <div class="update">每月更新</div>
        </div>
        <div
          @click="shuochangbang()"
          class="bangdan"
          style="background: linear-gradient(to bottom, #626a99, #7a82a8)"
        >
          <div class="bd1">说唱榜</div>
          <div class="update1">每周五更新</div>
        </div>
        <div
          @click="minyaobang()"
          class="bangdan"
          style="background: linear-gradient(to bottom, #879178, #9eaa92)"
        >
          <div class="bd1">民谣榜</div>
          <div class="update1">每周五更新</div>
        </div>
      </div>
    </div>
    <!-- 官方榜 -->
    <div class="offical">
      <div class="title">
        <img class="logo_img" src="@/assets/netmusic.jpg" alt="" />
        官方榜
      </div>
      <!-- 用自己封装的table组件算了 第三方的改起来问题太多了 -->
      <list-table
        :officialListDetailItem="item"
        :officialList="officialList"
        v-for="(item, index) in officialListDetail"
        :key="index"
        @handleRowClick="handleRowClick"
      ></list-table>
    </div>
    <div class="global">
      <div v-for="(item, index) in Tags" :key="index">
        <span class="bang" v-if="index >= 1">{{ item.name }}榜</span>
        <list-card
          v-if="index >= 1"
          class="listCard"
          :listCardData="currentList[index]"
          @clickListCardItem="clickListCardItem"
        ></list-card>
      </div>
    </div>
  </div>
</template>

<script>
import { handleMusicTime } from "@/plugins/utils";
import { reqGetRanking, reqGetRankingDetail } from "@/request/api/ranking";
import SecondNavBar from "@/components/secondNavBar/SecondNavBar.vue";
import ListTable from "@/components/listTable/ListTable.vue";
import ListCard from "@/components/listCard/ListCard.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      officialList: [],
      officialListDetail: [],
      globalList: [],
      currentList: [],
      flag: [
        [0],
        [33, 0, 10, 32, 17, 25, 31],
        [3, 4, 20, 23, 6, 2, 21, 28],
        [8, 7, 11, 14, 9, 29],
        [12, 13, 19, 5, 26, 30, 27],
        [24, 22, 18, 10],
      ],
      Tags: [
        { name: "官方" },
        { name: "精选" },
        { name: "曲风" },
        { name: "全球" },
        { name: "语种" },
        { name: "特色" },
      ],
      currentTag: {},
      scrollTop: "",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.menu);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", () => {}); // 离开当前组件别忘记移除事件监听
  },
  components: {
    SecondNavBar,
    ListTable,
    ListCard,
  },
  computed: {},
  methods: {
    menu() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    minyaobang() {
      this.$router.push(`/itemMusic?id=${this.globalList[23].id}`);
    },
    shuochangbang() {
      this.$router.push(`/itemMusic?id=${this.globalList[1].id}`);
    },
    // 获取所有榜单
    async getAllRankings() {
      let res = await reqGetRanking();
      this.officialList = res.data.list.slice(0, 4);
      this.globalList = res.data.list.slice(4);
      this.flag.forEach((item, index) => {
        let list = [];
        this.globalList.forEach((item1, index1) => {
          if (item.includes(index1)) {
            list.push(item1);
          }
        });
        this.currentList.push(list);
      });
    },
    // 根据榜单id请求详细数据
    // 根据传来的 id 查询歌单
    async getMusicListDetail(id) {
      let data = { id };
      let result = await reqGetRankingDetail(data);
      result = result.data.playlist;
      // 对时间进行处理
      result.tracks.forEach((item, index) => {
        result.tracks[index].dt = handleMusicTime(item.dt);
      });
      this.officialListDetail.push(result);
    },
    // 点击标签向置顶地方滑动
    clickSecondBarItem(index) {
      this.currentTag = this.Tags[index];
      let scroll;
      switch (this.currentTag.name) {
        case "精选":
          scroll = 0.355;
          break;
        case "曲风":
          scroll = 0.495;
          break;
        case "全球":
          scroll = 0.62;
          break;
        case "语种":
          scroll = 0.72;
          break;
        case "特色":
          scroll = 0.9;
          break;
      }
      window.scrollTo(0, document.documentElement.scrollHeight * scroll);
    },
    // 事件函数
    // 行点击事件的回调
    handleRowClick(item) {
      this.$store.dispatch("getOneSong", item);
    },
    // 点击榜单进入歌单详情界面
    clickListCardItem(id) {
      if (!this.$store.state.isLogin) {
        this.$message.error("登录后才能查看全部歌曲哦!");
        return;
      }
      if (id.id) {
        id = id.id;
      }
      let data = { id };
      this.$router.push({ path: "/itemMusic", query: data });
    },
  },
  async created() {
    await this.getAllRankings();
    this.officialList.forEach((item) => {
      this.getMusicListDetail(item.id);
    });
  },
  watch: {
    scrollTop(newValue, oldValue) {
      setTimeout(() => {
        let height = document.documentElement.scrollHeight;
        if (newValue > 0 &&newValue<height*0.3) {
          this.currentTag = { name: "官方" };
        }
        if (newValue > height * 0.3&&newValue<height*0.4) {
          this.currentTag = { name: "精选" };
        }
        if (newValue > height * 0.4 && newValue < height * 0.5) {
          this.currentTag = { name: "曲风" };
        }
        if (newValue > height * 0.5 && newValue < height*0.7) {
          this.currentTag = { name: "全球" };
        }
        if (newValue > height * 0.7  && newValue < height*0.8) {
          this.currentTag = { name: "语种" };
        }
        if (newValue > height * 0.8) {
          this.currentTag = { name: "特色" };
        }
      }, 500);
    },
  },
};
</script>

<style lang="less">
.gundong {
  position: relative;
  z-index: 2;
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
.musicListNavBar {
  background-color: #e8ecf5;
  position: fixed;
  overflow: auto;
  top: 1.2rem;
  left: 0;
  z-index: 999;
}
.recommend {
  margin: 0.3rem;
  padding-top: 2rem;
  .ranking {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem 0;
    .bangdan {
      position: relative;
      border-radius: 0.3rem;
      width: 30%;
      height: 90px;
      .bd {
        font-size: 14px;
        color: white;
        position: absolute;
        top: 35%;
        left: 30%;
        transform: translate(-10%, -30%);
        border-bottom: 1px solid #d2afae;
      }
      .bd1 {
        font-size: 14px;
        color: whitesmoke;
        position: absolute;
        top: 40%;
        left: 30%;
        transform: translate(-10%, -30%);
        padding-bottom: 0.1rem;
        border-bottom: 1px solid rgb(207, 202, 202);
      }
      .update1 {
        color: rgb(207, 202, 202);
        position: absolute;
        font-size: 2px;
        top: 60%;
        left: 20%;
        // transform: translate(-50%,-50%);
        transform: scala(0.6);
      }
      .update {
        color: rgb(207, 202, 202);
        position: absolute;
        font-size: 2px;
        top: 65%;
        left: 20%;
        // transform: translate(-50%,-50%);
        transform: scala(0.6);
      }
    }
  }
}
.offical {
  .logo_img {
    border-radius: 50%;
    width: 0.35rem;
  }
  .title {
    margin-left: 0.3rem;
  }
}
.global {
  .bang {
    margin-left: 0.25rem;
  }
}
</style>