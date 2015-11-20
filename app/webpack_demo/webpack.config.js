module.exports = {
	entry: './entry.js', // 指定打包哪个文件（即那个Js文件是入口文件）
	output: {
		path: __dirname, // 这个应该是当前哪个路径，就返回哪个路径
		filename: 'bundle.js' // 返回的文件名
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style!css'} // 匹配以css结尾的，用style-loader和css-loader
		]
	}
};