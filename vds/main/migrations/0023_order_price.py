# Generated by Django 4.1.5 on 2023-05-17 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_alter_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='price',
            field=models.IntegerField(default=1344),
            preserve_default=False,
        ),
    ]
