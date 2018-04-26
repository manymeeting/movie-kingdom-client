var PathDict = require('./PathDictionary');

const Roles = {
	GUEST : 0,
	USER : 1,
	HAD : 2,
	SAD : 3
};
module.exports.Roles = Roles;

// 0: GUEST, 1:User, 2: HAD (Hall Admin), 3: SAD (Super Admin)
const ControlCodes = {};
ControlCodes[PathDict.GET.ROOT] = Roles.GUEST;
ControlCodes[PathDict.GET.SIGN_UP] = Roles.GUEST;
ControlCodes[PathDict.GET.LOGIN] = Roles.GUEST;
ControlCodes[PathDict.GET.LOGOUT] = Roles.GUEST;
ControlCodes[PathDict.GET.PROFILE] = Roles.GUEST;
ControlCodes[PathDict.GET.EDIT_PROFILE] = Roles.GUEST;
ControlCodes[PathDict.GET.MOVIE_LIST] = Roles.GUEST;
ControlCodes[PathDict.GET.HALL_LIST] = Roles.GUEST;
ControlCodes[PathDict.GET.BUY_TICKETS] = Roles.GUEST;
ControlCodes[PathDict.GET.PURCHASE_LIST] = Roles.GUEST;

ControlCodes[PathDict.GET.NO_ACCESS] = Roles.GUEST;
ControlCodes[PathDict.GET.ADD_MOVIE] = Roles.GUEST; // TODO: change to HAD 

module.exports.ControlCodes = ControlCodes;