function template(str) {
    return function(obj) {
        return str.replace(/<%=(.+?)%>/g, function(item, key) {
            key = key.replace(/^\s*|\s*$/g, '');
            return obj[key] || key;
        });
    }
}