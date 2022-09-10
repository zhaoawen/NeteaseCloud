
<template>
  <!-- 这个组件为了复用写的很乱，懒得整理了 -->
  <div>
    <div class="officalItem">
      <router-link
        class="title"
        :to="{ path: '/itemMusic', query: { id: officialListDetailItem.id } }"
        >{{ officialListDetailItem.name }} >
      </router-link>
      <span class="update">刚刚更新</span>
      <div class="listContainer">
        <div
          class="SongContent"
          v-for="(item, index) in (officialListDetailItem.tracks &&
            officialListDetailItem.tracks.slice(0, 3)) ||
          (officialListDetailItem.topSongs &&
            (officialListDetailItem.isOpen
              ? officialListDetailItem.topSongs
              : officialListDetailItem.topSongs.slice(0, 10))) ||
          officialListDetailItem.songs.slice(0, 10)"
          :key="index"
          @click="handleRowClick(item)"
        >
          <div>
            <span class="song_index">{{ index + 1 }}</span>
            <img class="song_img" :src="item.al.picUrl" alt="" />
          </div>
          <div class="song_message">
            <div class="song_name">{{ item.name }}</div>
            <div class="song_detail">
              <span v-for="(item1, index) in item.ar">{{ item1.name }}</span>
            </div>
          </div>
          <div class="right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofanganniu"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTable",
  data() {
    return {};
  },
  props: {
    officialListDetailItem: {
      type: Object,
      default() {
        return {};
      },
    },
    // 传过来的封面
    cover: {
      type: String,
      default() {
        return "";
      },
    },
    // 传过来的listId
    listId: {
      type: String,
      default() {
        return "";
      },
    },
    // 是否显示查看全部按钮
    isCheckAllShow: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  methods: {
    // 点击行的回调 （选中）
    handleRowClick(item) {
      console.log(item);
      this.$emit("handleRowClick", item);
    },
  },
};
</script>

<style scoped lang="less">
.update {
  margin-left: auto;
  align-items: center;
  float: right;
  margin-right: 0.2rem;
  color: #999;
}
.right {
  margin-left: auto;
  align-items: center;
  display: flex;
}
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
      width: 3.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0.1rem 0;
      font-size: 0.16rem;
      color: #999;
      span {
        margin-right: 0.1rem;
      }
    }
  }
  .song_index {
    display: inline-block;
    width: 0.7rem;
    line-height: 0.5rem;
    position: relative;
    top: -20px;
    text-align: center;
  }
  .song_img {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 0.2rem;
  }
}
.officalItem {
  background-color: #fff;
  margin: 0.25rem;
  padding: 0.25rem;
  border-radius: 0.2rem;
}

.title {
  width: 100%;
  height: 20px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

.listRows {
  height: 30px;
  font-size: 12px;
  color: rgb(153, 153, 153);
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.listRows:nth-child(odd) {
  background-color: #f9f9f9;
}
.listRows:hover {
  background-color: #f4f4f4;
}

.listRows td {
  transform: scale(0.9);
}

.index {
  text-align: center;
  line-height: 28px;
  width: 30px;
}

.topthree {
  color: crimson;
}

.listRows .musicName {
  color: rgb(31, 31, 31);
  transform: translate(-5%, -5%) scale(0.9);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 80%;
}

.singer {
  text-align: right;
  position: absolute;
  right: 10px;
}

.checkAll {
  color: rgb(134, 134, 134);
  font-size: 12px;
  transform: scale(0.9) translateX(-5%);
  width: 100px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.checkAll i {
  font-size: 12px;
}

.selectRow {
  background-color: #efefef !important;
}

tr {
  cursor: pointer;
}
</style>