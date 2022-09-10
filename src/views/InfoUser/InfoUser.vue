<template>
<div class="bg">
  <InfoUserTop />
  <InfoUserContent />
  <InfoUserSongs />
</div>

</template>
<script>
import InfoUserSongs from '@/components/infoUser/InfoUserSongs.vue'
import InfoUserContent from '@/components/infoUser/InfoUserContent.vue'
import InfoUserTop from '@/components/infoUser/InfoUserTop.vue'
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
    };
  },
  components:{
    InfoUserTop,
    InfoUserContent,
    InfoUserSongs,
  },
  computed: {
    ...mapState([
      "user",
      "detailUser",
      "createdMusicList",
      "collectedMusicList",
      "isLogin",
    ]),
    followdays() {
      let followTime = String(this.user.followTime);
      let index = followTime.indexOf("注");
      return followTime.slice(index + 1);
    },
    Obj(){
			return this.$store.state.user;
		}
  },
  mounted() {
    this.musicList();
    let paramVal = this.getUrl();
    this.$store.dispatch("getUserMessage", paramVal);
  },

  methods: {
    ...mapMutations(["updateUser"]),
    huiguan(){
      let data = {}
      data.id = this.getUrl();
      data.type = 1;
      this.$store.dispatch("getUserConcern", data);
      alert("关注成功");
    },
    quguan(){
      let res = confirm("您确定取消关注该用户吗？");
        if(res){
          let data = {}
          data.id = this.getUrl();
          data.type = 0;
          this.$store.dispatch("getUserConcern", data);
          alert("取关成功");
        }
    },
    update1() {
        let followMe = document.getElementsByClassName("followMe")[0];
        let chalk = document.getElementsByClassName("chalk")[0];
        let huiguan = document.getElementsByClassName("huiguan")[0];
        let talk = document.getElementsByClassName("talk")[0];
        huiguan.setAttribute("style", "color:white");
        followMe.setAttribute("style", "background-color:red");
        talk.setAttribute("style", "color:black");
        chalk.setAttribute("style", "background-color: #f6f6f6");
    },
    // 获取路径
    getUrl() {
      var url = window.location.href; //获取地址栏 url
      var index = url.indexOf("id="); //获取位置
      let paramVal = url.substr(index + 3, url.length);
      return paramVal;
    },
    async musicList() {
      let paramVal = this.getUrl();
      let timestamp = Date.parse(new Date());
      let value = {
        userId: paramVal,
        timestamp,
      };
      await this.$store.dispatch("getUserCreateSongs", value);
    },
  },
  beforeCreate() {
    this.$nextTick(() => {});
  },
  watch:{
    Obj(newVal,oldVal){
      if (this.isLogin != this.getUrl() && this.user.followed == false) {
        setTimeout(()=>{
          this.update1();
        },500);
      }
		}
  }
};
</script>
<style lang="less">
* {
  -webkit-text-size-adjust: none;
}
.bg_Img {
  width: 100%;
  height: 6rem;
}
.bg {
  z-index: 0;
  font-family: cursive;
  margin-top: -10%;
  background-color: #f6f6f6;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .bgtop {
    border-radius: 0.3rem;
    padding: 0.2rem;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: -0.5%;
    .icon {
      fill: white;
    }
  }
  .infoUserTop {
    border-radius: 0.3rem;
    margin: 1rem 0.35rem;
    margin-bottom: 0;
    width: 90%;
    position: fixed;
    background-color: #fff;
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    .message {
      width: 3rem;
      color: #999;
      display: flex;
      justify-content: space-between;
    }
    .edit {
      color: black;
      padding: 0.1rem 0.3rem;
      border-radius: 0.5rem;
      border: 1.5px rgb(233, 228, 228) solid;
      margin-bottom: 5px;
    }
    .detail {
      display: flex;
      justify-content: center;
      .followMe {
        background-color: #f6f6f6;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        padding: 0rem 0.4rem;
        color: #858080;
        .followdays {
          transform: scale(0.6);
          // display: inline-block;
          // width: 200%;
          // transform-origin:0 0 ;
        }
      }
      .chalk {
        font-size: 0.3rem;
        background-color: red;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        padding: 0.1rem 0.4rem;
        color: #f6f6f6;
      }
    }
    .bg_Img {
      width: 100%;
      height: 10rem;
    }
    .profileimg {
      position: absolute;
      top: -0.8rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }
    .name {
      padding-top: 0.8rem;
      font-weight: 700;
      font-size: 0.4rem;
    }
  }
  .infoUserContent {
    border-radius: 0.3rem;
    margin: 1rem 0.35rem;
    margin-bottom: 0px;
    width: 90%;
    background-color: #fff;
    height: 5rem;
    padding: 0.4rem;
    .messageContent {
      color: rgb(106, 106, 106);
    }
    .messageContent div {
      margin: 0.3rem 0;
    }
    .cunmin {
      margin-left: 2.5rem;
      border: 0.02rem #999 solid;
      padding: 0.1rem 0.3rem;
      border-radius: 1rem;
    }
    .more {
      display: flex;
      justify-content: center;
      font-size: 0.38rem;
      color: #999;
      border: none;
      border-top: 1px solid #999;
      padding-top: 0.2rem;
      width: 6.2rem;
    }
  }
  .SongsContent {
    border-radius: 0.3rem;
    margin: 1rem 0.35rem;
    margin-bottom: 0px;
    width: 90%;
    background-color: #fff;
    // height: 5rem;
    padding: 0.4rem;
  }
}
</style>