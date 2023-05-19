from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import User


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Product(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')
    description = models.CharField(verbose_name='Описание', max_length=1000)
    category = models.ManyToManyField(
        'Category', related_name="products", null=True, blank=True
    )
    sub_category = models.ManyToManyField('Sub_Category', related_name='products', null=True,blank=True)
    maker = models.ForeignKey(
        'Maker',
        on_delete=models.CASCADE,
        related_name="products",
        blank=True,
        null=True,
    )
    price = models.IntegerField()
    img1 = models.ImageField(upload_to=upload_to, null=True)
    img2 = models.ImageField(upload_to=upload_to, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class Category(models.Model):
    name = models.CharField(max_length=256)
    sub_category = models.ManyToManyField(
        'Sub_Category', related_name='category')
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

class Sub_Category(models.Model):
    name = models.CharField(max_length=50)
    class Meta:
        verbose_name ='Подкатегория'
        verbose_name_plural ='ПодКатегории'

    def __str__(self):
        return self.name

class Maker(models.Model):
    name = models.CharField(max_length=512)
    logo = models.ImageField(upload_to='maker',null=True)
    def __str__(self):
        return self.name

class Review(models.Model):
    product = models.ForeignKey('Product', related_name='reviews', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()

    class Meta:
        verbose_name ="Рейтинг"
        verbose_name_plural = 'Рейтинги'

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    is_paid = models.BooleanField(default=False)
    product = models.ForeignKey('Product',on_delete=models.CASCADE)
    price = models.IntegerField()

    def __str__(self):
        return self.product.name