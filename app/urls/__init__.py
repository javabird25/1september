from django.urls import path, include
from django.contrib.auth.views import LoginView, LogoutView

from .. import views

urlpatterns = [
    path("", views.QuizView.as_view()),
    path("photocompose/", include("app.urls.composition")),
    path("", include("app.urls.rest")),
    path("gallery/", views.GalleryView.as_view()),
    path("gallery/<int:pk>/", views.GalleryPhotoView.as_view()),
    path("gallery/moderation/", views.GalleryModerationView.as_view(), name="moderation"),
    path("gallery/moderation/action/", views.moderation_action),
    path("gallery/moderation/batch-action/", views.moderation_action_batch),
    path("login/", LoginView.as_view(redirect_authenticated_user=True), name="login"),
    path("logout/", LogoutView.as_view()),
]
