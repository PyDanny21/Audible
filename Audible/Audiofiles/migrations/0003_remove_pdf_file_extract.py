# Generated by Django 4.2.13 on 2024-06-28 01:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Audiofiles', '0002_pdf_file_extract'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pdf_file',
            name='extract',
        ),
    ]
