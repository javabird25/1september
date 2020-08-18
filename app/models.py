from django.db import models


class Photo(models.Model):
    photo = models.ImageField()
    verified = models.BooleanField(default=False)
    submission_date = models.DateTimeField(auto_now=True)
