FROM golang:1.16.3
SHELL ["/bin/bash", "-c"]
RUN apt-get update
RUN apt-get install git unzip -y

WORKDIR /root
RUN git clone https://github.com/bluzelle/curium.git

RUN curl https://get.starport.network/starport! | bash
RUN curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.15.8/protoc-3.15.8-linux-x86_64.zip
WORKDIR /root/protoc
RUN unzip ../protoc-3.15.8-linux-x86_64.zip
ENV PATH="/root/protoc/bin:${PATH}"

WORKDIR /root/curium
RUN git checkout stargate
ENTRYPOINT starport serve









