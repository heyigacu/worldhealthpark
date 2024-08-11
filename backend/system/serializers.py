#model
from .models import UserModel, CompanyModel, NewsModel
#serializer
from rest_framework import serializers

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel 
        fields = "__all__" 


class CompanyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyModel 
        fields = "__all__" 

class NewsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsModel 
        fields = "__all__" 

