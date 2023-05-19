# Generated by Django 4.1.5 on 2023-04-20 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_category_sub_category_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='sub_category',
            field=models.ManyToManyField(blank=True, null=True, to='main.category'),
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ManyToManyField(blank=True, null=True, to='main.category', verbose_name='категория'),
        ),
    ]