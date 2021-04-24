FROM golang:alpine

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64


RUN apk add --no-cache make git bash gcc

RUN git clone https://github.com/bluzelle/blzgo.git

WORKDIR blzgo/uat

RUN go build

ENTRYPOINT ./uat
