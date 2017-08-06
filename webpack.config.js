
const webpack = require("webpack");
const path = require("path");
const WebpackMD5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const projectDir = path.resolve(__dirname, './');
module.exports = function (args){
  let entryMap = {
    index: "./webapp/js/index.js",
    login: "./webapp/js/user/login.js",
    register: "./webapp/js/user/register.js",
    forget_password: "./webapp/js/user/forget_password.js",
  }
  let config = {
    entry: entryMap,
    output:{
      path:path.resolve(projectDir, './public'),
      filename:"dist/js/[name].js",
      // filename:"dist/js/[name][chunkhash:7].js",
      // chunkFilename:"dist/js/[name].[chunkhash:7].js"
    },
    module: {
      rules: [
        // {test: require.resolve('jquery'), use:'expose?jQuery!expose?$'},
        {test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'},
        {test:/\.(css|less)$/,use:ExtractTextPlugin.extract({use:['css-loader','less-loader'],fallback: 'style-loader'})},
      ]
    },
    plugins: [
      new WebpackMD5Hash(),

      new webpack.optimize.CommonsChunkPlugin({
        name:'vendor',
        allChunks: true,
      }),
      new ExtractTextPlugin({
        filename:"dist/css/[name].css",
        disable: false,
        // filename:"public/dist/css/[name].[contenthash:7].css",
        allChunks:true
      }),
      new CleanWebpackPlugin(
        ['public/dist/js/*.js','public/dist/css/*.css'],
        {
          root: __dirname, //根目录
          verbose: true, //控制台输出
          dry: false //启用删除文件
        }
      ),
    ]
  }
  if(args.env==='production'){
    config.output.filename="dist/js/[name].[chunkhash:7].js";
    config.output.chunkFilename="dist/js/[name].[chunkhash:7].js";
    config.watch = false;
    config.plugins = (config.plugins||[]).concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': "'production'",
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }
  return config;
}
