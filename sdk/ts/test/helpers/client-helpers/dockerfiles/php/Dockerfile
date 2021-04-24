FROM ubuntu
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y
RUN apt-get install git php composer zip unzip  php-zip php-gmp net-tools vim -y


RUN git clone https://github.com/bluzelle/blzphp

WORKDIR blzphp-http

RUN composer install

ENTRYPOINT php -S 0.0.0.0:5000 restServer.php

