$(function(){

	let path = window.location.pathname;
	console.log($("#loggerUserInfo").text());
	let user = JSON.parse($("#loggerUserInfo").text());

	var URL = '/logger/path';

	var headers = new Headers({
		"Content-Type": "application/json"
	});
	var postRequest = new Request(URL, {
		method: 'POST', 
		headers: headers, 
		body: JSON.stringify({
            path: path,
            date: new Date(),
            user: user
        })
	});
	
	fetch(postRequest).then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log('Fetch Error: ', error);
	});

})