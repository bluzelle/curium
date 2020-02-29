FROM golang:alpine AS build-env
MAINTAINER support@bluzelle.com

# Set up dependencies
ENV PACKAGES make git bash gcc

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Set working directory for the build
WORKDIR /go/src/github.com/bluzelle/

# Build
RUN apk add --no-cache $PACKAGES

RUN git clone https://github.com/bluzelle/curium.git

WORKDIR /go/src/github.com/bluzelle/curium

#RUN git checkout task/rnistuk/cm-123

RUN make install

# Final image
FROM alpine:edge

# Install ca-certificates
RUN apk add --update ca-certificates

WORKDIR /root

EXPOSE 26656
EXPOSE 1317

# Copy over binaries from the build-env
COPY --from=build-env /go/bin/blzd /usr/bin/blzd
COPY --from=build-env /go/bin/blzcli /usr/bin/blzcli
COPY --from=build-env /go/src/github.com/bluzelle/curium/docker/blz-test.tar.xz /root/blz-test.tar.xz
COPY --from=build-env /go/src/github.com/bluzelle/curium/docker/blz-setup.sh /root/blz-setup.sh

ENTRYPOINT /root/blz-setup.sh
