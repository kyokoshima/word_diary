#!/bin/sh

if [ ! -e node_modules/webpack-dev-server ]; then
	cp -r /node_modules/ ./node_modules
fi

bundle exec bin/webpack-dev-server
