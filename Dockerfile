FROM python:alpine

WORKDIR /usr/src/app

RUN apk update \
    && apk add --no-cache postgresql-dev gcc python3-dev musl-dev bash \
        zlib-dev g++ libjpeg-turbo-dev yarn

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY package.json yarn.lock ./
RUN yarn install

ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh wait-for-it
RUN chmod +x wait-for-it

COPY . .

ARG WEBPACK_MODE
RUN ./node_modules/.bin/webpack --config webpack.config.js --mode=$WEBPACK_MODE

CMD ./run.sh
EXPOSE 8000
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
