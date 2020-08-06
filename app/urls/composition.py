from django.urls import path

from .. import views

urlpatterns = [
    path("", views.CompositionView.as_view()),
    path("finish/", views.CompositionFinishView.as_view(), name="finish"),
]
