# Generated by Django 4.1.5 on 2023-04-23 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_product_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='img1',
            field=models.ImageField(null=True, upload_to='product'),
        ),
        migrations.AddField(
            model_name='product',
            name='img2',
            field=models.ImageField(null=True, upload_to='product'),
        ),
    ]
