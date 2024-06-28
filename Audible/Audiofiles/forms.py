from django import forms 
from .models import PDF_File

class PDFUploadForm(forms.ModelForm):
    class Meta:
        model=PDF_File
        fields=['title','pdf_file']