# Generated by Django 4.1.5 on 2023-04-21 07:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_sub_category_remove_category_parent_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='sun_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='products', to='main.sub_category'),
        ),
    ]
