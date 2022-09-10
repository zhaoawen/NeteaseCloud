<template>
    <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      >
      <!-- <button class="yanzhengma" style="width:100px;height:42px" @click="getCode" >获取验证码</button> -->
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="LoginByPhone">登录</button>
    </div>
  </div>
</template>

<script>
export default {
    name:'Login',
    data() {
        return {
            phone:'',
            code:'',
            password:'',
        }
    },
    methods: {
        LoginByCode(){
          const {phone,code} = this;
          this.$store.dispatch('getLogin',{phone,code});
        },
        LoginByPhone:async function(){
          let timestamp = Date.parse(new Date());
          let res = await this.$store.dispatch('getLogin',{
            phone: this.phone,
            password: this.password,
            withCredentials: true,
            timestamp,
          });
          console.log(res);
          if(res.code==200){
            this.$store.dispatch('updateIsLogin',true);
            this.$store.commit('updateToken',res.token);
            this.$store.dispatch('getUserMessage',res.account.id);
            this.$store.dispatch('updateUser',res.profile);
            this.$router.push('/infoUser');
          }else{
            alert('手机号或者密码错误');
            this.password = '';
          }
        },
        getCode(){
          const {phone} = this;
          this.$store.dispatch('getPhoneCode',{phone});
        }
    },
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    position: relative;
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn{
        width: 2rem;
        height: .6rem;
    }
    .yanzhengma{
      position: absolute;
      top: 0.75rem;
      left:3.8rem;
    }
  }
}
</style>
