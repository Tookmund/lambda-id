
%: %.upload
	aws lambda invoke --function-name "$@" "$@"

%.upload: %.zip
	aws lambda update-function-code --function-name "$*" --zip-file "fileb://$<" > "$*.upload"

%.zip: %.js node_modules package-lock.json
	zip -r "$@" $^
