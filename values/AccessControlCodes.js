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
ControlCodes[PathDict.GET.MOVIE_BY_GENRE] = Roles.GUEST;
ControlCodes[PathDict.GET.BUY_TICKETS] = Roles.GUEST;
ControlCodes[PathDict.GET.PURCHASE_LIST] = Roles.GUEST;
ControlCodes[PathDict.GET.MOVIE_DETAILS] = Roles.GUEST;
ControlCodes[PathDict.GET.MOVIE_DETAILS_SCHEDULES] = Roles.GUEST;
ControlCodes[PathDict.GET.MOVIE_DETAILS_REVIEWS] = Roles.GUEST;
ControlCodes[PathDict.GET.MOVIE_DETAILS_POST_REVIEW] = Roles.USER;
ControlCodes[PathDict.GET.MULTI_TYPE_SEARCH] = Roles.GUEST;
ControlCodes[PathDict.GET.NO_ACCESS] = Roles.GUEST;

//below lies Hall Admin access
ControlCodes[PathDict.GET.ADD_SCHEDULE] = Roles.GUEST;
ControlCodes[PathDict.GET.EDIT_SCHEDULE] = Roles.GUEST;

//below lies Super Admin access
ControlCodes[PathDict.GET.ADD_HALL] = Roles.GUEST;
ControlCodes[PathDict.GET.EDIT_HALL] = Roles.GUEST;

//below lies both Hall and Super access
ControlCodes[PathDict.GET.ADD_MOVIE] = Roles.GUEST;
ControlCodes[PathDict.GET.EDIT_MOVIE] = Roles.GUEST;


module.exports.ControlCodes = ControlCodes;