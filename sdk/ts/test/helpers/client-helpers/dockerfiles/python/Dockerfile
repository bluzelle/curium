FROM python:3

WORKDIR /usr/lib/app

RUN git clone https://github.com/bluzelle/blzpy.git

RUN pip install pipenv
RUN pip install flask

WORKDIR ./blzpy

RUN pipenv install --dev

WORKDIR ./uat

ENV FLASK_APP=server.py

ENTRYPOINT pipenv run flask run --host 0.0.0.0