<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey" >
    </div>
     <div class="searchHistory">
        <span class="searchSpan">历史</span>
        <span class="spanKey" v-for="item in  keyWordList" :key="item" @click="searchHistory(item)">
          {{item}}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="searchHistory">
        <span class="searchSpan">推荐</span>
        <span class="spanKey" v-for="item in  keyWordList1" :key="item" @click="searchHistory(item)">
          {{item}}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <ItemList :list="searchList" />
</template>

<script>
import {reqSearchMusic} from '@/request/api/search';
export default {
    data() {
        return {
            keyWordList:[],
            searchKey:"",
            searchList:[],
            keyWordList1:['苦茶子','告五人'],
        }
    },
    mounted() {
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) ||[];
    },
    methods: {
      // 搜索歌曲
        enterKey: async function(){
          if(this.searchKey != ""){
            this.keyWordList.unshift(this.searchKey);
            // 数组去重
            this.keyWordList = [...new Set(this.keyWordList)];
            if(this.keyWordList.length > 5){
              this.keyWordList.splice(this.keyWordList.length-1,1);
            }
            localStorage.setItem("keyWordList",JSON.stringify(this.keyWordList));
            let res = await reqSearchMusic(this.searchKey);
            this.searchList = res.data.result.songs;
            console.log(this.searchList);
            this.searchKey =  "";
          }
            
        },
        // 删除历史搜索
        delHistory(){
            localStorage.removeItem('keyWordList');
            this.keyWordList = [];
        },
        // 点击历史并进行搜索
        searchHistory :async function(item){
          let res = await reqSearchMusic(item);
          this.searchList = res.data.result.songs;
          // console.log(this.searchList);
        }
    },
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
 
</style>