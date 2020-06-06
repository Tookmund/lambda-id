FUNCTION=hello-world

$(FUNCTION): $(FUNCTION).upload
	aws lambda invoke --function-name "$(FUNCTION)" "$(FUNCTION)"

$(FUNCTION).upload: $(FUNCTION).zip
	aws lambda update-function-code --function-name "$(FUNCTION)" --zip-file "fileb://$(FUNCTION).zip" > "$(FUNCTION).upload"

$(FUNCTION).zip: index.js node_modules package-lock.json
	zip -r "$(FUNCTION).zip" $^
