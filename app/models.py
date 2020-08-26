from django.db import models


class Photo(models.Model):
    photo = models.ImageField()
    verified = models.BooleanField(default=False)
    submission_date = models.DateTimeField(auto_now=True)
    profession = models.CharField(max_length=20)

    @staticmethod
    def get_percentages():
        verified_photos = Photo.objects.filter(verified=True)
        profession_counts = verified_photos.values("profession").annotate(count=models.Count("profession"))
        num_photos = len(verified_photos.all())
        return [
            { 
                "profession": d["profession"], 
                "percentage": round(d["count"] * 100 / num_photos, 2)
            }
            for d in profession_counts
        ]
