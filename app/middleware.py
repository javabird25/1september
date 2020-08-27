from django.conf import settings
from django.template import Engine, Context


def work_in_progress(get_response):
    def middleware(request):
        response = get_response(request)

        if not settings.DEBUG and not 'open-sesame' in request.COOKIES and request.method == "GET":
            response.content = Engine.get_default().get_template("app/work-in-progress.html").render(Context()).encode()

        return response

    return middleware
