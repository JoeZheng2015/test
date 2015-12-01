// 将app.js作为一个专门的配置文件使用
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app"
    },
    // 定义两个插件对jquery的依赖
    "shim": {
        "jquery.alpha": ["jquery"],
        "jquery.beta": ["jquery"]
    }
});

// 载入main.js启动整个脚本
requirejs(["app/main"]);
