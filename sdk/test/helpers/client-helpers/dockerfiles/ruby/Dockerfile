FROM ruby:2.7.1-slim

RUN apt-get update && \
		apt-get install -y --no-install-recommends  \
		        build-essential \
				libsecp256k1-dev \
				git

RUN git clone https://github.com/bluzelle/blzrb.git


WORKDIR ./blzrb
RUN bundle

WORKDIR ./uat
ENTRYPOINT bundle exec ruby server.rb

