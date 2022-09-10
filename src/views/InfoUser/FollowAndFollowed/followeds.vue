<template>
    <TopNav />
    <Followed />
</template>

<script>
import TopNav from '@/components/infoUser/FollowsAndFolloweds/TopNav.vue'
import Followed from '@/components/infoUser/FollowsAndFolloweds/Followeds.vue'
import {computed} from 'vue'
import { useStore } from 'vuex'
import {reqGetUserFollowed} from '@/request/api/infoUser.js'
import {reactive,onMounted,onBeforeMount} from 'vue';

export default {
    name:'followeds',
    components:{
        TopNav,
        Followed,
    },
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

