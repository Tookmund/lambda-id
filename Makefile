include role.mk

create-%: %.zip
	aws lambda create-function --function-name "$*" --runtime nodejs12.x \
		--role "$(ROLE)" --handler "$*.handler" --zip-file "fileb://$<"

invoke-%: %
	aws lambda invoke --function-name "$*" "$@"

%: %.zip
	aws lambda update-function-code --function-name "$*" --zip-file "fileb://$<" > "$*"

%.zip: %.js
	zip -r "$@" $^
