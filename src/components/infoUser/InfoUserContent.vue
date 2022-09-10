<template>
  <div class="infoUserContent">
    <span style="font-size: 0.4rem; font-weight: 700">基本信息</span>
    <span class="cunmin">村民证</span>
    <div class="messageContent">
      <div>
        村龄：{{ createDays }}年({{ getCreat.y }}年{{ getCreat.m }}月注册)
      </div>
      <div>性别：{{ gender }}</div>
      <div>年龄：{{ age }}后 {{ constellation }}座</div>
      <div>个人简介：{{ sig }}</div>
    </div>
    <div class="more">
      <span>查看更多</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user", "detailUser", "isLogin"]),
    createDays() {
      return Math.floor(this.detailUser.createDays / 365);
    },
    getCreat() {
      let time = new Date(this.detailUser.createTime);
      let y = time.getFullYear();
      let m = time.getMonth();
      return { y, m };
    },
    // 星座
    constellation() {
      let constellations = [
        "水瓶",
        "双鱼",
        "白羊",
        "金牛",
        "双子",
        "巨蟹",
        "狮子",
        "处女",
        "天秤",
        "天蝎",
        "射手",
        "摩羯",
      ];
      let time = new Date(this.user.birthday);
      let month = time.getMonth() + 1;
      let getDay = time.getDate();
      let str = month + "." + getDay;
      // console.log(str);
      var res = null; //单独声明一个用于存放星座输出结果的容器。
      var lastDay = getDay <= 30,
        FebDay = getDay <= 29; //用于限制当月最大天数
      if (getDay >= 1 || getDay <= 31) {
        switch (month) {
          case 1: //1月星座
            if (getDay <= 19) {
              res = constellations[11];
            } else if (getDay >= 20) {
              res = constellations[0];
            }
            break;
          case 2: //2月星座
            if (getDay <= 18) {
              res = constellations[0];
            } else if (getDay >= 18 && FebDay) {
              res = constellations[1];
            }
            break;
          case 3: //3月星座
            if (getDay <= 20) {
              res = constellations[1];
            } else if (getDay >= 21) {
              res = constellations[2];
            }
            break;
          case 4: //4月星座
            if (getDay <= 19) {
              res = constellations[2];
            } else if (getDay >= 20 && lastDay) {
              res = constellations[3];
            }
            break;
          case 5: //5月星座
            if (getDay <= 20) {
              res = constellations[3];
            } else if (getDay >= 21) {
              res = constellations[4];
            }
            break;
          case 6: //6月星座
            if (getDay <= 21) {
              res = constellations[4];
            } else if (getDay >= 22 && lastDay) {
              res = constellations[5];
            }
            break;
          case 7: //7月星座
            if (getDay <= 22) {
              res = constellations[5];
            } else if (getDay >= 23) {
              res = constellations[6];
            }
            break;
          case 8: //8月星座
            if (getDay <= 22) {
              res = constellations[6];
            } else if (getDay >= 23) {
              res = constellations[7];
            }
            break;
          case 9: //9月星座
            if (getDay <= 22) {
              res = constellations[7];
            } else if (getDay >= 23 && lastDay) {
              res = constellations[8];
            }
            break;
          case 10: //10月星座
            if (getDay <= 23) {
              res = constellations[8];
            } else if (getDay >= 24) {
              res = constellations[9];
            }
            break;
          case 11: //11月星座
            if (getDay <= 22) {
              res = constellations[9];
            } else if (getDay >= 23 && lastDay) {
              res = constellations[10];
            }
            break;
          case 12: //12月星座
            if (getDay <= 21) {
              res = constellations[10];
            } else if (getDay >= 22) {
              res = constellations[11];
            }
            break;
        }
      }
      return res;
    },
    age() {
      let time = new Date(this.user.birthday);
      let year = time.getFullYear();
      // 计算是几几后
      year = year - Math.floor(year / 100) * 100;
      if (year < 9 && year > 0) {
        return "00";
      } else {
        year = Math.floor(year / 10);
      }
      return year + "0";
    },
    sig() {
      return this.user.signature;
    },
    gender() {
      if (this.user.gender != 1) {
        return "女";
      } else {
        return "男";
      }
    },
  },
};
</script>

<style>
</style>