var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 

module.exports.postClickLog = function(req, res, next) {

	var newClickLog = {
		path: req.body.path,
		date: req.body.date,
		user: req.body.user
	};

	mongoUtil.getMongoConn(function(db) {
		db.collection('log.clicks.paths').insertOne(newClickLog, function(err, result) {
			if(err)
			{
				throw err;
			}
			console.log(result.ops);
			res.type('json');
			res.status(201).send(JSON.stringify(result.ops[0]));
		});
	});
}
