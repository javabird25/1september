#!/bin/sh

if [ $PRODUCTION -eq 1 ]; then
    ./manage.py collectstatic --no-input
fi

wait-for-it db:5432
./manage.py makemigrations --no-input
./manage.py migrate --no-input

if [ -n "$SUPERUSER_LOGIN" ] && [ -n "$SUPERUSER_PASSWORD" ]; then
    ./manage.py shell << EOF
from os import environ
from django.contrib.auth import get_user_model
User = get_user_model()
try:
    User.objects.get(username=environ["SUPERUSER_LOGIN"])
except User.DoesNotExist:
    User.objects.create_superuser(environ["SUPERUSER_LOGIN"], "null@null.com", environ["SUPERUSER_PASSWORD"])
EOF
fi

if [ $PRODUCTION -eq 1 ]; then
    gunicorn september1.wsgi:application --bind 0.0.0.0:8000
else
    ./node_modules/.bin/webpack --config webpack.config.js --mode=development --watch &
    ./manage.py runserver 0.0.0.0:8000
fi
