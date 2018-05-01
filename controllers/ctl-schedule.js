let PathDict = require('../values/PathDictionary');
let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.getAddSchedule = function(req, res, next) {
    //must get movieID first
    let movieId = req.query.movieID;
    clientMessenger.send(`/movie-format/${movieId}`, API_METHOD.GET, "movies")
        .then(result => {
            console.log(result);
            res.render('pg-add-edit-schedule', {
                schedule_option: 'Add',
                formats: result.formats,
                scheduleId: '',
                movieId: movieId,
                scheduleInfo: {}
            });
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
}

module.exports.getEditSchedule = function(req, res, next) {
    let movieId = req.query.movieID;
    let scheduleId = req.query.scheduleID;
    let formats = {};
    clientMessenger.send(`/movie-format/${movieId}`, API_METHOD.GET, "movies")
        .then(result => {
            console.log(result);
            formats = result.formats;
            return clientMessenger.send(`/schedule/${scheduleId}`, API_METHOD.GET, "schedules");
        })
        .then(result => {
            console.log(result);
            res.render('pg-add-edit-schedule', {
                schedule_option: 'Edit',
                formats: formats,
                scheduleId: scheduleId,
                movieId: movieId,
                scheduleInfo: result.schedule
            });
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
}

module.exports.postAddSchedule = function (req, res, next) {
    let content = req.body;
    content.showtime = timeConversion(content.showtime);
    console.log('lxr', content);
    clientMessenger.send(`/schedule`, API_METHOD.POST, "schedules", content)
        .then(result => {
            console.log(result);
            res.redirect(PathDict.GET.SUCCESS);
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
}

module.exports.postEditSchedule = function (req, res, next) {
    let content = req.body;
    let scheduleId = req.body.scheduleId;
    content.showtime = timeConversion(content.showtime);
    console.log('lxr', content);
    clientMessenger.send(`/schedule/${scheduleId}`, API_METHOD.PUT, "schedules", content)
        .then(result => {
            console.log(result);
            res.redirect(PathDict.GET.SUCCESS);
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
}

//TODO: use advanced time picker to remove this process
function timeConversion(time) {
    time += ":00";
    return time;
}