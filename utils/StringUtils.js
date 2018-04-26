var StringUtils = {
	stripQueryStr: function(url){
		var queryStartPos = url.indexOf("?");
		if(queryStartPos >= 0)
		{
			return url.substring(0, queryStartPos);
		}
		return url;
	}
}

module.exports = StringUtils;