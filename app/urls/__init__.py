from django.urls import path, include
from .. import views

urlpatterns = [
    path("", views.QuizView.as_view()),
    path("photocompose/", include("app.urls.composition")),
    path("", include("app.urls.rest"))
]
