//导入 html-webpack-plugin 这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')

//创建 html 插件的实例对象
const htmlPlugin = new HtmlPlugin({
    //指定原文件的存放路径
    template: './src/index.html',
    //指定生成的文件的存放路径
    filename: './index.html'
})


module.exports = {
    mode: 'development',
    //通过 plugins 节点，是 htmlPlugin 生效
    //插件的数组，将来 webpack 在运行时，会加载调用这些插件
    plugins: [htmlPlugin],
    devServer: {
        //初次打包后自动打开浏览器
        open: true,
        //修改端口号
        //在http协议中，如果端口号是80,则可以被省略
        port: 80,
        //指定运行的主机地址
        host: '127.0.0.1'
    },
    module: {
        rules: [
            //test是文件类型
            //use表示对应要调用的loader
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            //文件后缀名的匹配规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            //处理图片文件的loader
            //如果需要调用的 loader 只有一个，则值传递一个字符串也行，如有多个loader
            // limit用来指定**图片的大小**，单位是字节(byte)
            // 只有 ≤ limit 大小的图片，才会被转为base64格式的图片
            { test: /\.jpg|png|gif$/, use: 'url-loader?limit-22229' },
            //在配置babel-loader的时候，程序员只需要把自己的代码进行转换即可；一定要排除 node_modules目录中的js文件
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}
