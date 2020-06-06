const AWS = require("aws-sdk")

var ids = null

function loadids() {
	var s3 = new AWS.S3()
	s3.getObject({
		"Bucket": "lambda-id",
		"Key": "ids.json",
	}, function (err, data) {
		if (err) {
			ids = null
			return { "status": false, "error": err }
		}
		else {
			ids = data
			return { "status": true }
		}
	});
}

function error(status, body) {
	return {
		"statusCode": status,
		"isBase64Encoded": false,
		"body": body
	}

}

exports.handler = async function(event, context) {
	if (ids == null) {
		let lids = loadids()
		if (!lids["status"]) {
			return error(500, "Unable to load data! "+JSON.stringify(lids["error"], null, "\t"))
		}
	}
	if (event["path"] == undefined) {
		return {
			"statusCode": 404,
			"isBase64Encoded": false,
			"body":"Must be called as an API!"
		}
	}
	return {
		"statusCode": 200,
		"statusDescription": "200 OK",
		"isBase64Encoded": false,
		"headers": {
			"Content-Type": "text/json",
			"X-Clacks-Overhead:": "GNU Terry Pratchett"
		},
		"body": ids
	}
}
