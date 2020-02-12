#!/bin/sh

if [ -d "blz-tmclient" ]; then
    cd blz-tmclient
    git checkout prototype
    git pull
else
    git clone https://github.com/paularchard/blz-tmclient
    cd blz-tmclient
    git checkout prototype
fi

npm install \
&& npx webpack
