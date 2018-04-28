let clientMessenger = require('../kafka/ClientMessenger');
let HTTP_METHOD = require('../values/constants').HTTP_METHOD;

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
    clientMessenger.APIHandler("/user/" + oldInfo.userId, HTTP_METHOD.PUT, "users", updateInfo)
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