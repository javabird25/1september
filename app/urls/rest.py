from rest_framework import routers

from .. import views

router = routers.SimpleRouter()
router.register("photo-upload", views.PhotoUploadViewSet, "photo_upload")
urlpatterns = router.urls
