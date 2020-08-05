from django.conf import settings

def show_toolbar_callback(request):
    return settings.DEBUG
