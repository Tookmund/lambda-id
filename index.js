const AWS = require("aws-sdk")

exports.handler = async function(event, context) {
	return {
		"statusCode": 200,
		"statusDescription": "200 OK",
		"isBase64Encoded": false,
		"headers": {
			"Content-Type": "text/html"
		},
		"body": "<h1>Hello from Lambda!</h1>"
	}
}
