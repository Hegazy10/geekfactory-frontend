exports.sum = function (arr) {
    let i = 0;
    let _sum = 0;
    while (i < arr.length) {
        _sum += arr[i];
        i++;
    }
    return _sum;
}
exports.odds = function (arr) {
    let i = 0;
    arr_odd = [];
    while (i < arr.length) {
        if (arr[i] % 2 != 0) {
            arr_odd.push(arr[i]);
        }
        i++;
    }
    return arr_odd;
}
exports.find = function (arr, match = function (v) {
 if(arr.indexOf(v) != -1) {
       return true;
   }
   return false;
}) {
   n = 50;
   if(match(n)) {
       return n;
   }
}