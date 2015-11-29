requirejs.config({
	map: {
		// 所有需要jquery的模块，都会得到jquery-private模块
		'*': {'jquery': 'jquery-private'},
		// 而jquery-private模块，请求，则可以得到真正的jquery模块
		'jquery-private': {'jquery': '../../../bower_components/jquery/dist/jquery'}
	}
});
require(['app']);