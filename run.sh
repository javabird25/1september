#!/bin/sh

if [ $PRODUCTION -eq 1 ]; then
    ./manage.py collectstatic --no-input
fi

wait-for-it db:5432
./manage.py makemigrations --no-input
./manage.py migrate --no-input

if [ $PRODUCTION -eq 1 ]; then
    gunicorn september1.wsgi:application --bind 0.0.0.0:8000
else
    ./node_modules/.bin/webpack --config webpack.config.js --mode=development --watch &
    ./manage.py runserver 0.0.0.0:8000
fi
