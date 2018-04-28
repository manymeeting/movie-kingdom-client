const dict = {
	GET: {
		ROOT: '/',
		SIGN_UP: '/signup',
		LOGIN: '/login',
		LOGOUT: '/logout',
		PROFILE: '/profile',
		EDIT_PROFILE: '/profile/edit',
		MOVIE_LIST: '/movies',
		HALL_LIST: '/halls',
		BUY_TICKETS: "/tickets/buy",
		PURCHASE_LIST: '/purchases',
		ADD_MOVIE: '/movie/add',
        EDIT_MOVIE: '/movie/edit',
        ADD_SCHEDULE: '/schedule/add',
		EDIT_SCHEDULE: '/schedule/edit',
		ADD_HALL: '/hall/add',
        EDIT_HALL: '/hall/edit',
		MOVIE_DETAILS: '/movie/details',
		MOVIE_DETAILS_SCHEDULES: '/movie/details/schedules',
		MOVIE_DETAILS_REVIEWS: '/movie/details/reviews',
		MOVIE_DETAILS_POST_REVIEW: '/movie/details/reviews/post',
		SEARCH_MOVIES_SCHEDULES: '/movies-schedules/search',
		NO_ACCESS: '/noaccess',
	},
	POST: {
		LOGIN: '/login',
		SIGN_UP: '/signup',
	},
	PUT: {

	},
	DELETE: {

	}
}

module.exports = dict;