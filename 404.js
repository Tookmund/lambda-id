const AWS = require("aws-sdk")

exports.handler = async function(event, context) {
	return {
		"statusCode": 404,
		"statusDescription": "404 Not Found",
		"isBase64Encoded": false,
		"headers": {
			"Content-Type": "text/html",
			"X-Clacks-Overhead:": "GNU Terry Pratchett"
		},
		"body": "<html><h1>We couldn't process your request!</h1><pre>"+JSON.stringify(event, null, "\t")+"</pre></html>"
	}
}
