
from .models import CumulativeModel #model
from .serializers import CompanyModelSerializer, UserModelSerializer #serializer
from rest_framework.views import APIView #view
from rest_framework.response import Response #response
from django.http import JsonResponse

def get_cumulative_access(request):
    obj = CumulativeModel.objects.get(Name='Access')
    return JsonResponse({'code':200,'msg':'获取成功','data':obj.Cumulative})

def set_cumulative_access(request):
    obj = CumulativeModel.objects.get(Name='Access')
    obj.Cumulative += 1
    obj.save()
    return JsonResponse({'code':200,'msg':'获取成功','data':obj.Cumulative})


   

