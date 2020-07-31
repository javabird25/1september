import os

from django.conf import settings
from django.urls import reverse
from django.views.generic import TemplateView, CreateView

from app.models import Photo


class QuizView(TemplateView):
    template_name = "app/quiz.html"


class PhotoUploadView(CreateView):
    model = Photo
    fields = ["photo"]
    template_name_suffix = "_upload_form"

    def get_success_url(self):
        return reverse("setup", kwargs={"id": self.object.id})


class SetupView(TemplateView):
    template_name = "app/composition.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["photo"] = Photo.objects.get(pk=context["id"]).photo
        context["frames"] = os.listdir(os.path.join(settings.BASE_DIR, "app", "static", "frames"))
        return context
