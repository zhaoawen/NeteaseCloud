<template>
   <div class="iconList">
       <div class="iconItem" @click="$router.push('/recommend')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-tuijian'></use>
            </svg>
            <span>每日推荐</span>
       </div>
       <div class="iconItem"  @click="personalFM()">
            <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-zhibo'></use>
            </svg>
            <span>私人FM</span>
       </div>
       <div class="iconItem"  @click="$router.push('/musicList')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-gedan'></use>
            </svg>
            <span>歌单</span>
       </div>
       <div class="iconItem" @click="$router.push('/ranking')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-paihangbang'></use>
            </svg>
            <span>排行榜</span>
       </div>
    </div>
     
</template>

<script>
import {mapMutations} from 'vuex'
import {reqGetPersonalFM} from '@/request/api/home.js'
export default {
    name:'IconList',
    mounted() {
        
    },
    methods: {
        async personalFM(){
            let res = await reqGetPersonalFM();
            console.log(res.data.data); 
            let flag = confirm("您将修改所有的歌单列表？");
            if(flag){
                this.updatePlayList(res.data.data);
            }
        },
        ...mapMutations(['updatePlayList',])
    },
}
</script>

<style lang="less" scoped>
    .iconList{
        margin-top: .2rem;
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iconItem{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>