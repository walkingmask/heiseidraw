FROM python:3.6-alpine

LABEL maintainer="walkingmask <walkingmask.jp@gmail.com>"
LABEL description="example app 2, alpine-python3-flask-mysql"

ADD app /app
WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt
