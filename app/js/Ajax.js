function ajax(options) {
	options = extend({
		method: 'get',
		async: true,
		callback: function(res) {
			console.log(res);
		}
	}, options);

	var xml = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xml.onreadystatechange = function() {
		if (xml.readyState === 4 && xml.status === 200) {
			options.callback(xml.responseText);
		}
	}
	xml.open(options.method, options.url, options.async);
	xml.send();

	function extend(des, source) {
		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				des[key] = source[key];
			}
		}
		return des;
	}
}