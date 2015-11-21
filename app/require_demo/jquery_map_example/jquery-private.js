define(['jquery'], function(jq) {
	// 不明白为什么这里传入的jq为undefined
	// 所以先用$代替咯
	return $.noConflict(true);
});