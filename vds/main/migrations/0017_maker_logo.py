# Generated by Django 4.1.5 on 2023-04-23 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_product_img1_product_img2'),
    ]

    operations = [
        migrations.AddField(
            model_name='maker',
            name='logo',
            field=models.ImageField(null=True, upload_to='maker'),
        ),
    ]
