<template>
  <div class="recommendMusic">
    <BgTop />
    <Recommend />
    <ItemList :list="recommendMusicList.dailySongs" />
  </div>
</template>

<script>
import BgTop from '@/components/RecommendMusic/bgtop.vue'
import Recommend from '@/components/RecommendMusic/recommendInfo.vue'
import { mapState,mapMutations } from "vuex";
export default {
  name: "RecommendMusic",
  components:{
    BgTop,
    Recommend,
  },
  mounted() {
    this.$store.dispatch('getRecommendMusic');
  },
  computed:{
     ...mapState(["recommendMusicList",])
  },
};
</script>

<style lang="less" scoped>


</style>