// 把function(modules, exports){}作为参数传进来	
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
		// 调用传入的函数
		// 执行上下文是模块暴露的对象，这里是空对象
		// 第一个参数是模块对象（对应函数中的modules）
		// 第二个参数是暴露的对象（对应函数的exports）
		// 第三个参数__webpack_require__函数
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// Flag the module as loaded
		module.loaded = true;

		// Return the exports of the module
		// 把暴露的对象返回
		// 没有看到赋值，那就一直为控对象？
		return module.exports;
	}


	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// __webpack_public_path__
	__webpack_require__.p = "";

	// Load entry module and return exports
	// 执行函数
	// 这里只打包一个函数，所以传入的模块Id只有一个0
	return __webpack_require__(0);
})([
/* 0 */
	function(module, exports) {
		document.write('成功了');
	}
]);