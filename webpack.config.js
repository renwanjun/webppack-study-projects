/*
*__dirname 是node.js中的一个全部变量，它只想当前执行脚本所在的目录
*
*/

var webpack=require('webpack');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports={
	devtool:'eval-source-map',       //配置生成Source Maps，选择合适的选项
	entry:__dirname+"/app/main.js",  // 入口
	output:{
		path:__dirname+"/public",   // 打包后文件存放的地方
		// publicPath: '/assets/',
		filename:"bundle.js"       // 打包后输出文件的文件名
	},
	module:{
		loaders: [
          {
            test: /\.json$/,
            loader: "json-loader"
          }
		  ,{
			  test:/\.js$/,
			  exclude:/node_modules/,  //屏蔽不需要处理的文件夹
			  loader:"babel-loader",   //在webpack的module部分的loaders里进行配置即可
			//   query:{
			// 	  presets:['es2015','react']
			//   }
		  }
		  ,{
			  test:/\.css$/,
			  loader:"style-loader!css-loader?modules|postcss-loader"
		  }
         ]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:__dirname+"/app/index.tmpl.html"
		})
		,new webpack.HotModuleReplacementPlugin()   //  热加载插件
		,new webpack.LoaderOptionsPlugin({
			options:{
				postcss:function(){
					return [precss,autoprefixer];
				}
			},
			devServer: {
				// proxy: {
				// 	"/api/*": {
				// 		target: "https://cnodejs.org",
				// 		secure: false
				// 	}
				// },
				// port:8888,
				contentBase: "./public", //本地服务器所加载的页面所在的目录
				colors: true, //终端中输出结果为彩色
				historyApiFallback: true, //不跳转
				inline: true, //实时刷新,
				hot:true
			}
		})
	],
	// devServer:{                  //让你的浏览器监测你的代码的修改，并自动刷新修改后的结果
	// 	contentBase:'./public',  //本地服务器所加载的页面所在的目录
	// 	colors:true,             //终端中输出结果为彩色
	// 	historyApiFallback:true, //不跳转
	// 	inline:true,              //实时刷新
	// 	hot:true
	// }
}