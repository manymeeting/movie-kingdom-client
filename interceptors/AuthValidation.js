var PathDict = require('../values/PathDictionary');
var ControlCodes = require('../values/AccessControlCodes').ControlCodes;
var Roles = require('../values/AccessControlCodes').Roles;

var AuthValidaion = function(req, res, next) {
	var user = req.session.user;
	if(!user)
	{
		if(ControlCodes[req.originalUrl] === Roles.GUEST)
		{
			next();
		}
		else
		{
			req.redirect(PathDict.GET.LOGIN);
		}
		
		return;
	}

	next();

	//TODO: uncommnet below once user.role is provided
	// if(user.role && user.role >= ControlCodes[req.originalUrl])
	// {
	// 	next();
	// 	return;
	// }

	// req.redirect(PathDict.GET.NO_ACCESS);
}

module.exports = AuthValidaion;