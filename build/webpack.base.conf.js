'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack =require('webpack');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//获取多入口文件
const entries= utils.getEntry('../src/pages/**/*.js');
const chunks=Object.keys(entries);
const arr= (function(){
  //多入口文件配置
  let objTitle =[{title:'用户登陆'},{title:'首页'},{title:'内容管理'},{title:'视频资源'},{title:'用户管理'},{title:'运维管理'}]
 
  let htmlArr=[];
  chunks.forEach((t,i)=>{
    let conf={
      filename:t+'.html',
      template:'index.html',
      inject:true,
      chunks:['vendor','common','manifest', t]
    }
    if(objTitle[i]){
      conf.title=objTitle[i].title;
    }else{
      conf.title='dddddddd';
    }
    htmlArr.push(new HtmlWebpackPlugin(conf));
  });
  return htmlArr;
})();
module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js'
  // },
  entry:entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': 'jquery'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|TTF)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins:[
    // new webpack.optimize.CommonsChunkPlugin('static/build.js'),
    
    // 配置提取出的样式文件
    // new ExtractTextPlugin('css/[name].css'),
    //引入jqury
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ].concat(arr),
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
