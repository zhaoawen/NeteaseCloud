<template>
  <div id="swiperTop" >
    <van-swipe :autoplay="3000" lazy-render ref="swiper">
        <van-swipe-item v-for="image in state.images" :key="image" @click="onChange">
            <img :src="image.pic" />
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {reqGetBanner} from '@/request/api/home.js'
import {reactive,onMounted,onBeforeMount} from 'vue';
export default {
    name:'SwiperTop',
    setup() {
    const state = reactive({
        images:[
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]});
    // 利用下面这个生命钩子可以在vue3的setup函数里面使用async
    onBeforeMount(async()=>{
        // const res =await axios.get('http://localhost:3000/banner?type=2');
        // if(res.status==200){
        //     state.images = res.data.banners
        // }
        // console.log(state.images);
        const res = await reqGetBanner();
        state.images = res.data.banners;
    })
    return { state };
  },
  methods: {
      onChange(event){
         this.$refs.swiper.next();
      },
  },
};

</script>

<style lang="less" >
#swiperTop{
    .van-swipe{
        width: 100%;
        height: 3rem;
        .van-swipe-item{
            padding:0 0.2rem;
            img{
                width:100%;
                height: 100%;
                border-radius: 0.2rem;
            }
        }
        .van-swipe__indicator--active{
            background-color: rgb(219,130,130);
        }
    }
}
    
</style>