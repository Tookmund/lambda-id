include role.mk
.PHONY: create-%

create-%: %.zip
	aws lambda create-function --function-name "$*" --runtime nodejs12.x \
		--role "$(ROLE)" --handler "$*.handler" --zip-file "fileb://$<"

%: %.upload
	aws lambda invoke --function-name "$@" "$@"

%.upload: %.zip
	aws lambda update-function-code --function-name "$*" --zip-file "fileb://$<" > "$*.upload"

%.zip: %.js node_modules package-lock.json
	zip -r "$@" $^
