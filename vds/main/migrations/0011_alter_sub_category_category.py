# Generated by Django 4.1.5 on 2023-04-22 11:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_sub_category_category_remove_product_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sub_category',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sub_category', to='main.category'),
        ),
    ]