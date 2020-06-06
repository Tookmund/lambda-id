const AWS = require("aws-sdk");

var ids = null;

function error(status, body) {
	return {
		"statusCode": status,
		"isBase64Encoded": false,
		"body": body
	};
}

exports.handler = async function(event, context) {
	let ret = null;
	if (ids == null) {
		let s3 = new AWS.S3();
		let promise = s3.getObject({
			"Bucket": process.env.S3_BUCKET,
			"Key": process.env.S3_KEY
		}).promise();
		promise.then(
			function(data) {
				ids = JSON.parse(data.Body.toString());
			},
			function(err) {
				ret = err;
			});
		await promise;
		if (ret != null) error(500, ret);
	}

	if (event["path"] == undefined) {
		return {
			"statusCode": 404,
			"isBase64Encoded": false,
			"body":"Must be called as an API!"
		};
	}
	let find = event["path"].match(/^\/ids(?:\/(\d+)(?:\/(\w+))?)?(?:\/)?$/);
	if (find == null) return error(400, "Bad Request");
	if (find[1] == null) ret = ids;
	else if (find[2] == null) ret = ids[find[1]];
	else ret = ids[find[1]][find[2]];
	return {
		"statusCode": 200,
		"statusDescription": "200 OK",
		"isBase64Encoded": false,
		"headers": {
			"Content-Type": "text/json",
			"X-Clacks-Overhead:": "GNU Terry Pratchett"
		},
		"body": JSON.stringify(ret)
	}
}
