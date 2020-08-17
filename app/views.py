import os

from django.conf import settings
from django.urls import reverse
from django.views.generic import TemplateView, CreateView, ListView
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, mixins, parsers
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.exceptions import NotFound, APIException
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import SessionAuthentication

from app.models import Photo
from . import serializers


class QuizView(TemplateView):
    template_name = "app/quiz.html"

class CompositionView(TemplateView):
    template_name = "app/composition.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        frames_urls = [settings.STATIC_URL + "frames/" + frame_filename for frame_filename in os.listdir(os.path.join(settings.BASE_DIR, "app", "static", "frames"))]
        context["frames_urls"] = frames_urls
        return context

class PhotoUploadViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = serializers.PhotoSerializer
    parser_classes = [parsers.MultiPartParser]

class CompositionFinishView(TemplateView):
    template_name = "app/composition_finish.html"

class GalleryView(ListView):
    template_name = "app/gallery/visit.html"
    queryset = Photo.objects.filter(verified=True)
    paginate_by = 10


class GalleryModerationView(LoginRequiredMixin, ListView):
    template_name = "app/gallery/moderation.html"
    queryset = Photo.objects.filter(verified=False)
    paginate_by = 36


@api_view(["POST"])
@permission_classes([IsAdminUser])
@authentication_classes([SessionAuthentication])
def moderation_action(request):
    action = request.data["action"]
    try:
        photo = Photo.objects.get(pk=request.data["id"])
    except Photo.DoesNotExist:
        raise NotFound("photo with this id does not exist")
    if action == "approve":
        photo.verified = True
        photo.save()
    elif action == "delete":
        photo.delete()
    else:
        raise APIException(f"bad request action: {action}", 400)
    return Response()


@api_view(["POST"])
@permission_classes([IsAdminUser])
@authentication_classes([SessionAuthentication])
def moderation_action_batch(request):
    action = request.data["action"]
    photos = Photo.objects.filter(pk__in=request.data["ids"])
    if action == "approve":
        photos.update(verified=True)
    elif action == "delete":
        photos.delete()
    else:
        raise APIException(f"bad request action: {action}", 400)
    return Response()
