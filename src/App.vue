<template>

  <router-view />
  <!-- 下面这个盒子用来撑起底部 防止fixed遮住别的元素-->
  <div class="box" >
  <FooterMusic v-show="$store.state.isFooterMusic"/>
  </div>
</template>
<script>
import FooterMusic from '@/components/FooterMusic.vue';

export default ({
  components:{
    FooterMusic,
  },
})
</script>

<style lang="less">
*{
  margin:0 ;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width:.5rem;
  height: .5rem;
}
a{
  color: black;
}
.box{
  width: 100%;
  height: 1.4rem;
}
</style>
