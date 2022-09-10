import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins';
import ItemList from '@/components/ItemList.vue';
import CardList from '@/components/CardList.vue';
import { getCookie,setCookie,delCookie} from "@/components/cookie";
import infiniteScroll from "vue-infinite-scroll";
// import ElementUI from 'element-ui';
// import { Pagination } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局样式表
import "./assets/css/base.css"
const app= createApp(App)
app.component('ItemList', ItemList);
app.component('CardList', CardList);

// 将方法挂载在全局
app.provide('getCookie', getCookie);
app.provide('setCookie', setCookie);
app.provide('delCookie', delCookie);

getVant(app);
app.use(store);
app.use(infiniteScroll);
// app.use(Pagination);
app.use(router).mount('#app')
// 把vue实例挂载在window.vm,方便使用vue的实例
window.vm = app;