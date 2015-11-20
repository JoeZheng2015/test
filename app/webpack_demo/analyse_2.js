(function(modules) { // webpackBootstrap
	// The module cache
	var installedModules = {};

	// The require function
	function __webpack_require__(moduleId) {

		// Check if module is in cache
		if(installedModules[moduleId])
			return installedModules[moduleId].exports;

		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			exports: {},
			id: moduleId,
			loaded: false
		};

		// Execute the module function
		// 这里会先执行第一个模块
		// 把__webpack_require__函数传进第一个模块，然后以参数为1执行
		// 获得content的暴露（module.exports = '这是从content来的';）这个string
		// 最后浏览器打印这是从content来的
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// Flag the module as loaded
		module.loaded = true;

		// Return the exports of the module
		return module.exports;
	}


	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// __webpack_public_path__
	__webpack_require__.p = "";

	// Load entry module and return exports
	// 这里始终以传入的第一个参数作为入口
	return __webpack_require__(0);
})
/************************************************************************/
([
	/* 0 */
	// 会把入口放在第一位（入口即webpack 里指定打包的那个文件）
	// 与没有依赖的analyse_1不一样，这里多了个__webpack_require__参数
	function(module, exports, __webpack_require__) {
		// 里面的内容是entry.js的全部内容，但会把require函数替换成__webpack_reqire__
		// __webpack_require__是个函数
		// 这里指定依赖第二个模块
		document.write(__webpack_require__(1));
	},
	/* 1 */
	// 第二个模块没有依赖，所以还是两个参数
	function(module, exports) {
		// 里面的内容是content的全部内容
		module.exports = '这是从content来的';
	}
]);