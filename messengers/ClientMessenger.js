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
