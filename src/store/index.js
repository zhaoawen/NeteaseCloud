import { createStore } from 'vuex';
import { reqGetMusicLyric } from '@/request/api/item';
import { reqGetPhone, reqGetPhoneCode, reqLoginStatus, reqSubmitPhoneCode } from '@/request/api/login';
import { reqGetUser, reqGetUserCreateSongs ,reqGetUserConcern } from '@/request/api/infoUser';
import { reqGetRecommendMusic } from '@/request/api/home';
export default createStore({
  state: {
    playList: [{
      name: "水星记",
      ar: [
        { id: 2843, name: '郭顶' }
      ],
      // 专辑信息
      al: {
        id: 35005583,
        name: "飞行器的执行周期",
        pic: 2946691248081599,
        picUrl: "https://p2.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg",
      },
      id: 441491828,
    }],
    // 默认播放一首歌曲
    playListIndex: 0,
    // 暂停按钮的显示
    isbtnShow: true,
    // 点击显示弹出层
    detailShow: false,
    // 歌词
    lyricList: {},
    // 当前时间
    currentTime: 0,
    // 一首歌曲的总时长
    duration: 0,
    // 判断是否登录
    isLogin: false,
    // 判断是否显示底部组件
    isFooterMusic: true,
    token: '',
    // 用户信息
    user:{
      // "followed": false,
      "backgroundUrl": "https://p4.music.126.net/7ppINkAzIL-VWugAqq2d6A==/109951164380552356.jpg",
      "detailDescription": "",
      "avatarImgIdStr": "109951167405720353",
      "backgroundImgIdStr": "109951164380552356",
      "userId": 379597429,
      "vipType": 0,
      "nickname": "客从_",
      "birthday": 984067200000,
      "gender": 2,
      "province": 610000,
      "city": 610300,
      "avatarImgId": 109951167405720350,
      "backgroundImgId": 109951164380552350,
      "accountStatus": 0,
      "userType": 0,
      "avatarUrl": "https://p4.music.126.net/eHhAldVK5jY42XUnfmwtaQ==/109951167405720353.jpg",
      "defaultAvatar": false,
      "expertTags": null,
      "experts": {},
      "mutual": false,
      "remarkName": null,
      "authStatus": 0,
      "djStatus": 0,
      "description": "",
      "signature": "以梦为马，不负韶华",
      "authority": 0,
      "avatarImgId_str": "109951167405720353",
      "followeds": 15,
      "follows": 69,
      "eventCount": 3,
      "avatarDetail": null,
      "playlistCount": 12,
      "playlistBeSubscribedCount": 5
    },
    // 用户详细信息
    detailUser:{},
    // 用户创建的歌单
    createdMusicList:[],
    // 用户收藏的歌单
    collectedMusicList:[], 
    // 每日推荐的内容
    recommendMusicList:{},
    // 是否登录
    isLogin:"379597429",
    // video播放状态
    isPlay:false,
    // 收藏的video
    SubVideoList:[],
    // 喜欢的video
    LikeVideoList:[],
  },
  getters: {
  },
  mutations: {
         // 修改播放状态
         changePlayState(state, isPlay) {
          state.isPlay = isPlay;
          // console.log('changePlayState');
      },
    updateIsbtnShow(state, value) {
      state.isbtnShow = value;
    },
    updatePlayList(state, value) {
      state.playList = value;
    },
    pushPlayList(state, value) {
      state.playList.push(value);
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList(state, value) {
      state.lyricList = value;
    },
    updateCurrentTime(state, value) {
      // console.log(state.currentTime);
      state.currentTime = value;
    },
    updateDuration(state, value) {
      state.duration = value;
    },
    updateIsFooter(state, value) {
      state.isFooterMusic = value;
    },
    updateIsLogin(state, value) {
      state.isLogin = value;
    },
    updateToken(state, value) {
      state.token = value;
      localStorage.setItem('token', state.token);
    },
    updateUser(state, value) {
      state.user = value;
      console.log(state.user);
    },
    updateDetailUser(state,value){
      state.detailUser = value;
      console.log(state.detailUser);
    },
    getUserCreateSongs(state,res){
      state.MusicList = res;
      let index = res.findIndex((item) => item.creator.userId != state.user.userId);
      res[0].name = `喜欢的音乐`;
      // vue warn
      state.createdMusicList = state.MusicList.slice(0, index);
      state.collectedMusicList = state.MusicList.slice(index);
    },
    // 每日推荐
    getRecommendMusic(state,value){
      state.recommendMusicList = value;
    },
    isLogin(state,value){
      state.isLogin = value;
    },
    updateSubVideoList(state,value){
      state.SubVideoList = value;
    },
    updateLikeVideoList(state,value){
      state.LikeVideoList = value;
    }
  },
  actions: {
    // 获取歌词
    getMusicLyric: async function (context, value) {
      let res = await reqGetMusicLyric(value);
      context.commit("updateLyricList", res.data.lrc);
    },
    // 添加一首到播放列表
    getOneSong(context, value) {
      context.commit("pushPlayList", value);
      context.commit("updatePlayListIndex", this.state.playList.length - 1);
    },
    // 修改底部组件是否显示
    getFooterShow(context, value) {
      context.commit("updateIsFooter", value);
    },
    // 手机号+密码登录
    getLogin: async function (context, value) {
      let res = await reqGetPhone(value);
      console.log(res);
      context.commit("isLogin",res.data.profile.userId);
      
      return res.data;
    },
    // 获取验证码
    getPhoneCode: async function (context, value) {
      let res = await reqGetPhoneCode(value);
      console.log(res);
    },
    // 手机号+验证码登录
    getLoginCode: async function (context, value) {
      let res = await reqSubmitPhoneCode(value);
      console.log(res);
      return res;
    },
    // 登录状态
    getLoginStatus: async function (context) {
      let res = await reqLoginStatus();
      console.log(res);
      return res;
    },
    // 修改是否登录
    updateIsLogin(context, value) {
      context.commit('updateIsLogin', value);
    },
    // 获取用户信息
    getUserMessage: async function (context, value) {
      let res = await reqGetUser(value);
      if(res.status==200){
        context.commit('updateDetailUser',res.data);
        context.commit('updateUser',res.data.profile);
      }
      return res.data.profile;
    },
    // 获取用户创建的歌单
    getUserCreateSongs:async function(context,value){
      let res = await reqGetUserCreateSongs(value);
      res = res.data.playlist;
      context.commit('getUserCreateSongs',res);
      return res;
    },
    // 获取每日推荐歌曲
    getRecommendMusic:async function(context){
      let res = await reqGetRecommendMusic();
      if(res.status == 200){
        context.commit('getRecommendMusic',res.data.data);
        return res.data.data;
      }else{
        return Promise.reject(new Error('faile'));
      }
    },
    // 关注用户
    getUserConcern:async function(context,data){
      let res = await reqGetUserConcern(data);
      if(res.status == 200){
        console.log(res);
        return "ok";
      }else{
        return Promise.reject(new Error('faile'));
      }
    },
  },
  modules: {
  }
})
