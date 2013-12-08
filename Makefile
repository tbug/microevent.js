.PHONY: test
test: ;
	./node_modules/.bin/jscoverage microevent.js cov-microevent.js
	./node_modules/.bin/mocha --reporter html-cov > ./coverage.html
	./node_modules/.bin/mocha --reporter spec
	rm cov-microevent.js
install: ;
	npm install

