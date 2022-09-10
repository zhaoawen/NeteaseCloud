<template>
    <TopNav />
    <Follows />
</template>


<script>
import Follows from '@/components/infoUser/FollowsAndFolloweds/Follows.vue'
import TopNav from '@/components/infoUser/FollowsAndFolloweds/TopNav.vue'
import {computed} from 'vue'
import { useStore } from 'vuex'
import {reqGetUserFollow} from '@/request/api/infoUser.js'
import {reactive,onMounted,onBeforeMount} from 'vue';

export default {
    name:'follows',
    components:{
        TopNav,
        Follows,
    },
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


<style  lang="less" scoped>


</style>