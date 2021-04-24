FROM openjdk:8

RUN apt update
RUN apt install net-tools

RUN git clone https://github.com/bluzelle/blzjava
RUN mkdir out
RUN javac -cp blzjava/lib/:blzjava/examples/ -d out/ blzjava/examples/server/Server.java
WORKDIR out
RUN jar cfe server.jar server.Server ./

ENTRYPOINT java -jar server.jar