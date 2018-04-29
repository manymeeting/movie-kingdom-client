let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.getProfile = function(req, res, next) {
    res.render('pg-profile', { profile_option: ''});
}

module.exports.getEditProfile = function(req, res, next) {
    res.render('pg-profile', { profile_option: 'edit'});
}

module.exports.postEditProfile = function (req, res, next) {
    let oldInfo = JSON.parse(req.body.userInfo);
    delete req.body.userInfo;
    let submitInfo = req.body;
    let updateInfo = {};
    for (let key in submitInfo) {
        if (submitInfo[key].length !== 0) {
            updateInfo[key] = submitInfo[key];
        }
    }
    console.log('updateInfo', updateInfo);
    clientMessenger.send("/user/" + oldInfo.userId, API_METHOD.PUT, "users", updateInfo)
        .then(result => {
            console.log('result', result);
            // update userInfo to session
            req.session.user = result.user;
            res.redirect('/profile');
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
            alert("profile update failed due to " + err);
            res.redirect('/profile/edit');
        });
}

module.exports.deleteProfile = function (req, res, next) {
    let userId = req.body.userId;
    clientMessenger.send("/user/" + userId, API_METHOD.DELETE, "users", req.body)
        .then(result => {
            console.log('result', result);
            // delete user session
            delete req.session.user;
            res.redirect('/login');
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
            alert("account deletion failed due to " + err);
            res.redirect('/profile');
        });
}