import os

from django.conf import settings
from django.urls import reverse
from django.views.generic import TemplateView, CreateView
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST
from rest_framework import viewsets, mixins, parsers

from app.models import Photo
from . import serializers


class QuizView(TemplateView):
    template_name = "app/quiz.html"

class CompositionView(TemplateView):
    template_name = "app/composition.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["frames"] = os.listdir(os.path.join(settings.BASE_DIR, "app", "static", "frames"))
        return context

class PhotoUploadViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = serializers.PhotoSerializer
    parser_classes = [parsers.MultiPartParser]

class CompositionFinishView(TemplateView):
    template_name = "app/composition_finish.html"
