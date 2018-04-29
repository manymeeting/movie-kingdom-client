let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;
let PathDict = require('../values/PathDictionary');

module.exports.getProfile = function(req, res, next) {
    let url = req.originalUrl;
    let meUser = req.session.user;
    let meId = meUser.userId;
    let id = trimId(url, meId);
    if (id !== meId) {
        clientMessenger.send("/user/" + id, API_METHOD.GET, "users")
            .then(result => {
                console.log('lxr', result);
                res.render('pg-profile', {profile_option: '', currentUser: result.user});
            })
            .catch(err => {
                console.error(err);
                res.status(400);
                req.session.MKFlash.error = err;
                alert("search user failed due to " + err);
                res.redirect(PathDict.GET.PROFILE);
            });
    } else {
        res.render('pg-profile', {profile_option: '', currentUser: meUser});
    }
}

function trimId(url, meId) {
    let query = url.split("?");
    if (query.length === 1) {
        return meId;
    }
    let idQuery = query[1];
    let id = idQuery.split("=")[1];
    return id;
}

module.exports.getEditProfile = function(req, res, next) {
    let url = req.originalUrl;
    let meUser = req.session.user;
    let meId = meUser.userId;
    let id = trimId(url, meId);
    if (id !== meId) {
        clientMessenger.send("/user/" + id, API_METHOD.GET, "users")
            .then(result => {
                console.log('lxr', result);
                res.render('pg-profile', {profile_option: 'edit', currentUser: result.user});
            })
            .catch(err => {
                console.error(err);
                res.status(400);
                req.session.MKFlash.error = err;
                alert("search user failed due to " + err);
                res.redirect(PathDict.GET.PROFILE);
            });
    } else {
        res.render('pg-profile', {profile_option: 'edit', currentUser: meUser});
    }
}

module.exports.postEditProfile = function (req, res, next) {
    console.log('lxr current', req.body.currentUser);
    let oldInfo = JSON.parse(req.body.currentUser);
    delete req.body.currentUser;
    let submitInfo = req.body;
    let updateInfo = {};
    for (let key in submitInfo) {
        if (submitInfo[key].length !== 0) {
            updateInfo[key] = submitInfo[key];
        }
    }
    let meUser = req.session.user;
    clientMessenger.send("/user/" + oldInfo.userId, API_METHOD.PUT, "users", updateInfo)
        .then(result => {
            console.log('result', result);
            // update userInfo to session only if the updated user is me user
            if (result.user.userId === meUser.userId) {
                req.session.user = result.user;
            }
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