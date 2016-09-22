BUILD_FILES = build/main.js build/Bubble.js

.PHONY: all
all: build/bundle.js

build/*.js: *.ts
	tsc

build/bundle.js: build/*.js
	browserify $(BUILD_FILES) -o build/bundle.js