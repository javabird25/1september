from django.urls import path

from .. import views

urlpatterns = [
    path("upload/", views.PhotoUploadView.as_view()),
    path("setup/<int:id>", views.SetupView.as_view(), name="setup"),
]
