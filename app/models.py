from django.db import models


class Photo(models.Model):
    photo = models.ImageField()
    verified = models.BooleanField(default=False)
