<template>
      <div class="peopleList">
        <div class="followed" v-for="(item, i) in state.List" :key="i" @click="$router.push('/infoUser/id='+item.userId)">
                <img class="followed_img" :src="item.avatarUrl" alt="">
                
                <div class="left">
                    <div class="top">
                        <span class="remarkname">{{item.remarkName}}</span>
                        <span v-if="item.remarkName" class="nickname">({{item.nickname}})</span>
                        <span v-else >{{item.nickname}}</span>
                    </div>
                    <div class="bottom">
                        <span class="sig">{{item.signature}}</span>
                    </div>
                </div>
                                
                <div class="right">
                    <span v-if="item.followed" class="follow_true">互相关注</span>
                    <span v-else  class="follow_false">回关</span>

                    <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                        <use xlink:href='#icon-31liebiao'></use>
                    </svg>
                </div>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue'
import { useStore } from 'vuex'
import {reqGetUserFollowed} from '@/request/api/infoUser.js'
import {reactive,onMounted,onBeforeMount} from 'vue';
export default {
        setup(props) {
        // const methods = {
        //     huiguan(item){
        //         alert("aaaaaaaa")
        //         // console.log(item);
        //     }
        // };
        const store = useStore();
        // 使用mapstate
        // const user = computed(() => store.state.user);
        // 使用mapmutation
        // const methodA = store.dispatch('methodA', {name: '张三'});
        const state = reactive({
            user: computed(() => {
                return store.state.user
            }),
            List:[],
        });
    
        // 利用下面这个生命钩子可以在vue3的setup函数里面使用async
        onMounted(async()=>{
            var url=window.location.href;//获取地址栏 url 
            var index=url.indexOf('id=');//获取位置 
            let paramVal=url.substr(index+3,url.length);
            
            const res = await reqGetUserFollowed(paramVal);
            state.List = res.data.followeds;
            console.log(state.List);
        })
        return { 
            state,
            // ...methods,
        };
    },
}
</script>

<style lang="less">
.followed{
    display: flex;
    align-items: center;
    padding: .2rem;
    .followed_img{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    .left{
        .top{
            width: 3.5rem;
            overflow: hidden;  
            white-space: nowrap;  
            text-overflow: ellipsis; 
            .remarkname{
                padding-left: .2rem;
            }
            .nickname{
                color: #999;
            }
        }
        .bottom{
            padding-left: .2rem;
            color: #999;
            width: 3.7rem;
            overflow: hidden;  
            white-space: nowrap;  
            text-overflow: ellipsis; 
        }
    }
   
    .right{
        // float: right;
        margin-left:auto;
        align-items: center;
        display: flex;
    }
    .follow_true{
        color: #999;
        border: .02rem #999 solid;
        border-radius: .2rem;
        padding: 0 .1rem;
        margin: .2rem;
    }
    .follow_false{
        color:  rgb(193, 40, 40);
        border: .02rem rgb(193, 40, 40) solid;
        border-radius: .2rem;
        padding: 0 .1rem;
        margin: .2rem;
    }
    
}
</style>