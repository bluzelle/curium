#!/bin/bash

#check to see if yarn exists
if ! [ -x "$(command -v yarn)" ]; then
    npm install -g yarn
fi

echo "********** building javascript client" \
&& ./buildClient.sh \
&& echo "********** installing dependencies for central library" \
&& cd ../control \
&& yarn \
&& echo "********** installing dependencies for tests" \
&& cd ../specs \
&& yarn \




