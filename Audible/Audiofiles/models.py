from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=255,default='')
    note=models.TextField(default='')

    class Meta:
        verbose_name = ("Note")
        verbose_name_plural = ("Notes")

    def __str__(self):
        return self.name

    # def get_absolute_url(self):
    #     return reverse("Note_detail", kwargs={"pk": self.pk})

class Voice(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    voice_name=models.CharField(max_length=50)
    language=models.CharField(max_length=50)
    
    class Meta:
        verbose_name = ("Voice")
        verbose_name_plural = ("Voices")

    def __str__(self):
        return self.voice_name
    
class PDF_File(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=255)
    pdf_file=models.FileField(upload_to='Files')

    class Meta:
        verbose_name = ("PDF_File")
        verbose_name_plural = ("PDF_Files")

    def __str__(self):
        return self.title

class Audio(models.Model):
    PDF=models.ForeignKey(PDF_File,on_delete=models.CASCADE)
    audio=models.FileField(upload_to='Audio')
    class Meta:
        verbose_name = ("Audio")
        verbose_name_plural = ("Audios")

    def __str__(self):
        return self.audio
