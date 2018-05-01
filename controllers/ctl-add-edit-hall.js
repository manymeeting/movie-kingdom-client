let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;
let PathDict = require('../values/PathDictionary');

module.exports.getAddHall = function(req, res, next) {
    res.render('pg-add-edit-hall', { hall_option: 'Add', hallInfo: {}, error: req.MK.error });
}

module.exports.getEditHall = function(req, res, next) {
    //should get theatre info and pass it into edit hall page
    let hallId = req.query.hallID;
    clientMessenger.send(`/theater/${hallId}`, API_METHOD.GET, "theaters")
        .then(result => {
            console.log(result);
            res.render('pg-add-edit-hall', { hall_option: 'Edit', hallInfo: result.theater, error: req.MK.error });
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
}

module.exports.postAddHall = function(req, res, next) {
    let content = req.body;
    let cityPattern = content.cityname;
    clientMessenger.send(`/search-cities/${cityPattern}`, API_METHOD.GET, "theaters")
        .then(result => {
            if (result.content && result.content.length > 0) {
                let cityId = result.content[0].cityId;
                delete content.cityname;
                content.cityId = cityId;
                return clientMessenger.send(`/theater`, API_METHOD.POST, "theaters", content);
            } else {
                return Promise.reject();
            }
        })
        .then(result => {
            console.log('lxr', result);
            res.redirect(PathDict.GET.HALL_LIST);
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err || {message: 'unknown city'};
            res.redirect(PathDict.GET.ADD_HALL);
        })
}

module.exports.postEditHall = function(req, res, next) {
    //should use req.body param to do PUT operation to backend
    let content = req.body;
    let cityPattern = content.cityname;
    let theatreId = content.theatreId;
    clientMessenger.send(`/search-cities/${cityPattern}`, API_METHOD.GET, "theaters")
        .then(result => {
            if (result.content && result.content.length > 0) {
                let cityId = result.content[0].cityId;
                delete content.cityname;
                content.cityId = cityId;
                return clientMessenger.send(`/theater/${theatreId}`, API_METHOD.PUT, "theaters", content);
            } else {
                return Promise.reject();
            }
        })
        .then(result => {
            console.log('lxr', result);
            res.redirect(PathDict.GET.HALL_LIST);
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err || {message: 'unknown city'};
            res.redirect(PathDict.GET.EDIT_HALL);
        })
}