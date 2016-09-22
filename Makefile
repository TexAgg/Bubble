.PHONY: all
all: build/*.js build/scipt.min.js

build/*.js: *.ts
	tsc