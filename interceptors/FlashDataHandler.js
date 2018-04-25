var FlashDataHandler = function(req, res, next) {
	// bind flash data to request
	req.MK = req.MK ? req.MK : {};

	if(req.session.MKFlash)
	{
		req.MK = JSON.parse(JSON.stringify(req.session.MKFlash));
		
	}
	
	req.session.MKFlash = {}; // clear/init flash data
	
	next();
}

module.exports = FlashDataHandler;