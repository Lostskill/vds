from rest_framework import serializers
from .models import *


class Sub_CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Sub_Category
        fields = '__all__'
        depth = 1

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'
        depth = 1

class MakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maker
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Review
        fields = ['id', 'created_at','updated_at', 'text','user','rating','product']

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category',
                  'sub_category', 'maker', 'img1', 'price']
        depth =1

class DetailProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True,read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category','sub_category' ,'maker','reviews','img1','img2','price']  
        depth=1


class OrderHistorySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Order
        fields= ['product', 'is_paid','user','price']
        depth=2
        