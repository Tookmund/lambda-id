const AWS = require("aws-sdk")

exports.handler = async function(event, context) {
	return {
		"statusCode": 200,
		"statusDescription": "200 OK",
		"isBase64Encoded": false,
		"headers": {
			"Content-Type": "text/html",
			"X-Clacks-Overhead:": "GNU Terry Pratchett"
		},
		"body": "<h1>Hello from Lambda!</h1><p>Hopefully I'll be the only one who can run this</p><p>"+JSON.stringify(event)+"</p>"
	}
}
