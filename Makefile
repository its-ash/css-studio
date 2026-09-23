run:
	npm run dev

build:
	npm run generate
	rm -rf docs
	mkdir -p docs
	cp -r .output/public/* docs/
	touch docs/.nojekyll
	echo "css-studio.itsash.in" > docs/CNAME

deploy: build
	git checkout main
	git add -A
	git commit -m "$$(copilot -sp 'Analyze the staged git changes and generate a concise commit message. Output ONLY the commit message. Do not execute any commands. Do not include quotes, markdown, explanation, or bullet points.')"
	git push origin main