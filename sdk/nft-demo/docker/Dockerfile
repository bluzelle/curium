FROM node
SHELL ["/bin/bash", "-c"]
RUN apt-get update
RUN apt-get install git unzip -y

WORKDIR /root
RUN git clone https://github.com/bluzelle/curium.git

WORKDIR /root/curium/sdk/nft-demo
RUN git checkout nft-demo
RUN yarn
RUN yarn build
ENTRYPOINT yarn start









