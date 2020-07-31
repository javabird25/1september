from django.shortcuts import render
from django.views.generic import TemplateView


class QuizView(TemplateView):
    template_name = "app/quiz.html"
