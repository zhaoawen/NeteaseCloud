<template>
  <div class="SongsContent">
    <span style="font-size: 0.4rem; font-weight: 700">创建的歌单</span>
    <CardList :musicList="createdMusicList"></CardList>
  </div>
  <div class="SongsContent">
    <span style="font-size: 0.4rem; font-weight: 700">收藏的歌单</span>
    <CardList :musicList="collectedMusicList"></CardList>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["createdMusicList", "collectedMusicList"]),
  },
};
</script>

<style>
</style>