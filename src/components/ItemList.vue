
<template>
<!-- 抽离歌曲列表组件，方便后面使用 -->
    <div class="itemList">
      <div class="item" v-for="(item, i) in list" :key="i">
        <div class="itemLeft" @click="playMusic(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <!-- 歌名 -->
            <p>{{ item.name }}</p>
            <!-- 作者 -->
            <span v-for="(item1, index) in (item.artists || item.ar)" :key="index">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <!-- mv图标 -->
          <!-- 在歌单详情页里面拿到的是mv 在搜索页拿到的是mvid 故再次特判 -->
          <svg class="icon bofang" aria-hidden="true" v-if='(item.mvid!=0)&&(item.mv !=0)  '>
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <!-- 列表 -->
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex';
export default {
    name:'ItemList',
    props:['list'],
    methods:{
    // 播放任一歌曲
    playMusic:function(item){
        // this.updatePlayList(this.list)
        // this.updatePlayListIndex(i)
        console.log(item);
        // item.al = item.albm;
        // item.al.picUrl = item.albm.artist.imgUrl;
        this.$store.dispatch("getOneSong",item);
    },
    ...mapMutations(['updatePlayList','updatePlayListIndex','updatePlayListIndex'])
    },
    computed:{
        ...mapActions(['getOneSong']),
    }
}
</script>

<style lang="less">
.itemList {
    width: 100%;
    padding: .2rem;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span{
            font-weight: 400;
            font-size: .24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
        }
         .bofang{
            position: absolute;
            left: 0;
          }
         .liebiao{
            position: absolute;
            right: 0;
          }
      }
    }
  }
</style>