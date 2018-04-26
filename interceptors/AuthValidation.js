var PathDict = require('../values/PathDictionary');
var ControlCodes = require('../values/AccessControlCodes').ControlCodes;
var Roles = require('../values/AccessControlCodes').Roles;
var StringUtils = require('../utils/StringUtils');

var AuthValidaion = function(req, res, next) {
	var user = req.session.user;
	var baseURL = StringUtils.stripQueryStr(req.originalUrl);
	if(!user)
	{
		if(ControlCodes[baseURL] === Roles.GUEST)
		{
			next();
		}
		else
		{
			res.redirect(PathDict.GET.NO_ACCESS);
		}
		
		return;
	}

	if(user.role && user.role >= ControlCodes[baseURL])
	{
		next();
		return;
	}

	res.redirect(PathDict.GET.NO_ACCESS);
}

module.exports = AuthValidaion;