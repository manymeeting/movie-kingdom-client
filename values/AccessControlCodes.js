var PathDict = require('./PathDictionary');

const Roles = {
	GUEST : 0,
	USER : 1,
	HAD : 2,
	SAD : 3
};
module.exports.Roles = Roles;

// 0: GUEST, 1:User, 2: HAD (Hall Admin), 3: SAD (Super Admin)
const ControlCodes = {
	PathDict.GET.ROOT: GUEST,
	PathDict.GET.SIGN_UP: GUEST,
	PathDict.GET.LOGIN: GUEST,
	PathDict.GET.LOGOUT: GUEST,
	PathDict.GET.PROFILE: GUEST,
	PathDict.GET.EDIT_PROFILE: GUEST,
	PathDict.GET.MOVIE_LIST: GUEST,
	PathDict.GET.HALL_LIST: GUEST,
	PathDict.GET.BUY_TICKETS: GUEST,
	PathDict.GET.PURCHASE_LIST: GUEST,
}

module.exports.ControlCodes = ControlCodes;