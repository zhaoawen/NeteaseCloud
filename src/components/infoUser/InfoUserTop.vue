<template>
  <div class="bg_Img">
    <img :src="user.backgroundUrl" alt="" class="bg_Img" />
  </div>
  <div class="bg">
    <div class="bgtop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="infoUserTop">
      <img :src="user.avatarUrl" alt="" class="profileimg" />
      <div class="name">{{ user.nickname }}</div>
      <div class="message">
        <span @click="$router.push('/infoUser/follows/id=' + this.user.userId)"
          >{{ user.follows }}关注</span
        >
        <span
          @click="$router.push('/infoUser/followeds/id=' + this.user.userId)"
          >{{ user.followeds }}粉丝</span
        >
        <span>Lv.{{ level }}</span>
      </div>
      <div class="edit" v-if="this.isLogin == this.getUrl()">
        <span>编辑资料</span>
      </div>
      <div class="detail" v-else>
        <button class="followMe" >
          <div v-if="user.followed"  @click="quguan(item)">互相关注</div>
          <div v-else class="huiguan" @click="huiguan(item)">+ 回关</div>
          <div class="followdays" v-if="user.followed">{{ followdays }}</div>
        </button>
        <button class="chalk">
          <span class="talk">聊天</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState([
            "user",
            "detailUser",
            "isLogin",
        ]),
        level() {
            return this.detailUser.level;
        },
    },
    methods: {
         // 获取路径
        getUrl() {
        var url = window.location.href; //获取地址栏 url
        var index = url.indexOf("id="); //获取位置
        let paramVal = url.substr(index + 3, url.length);
        return paramVal;
        },
    },
}
</script>
