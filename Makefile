all: lint

lint:
	./node_modules/eslint/bin/eslint.js index.js

.PHONY: all lint
