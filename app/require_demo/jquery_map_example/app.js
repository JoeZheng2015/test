// 这里获取的jquery实际是通过jquery-private处理后返回的jquery
require(['jquery'], function(jq) {
	console.log(jq);
})