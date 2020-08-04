#!/bin/sh

./manage.py collectstatic --no-input

./wait-for-it db:5432
./manage.py migrate

gunicorn september1.wsgi:application --bind 0.0.0.0:8000
