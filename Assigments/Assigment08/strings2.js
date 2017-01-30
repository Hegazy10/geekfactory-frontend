exports.lengthOfLastWord = function (str) {
    var count = 0;
	str = str.trim();
	if(str != " ") {
		var word = str.substring(str.lastIndexOf(" ")+1);
		for(var i=0;i<word.length;i++) {
			count++;
		}
		return count;
	}
	return 0;
}
