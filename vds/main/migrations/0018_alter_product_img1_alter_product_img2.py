# Generated by Django 4.1.5 on 2023-04-27 12:23

from django.db import migrations, models
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_maker_logo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='img1',
            field=models.ImageField(null=True, upload_to=main.models.upload_to),
        ),
        migrations.AlterField(
            model_name='product',
            name='img2',
            field=models.ImageField(null=True, upload_to=main.models.upload_to),
        ),
    ]