const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    // 代理跨域
    devServer:{
      proxy:{
        '/api':{
          target:'https://music.163.com/',
          changOrigin:true,
          ws: true,
          pathRewrite:{'^/api':''},
        },
      }
    }
})