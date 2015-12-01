require.config({
	baseUrl: '../../bower_components',
	paths: {
		jquery: 'jquery/dist/jquery.min'
	}
});
require(['jquery'], function($) {
	console.log($);
});