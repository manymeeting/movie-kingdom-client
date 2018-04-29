let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;
let PathDict = require('../values/PathDictionary');

module.exports.getAddHall = function(req, res, next) {
    res.render('pg-add-edit-hall', { hall_option: 'Add', hall_Id: '' });
}

module.exports.getEditHall = function(req, res, next) {
    res.render('pg-add-edit-hall', { hall_option: 'Edit', hall_Id: '' });
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
                alert('cannot add this theatre due to unknown city');
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
            req.session.MKFlash.error = err;
        })
}

module.exports.postEditHall = function(req, res, next) {
    let theatreId = 503;

}