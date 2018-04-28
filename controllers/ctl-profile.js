let clientMessenger = require('../kafka/ClientMessenger');
let REST = require('../values/constants');

module.exports.postEditProfile = function (req, res, next) {
    let content = JSON.parse(req.body.userInfo);
    delete req.body.userInfo;
    let updateInfo = req.body;
    for (let key in updateInfo) {
        if (updateInfo[key].length !== 0) {
            content[key] = updateInfo[key];
        }
    }
    console.log('lxr', content);
    clientMessenger.APIHandler("/user/" + content.userId, REST.PUT, "users", content)
        .then(result => {
            console.log(result);
            // update userInfo to session
            req.session.user = result.user;
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
    res.redirect('/profile');
}