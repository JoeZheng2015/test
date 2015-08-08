window.onload = function () {
    function quickSort(arr) {
        var  l = arr.length;
         if (l <= 1) {
            return arr;
         }
         else {
            var middleIndex = Math.floor(l / 2);
            var middle = arr.splice(middleIndex, 1)[0];
            var left = [];
            var right = [];

            for (var i = 0; i < l-1; i++) {
                if (arr[i] <= middle) {
                    left.push(arr[i]);
                }
                else {
                    right.push(arr[i]);
                }
            }
            return quickSort(left).concat(middle, quickSort(right));
         }
    }
    console.log(quickSort([2,3,5,1,4]));
};