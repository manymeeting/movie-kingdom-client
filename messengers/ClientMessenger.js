var kafkaClientService = require('../kafka/KafkaClientService');

module.exports.sendGET = function (url, topic) {

	return new Promise((resolve, reject) => {
		var content = {
			method: "get",
			apiURL: url,
			topicRes: topic + ".response"
		};
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

module.exports.sendPOST = function (url, topic, params) {
	return new Promise((resolve, reject) => {
		var content = {
			method: "post",
			apiURL: url,
			topicRes: topic + ".response",
			params: params
		};
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