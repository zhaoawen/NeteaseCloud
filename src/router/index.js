import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import store from '@/store/index';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/recommend',
    name: 'Recommend',
    // route level code-splitting
    // this generates a separate chunk (Recommend.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Recommend" */ '../views/Recommend/Recommend.vue')
  },
  {
    path: '/musicList',
    name: 'MusicList',
    // route level code-splitting
    // this generates a separate chunk (Recommend.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Recommend" */ '../views/MusicList/musicList.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    // route level code-splitting
    // this generates a separate chunk (Recommend.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Recommend" */ '../views/Ranking/ranking.vue')
  },
  {
    path: '/video',
    component: () => import(/* webpackChunkName: "Video" */ '../views/video/Video.vue'),
    redirect: '/video/videolist',
    children: [
      { path: '/video/videolist', component: () => import(/* webpackChunkName: "VideoList" */ '../views/video/videoChildren/VideoList.vue') },
      { path: '/video/mvlist', component: () => import(/* webpackChunkName: "MvList" */ '../views/video/videoChildren/MvList.vue') },
    ]
  },
  { path: '/videodetail/:id/video', 
    name: 'videoDetail', 
    component:  () => import(/* webpackChunkName: "videoDetail" */ '../views/videoDetail/VideoDetail.vue')  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (ItemMusic.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/ItemMusic/ItemMusic')
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (Search.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (Login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    // route level code-splitting
    // this generates a separate chunk (collection.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "collection" */ '../views/Collection/collection.vue')
  },
  {
    path: '/infoUser/:id',
    name: 'InfoUser',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin || store.state.token || localStorage.getItem('token')) {
        next();
      } else {
        next('/login');
      }
    },
    // route level code-splitting
    // this generates a separate chunk (InfoUser.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "InfoUser" */ '../views/InfoUser/InfoUser.vue')
  },
  {
    path: '/infoUser/follows/:id',
    name: 'follows',
    component: () => import(/* webpackChunkName: "InfoUser" */ '../views/InfoUser/FollowAndFollowed/follows')
  },
  {
    path: '/infoUser/followeds/:id',
    name: 'followeds',
    component: () => import(/* webpackChunkName: "InfoUser" */ '../views/InfoUser/FollowAndFollowed/followeds.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局守卫
router.beforeEach((to, from) => {
  if (to.path == '/login') {
    store.dispatch('getFooterShow', false);
  } else {
    store.dispatch('getFooterShow', true);
  }
  // chrome     
  document.body.scrollTop = 0     // firefox     
  document.documentElement.scrollTop = 0     // safari     
  window.pageYOffset = 0
})
/** 解决跳转重复路由报错问题 */ 
// const routerPush = router.push;
// router.push = path => {
//   // 判断下当前路由是否就是要跳转的路由
//   if (router.currentRoute.fullPath.includes(path)) return;
//   return routerPush.call(router, path);
// }
export default router
