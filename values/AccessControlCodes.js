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
//below lies Guest accessible paths
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
ControlCodes[PathDict.GET.HALL_DETAILS] = Roles.GUEST;
ControlCodes[PathDict.GET.MOVIE_DETAILS] = Roles.GUEST;
ControlCodes[PathDict.GET.MOVIE_DETAILS_SCHEDULES] = Roles.GUEST;
ControlCodes[PathDict.GET.MOVIE_DETAILS_REVIEWS] = Roles.GUEST;
ControlCodes[PathDict.GET.MULTI_TYPE_SEARCH] = Roles.GUEST;
ControlCodes[PathDict.GET.SUCCESS] = Roles.GUEST;
ControlCodes[PathDict.GET.NO_ACCESS] = Roles.GUEST;
ControlCodes[PathDict.POST.LOGGER_PATH] = Roles.GUEST;
ControlCodes[PathDict.GET.SUM_CLICK_BY_PATH] = Roles.GUEST;
ControlCodes[PathDict.GET.TOP_TEN_MOVIE_REVENUES] = Roles.GUEST;
ControlCodes[PathDict.GET.TOP_TEN_HALL_REVENUES] = Roles.GUEST;
ControlCodes[PathDict.GET.TOP_TEN_CITY_REVENUES] = Roles.GUEST;
ControlCodes[PathDict.GET.TOP_TEN_REVIEWED_MOVIE] = Roles.GUEST;

//below lies User accessible paths
ControlCodes[PathDict.GET.MOVIE_DETAILS_POST_REVIEW] = Roles.USER;
ControlCodes[PathDict.GET.USER_ORDERS] = Roles.USER;

//below lies Hall Admin accessible paths
ControlCodes[PathDict.GET.ADD_SCHEDULE] = Roles.HAD;
ControlCodes[PathDict.GET.EDIT_SCHEDULE] = Roles.HAD;
ControlCodes[PathDict.GET.MOVIE_DETAILS_ORDERS] = Roles.HAD;

//below lies Super Admin accessible paths
ControlCodes[PathDict.GET.ADD_HALL] = Roles.SAD;
ControlCodes[PathDict.GET.EDIT_HALL] = Roles.SAD;
ControlCodes[PathDict.GET.ADMIN_ORDERS] = Roles.SAD;
ControlCodes[PathDict.GET.ADMIN_DASHBOARD] = Roles.SAD;

//below lies both Hall and Super accessible paths
ControlCodes[PathDict.GET.ADD_MOVIE] = Roles.HAD;
ControlCodes[PathDict.GET.EDIT_MOVIE] = Roles.HAD;



module.exports.ControlCodes = ControlCodes;