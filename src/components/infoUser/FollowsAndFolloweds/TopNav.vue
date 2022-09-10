<template>
      <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
        <div class="topContent">
            <span  @click="$router.push('/infoUser/follows/id='+state.user.userId)" id="guanzhu">关注</span>
            <span @click="$router.push('/infoUser/followeds/id='+state.user.userId)" id="fans" >粉丝</span>
        </div>
        <div class="topRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href='#icon-sousuo'></use>
            </svg>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue'
import { useStore } from 'vuex'
import {reqGetUserFollow} from '@/request/api/infoUser.js'
import {reactive,onMounted,onBeforeMount} from 'vue';

export default {
    setup(props) {
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
            let flag = url.includes('followeds');//是否含有follows
            if(flag){
                let fans = document.getElementById("fans");
                fans.className+=' active';
            } else{
                let guanzhu = document.getElementById("guanzhu");
                guanzhu.className+=' active';
            }
            var index=url.indexOf('id=');//获取位置 
            let paramVal=url.substr(index+3,url.length);
            const res = await reqGetUserFollow(paramVal);
            state.List = res.data.follow;
            console.log(state.List);
        })
        return { state };
    },
}
</script>

<style lang="less">
    .topNav{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topContent{
            width: 30%;
            display: flex;
            height: 100%;
            justify-content: space-around;
            font-size: .36rem;
            .active{
                font-weight: 900;
                text-decoration:underline;
                text-decoration-color:rgb(193, 40, 40);
                text-underline-offset:.1rem
            }
        }
    }
</style>