var kafkaClientService = require('./KafkaClientService');
let HTTP_METHOD = require('../values/constants').HTTP_METHOD;

module.exports.send = function (url, method, topic, params) {

	return new Promise((resolve, reject) => {
		var content = {
			method: method,
			apiURL: url,
			topicRes: topic + ".response"
		};
		if(params && method !== HTTP_METHOD.GET) {
			content.params = params;
		}

		kafkaClientService.sendMessage(topic, 0, content, function(sendErr, serviceRes){
			if(sendErr)
			{
				reject(sendErr);
				return;
			}
			resolve(serviceRes);
		});

	});

}
