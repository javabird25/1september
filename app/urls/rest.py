from django.urls import path, include

from .. import views

urlpatterns = [
    path("photo-upload/", views.upload_photo),
]
