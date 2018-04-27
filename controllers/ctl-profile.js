let clientMessenger = require('../kafka/ClientMessenger');

module.exports.postEditProfile = function (req, res, next) {
    console.log(req.body);
    let content = Object.assign({}, userInfo, req.body);
    // clientMessenger.sendPOST("/user/" + userInfo.userId, "users", content)
    //     .then(result => {
    //         console.log(result);
    //         // persist user to session
    //         req.session.user = result.user;
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(400);
    //         req.session.MKFlash.error = err;
    //     });
    res.redirect('/profile');
}