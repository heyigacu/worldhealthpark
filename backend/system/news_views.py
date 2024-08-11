from .models import UserModel, NewsModel #model
from .serializers import CompanyModelSerializer, UserModelSerializer, NewsModelSerializer #serializer
from rest_framework.views import APIView #view
from rest_framework.response import Response #response
from rest_framework import status
from django.core import mail
from django.http import JsonResponse
from .communications import send_email
import base64
import time
import os
import copy
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NEWS_FIGURE_DIR = parent_dir+'/data/news_figures'
if not os.path.exists(NEWS_FIGURE_DIR):
    os.mkdir(NEWS_FIGURE_DIR)

def png2base64(img_path):
	pro = open(img_path, 'rb')
	data = pro.read()
	b64 = base64.b64encode(data)
	pro.close()
	return b64


class UploadNewsFigureAPIView(APIView):
    """
    compnay figure upload: POST localhost:8000/news/upload_figure/
    :200 upload successfully
    """
    def post(self,request):
        file = request.data['file']
        filename = str(file.name)
        times = str(time.time()).split('.').pop()
        filename = times + '_' + filename
        filepath = os.path.join(NEWS_FIGURE_DIR,filename)
        print(filepath)
        with open(filepath, 'wb+') as destination:
            for chunk in request.data['file'].chunks():
                destination.write(chunk)
        destination.close()
        return Response({'code':200,'msg':'上传成功','data':filepath})
    
class NewsCreateAPIView(APIView):
    """
    user login: POST localhost:8000/news/create/
    :200 register successfully
    :203 user name have existed
    """
    def post(self,request):
        data_dict = request.data
        user = UserModel.objects.get(UserName=data_dict.pop('UserName'))
        data_dict['Owner'] = user.id
        serializer = NewsModelSerializer(data=data_dict)
        if not serializer.is_valid():
            print(serializer.errors)
        serializer.save()
        return Response({'code':200,'msg':'注册成功','data':serializer.data})
    
class NewsesAcquireAPIView(APIView):
    """
    user login: POST localhost:8000/newses/acquire/
    :200 request successfully
    """
    def post(self,request):
        newses = NewsModel.objects.all()
        serializers = NewsModelSerializer(instance=newses, many=True)
        datas = serializers.data
        for data in datas:
            data['Owner'] = UserModel.objects.get(id=data['Owner']).UserName
        return Response({'code':200,'msg':'请求成功','data':datas})

class NewsAcquireByIDAPIView(APIView):
    """
    user login: POST localhost:8000/company/acquirebyid/
    :200 request successfully
    """
    def post(self,request):
        id = request.data['id']
        news = NewsModel.objects.get(id=id)
        serializer = NewsModelSerializer(instance=news)
        dic = serializer.data
        if dic['Figure'] != None:
            dic['Figure'] = png2base64(serializer.data['Figure'])
        return Response({'code':200,'msg':'请求成功','data':dic})

class NewsDeleteByIDAPIView(APIView):
    """
    user login: POST localhost:8000/company/acquirebyid/
    :200 delete successfully
    """
    def post(self,request):
        id = request.data['id']
        news = NewsModel.objects.get(id=id)
        news.delete()
        return Response({'code':200,'msg':'请求成功','data':None})

class NewsUpdateAPIView(APIView):
    """
    user login: POST localhost:8000/user/change_email/
    :200 update successfully
    """
    def post(self,request):
        data_dict = request.data
        user = UserModel.objects.get(UserName=data_dict.pop('UserName'))
        news = NewsModel.objects.get(id=data_dict['id'])
        data_dict['Owner'] = user.id
        serializer = NewsModelSerializer(instance=news, data=data_dict)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        else: print(serializer.errors)
        return Response({'code':200,'msg':'公司信息修改成功','data':serializer.data})

class NewsAcqurieByNAPIView(APIView):
    """
    user login: POST localhost:8000/company/acquirebyid/
    :200 delete successfully
    """
    def post(self,request):
        data_dict = request.data
        Number = data_dict['Number']
        OrderBy = '-CreatedTime'
        newses = NewsModel.objects.all().order_by(OrderBy)[:Number]
        serializers = NewsModelSerializer(instance=newses,many=True)
        print(serializers.data)
        data = copy.deepcopy(serializers.data)
        for dic in data:
            if dic['Figure'] != None:
                dic['Figure'] = png2base64(dic['Figure'])
        return Response({'code':200,'msg':'请求成功','data':data})


class NewsesAcquireAPIView(APIView):
    """
    user login: POST localhost:8000/newses/acquire/
    :200 request successfully
    """
    def post(self,request):
        newses = NewsModel.objects.all()
        serializers = NewsModelSerializer(instance=newses, many=True)
        datas = serializers.data
        for data in datas:
            data['Owner'] = UserModel.objects.get(id=data['Owner']).UserName
        return Response({'code':200,'msg':'请求成功','data':datas})


class NewsesAcquireAPIView(APIView):
    """
    user login: POST localhost:8000/newses/acquire/
    :200 request successfully
    """
    def post(self, request):

        data_dict = request.data
        print(data_dict)
        OrderField = data_dict['OrderField']
        Order = data_dict['Order']
        PageNumber = data_dict['PageNumber']-1
        PageSize = data_dict['PageSize']
        SearchField = data_dict['SearchField']
        SearchMethod = data_dict['SearchMethod']
        SearchValue = data_dict['SearchValue']
        newses = NewsModel.objects.all()


        if SearchField == 'Owner':
            owners = UserModel.objects.all()
            filter_kwargs = {f"UserName__icontains": SearchValue} if SearchMethod == 'contains' else {f"UserName": SearchValue}
            owners =  owners.filter(**filter_kwargs)
            if OrderField == 'Owner':
                if Order == 'descend':
                    owners = owners.order_by(f"-UserName")
            else:
                if Order == 'descend':
                    newses = newses.order_by(f"-{OrderField}")    
            owner_ids = [owner.id for owner in owners]
            newses = newses.filter(Owner__in=owner_ids)                        
        else:
            filter_kwargs = {f"{SearchField}__icontains": SearchValue} if SearchMethod == 'contains' else {SearchField: SearchValue}
            newses = newses.filter(**filter_kwargs)
            if OrderField == 'Owner':
                owners = UserModel.objects.all()
                if Order == 'descend':
                    owners = owners.order_by(f"-UserName")
                owner_ids = [owner.id for owner in owners]
                newses = newses.filter(Owner__in=owner_ids)   
            else:
                if Order == 'descend':
                    newses = newses.order_by(f"-{OrderField}")     
        total = newses.count()
        newses = newses[(PageNumber * PageSize):((PageNumber + 1) * PageSize)]
        serializers = NewsModelSerializer(newses, many=True)
        datas = copy.deepcopy(serializers.data)
        for data in datas:
            data['Owner'] = UserModel.objects.get(id=data['Owner']).UserName
            if data['Figure'] != None:
                data['Figure'] = png2base64(data['Figure'])
            
        return Response({'code':200,'msg':'请求成功','data':datas, 'total':total})
                


class NewsAcquireByURLIDAPIView(APIView):
    """
    user login: POST localhost:8000/company/acquirebyid/
    :200 request successfully
    """
    def post(self,request):
        id = request.data['id']
        news = NewsModel.objects.get(id=id)
        serializer = NewsModelSerializer(instance=news)
        dic = serializer.data
        if dic['Figure'] != None:
            dic['Figure'] = png2base64(serializer.data['Figure'])
        return Response({'code':200,'msg':'请求成功','data':dic})


class NewsAcquireByURLIDAPIView(APIView):
    """
    Get news by ID: GET localhost:8000/company/acquirebyid/<id>/
    :200 request successfully
    """
    def get(self, request, id):
        try:
            news = NewsModel.objects.get(id=id)
        except NewsModel.DoesNotExist:
            return Response({'code': 404, 'msg': '新闻不存在'})
        serializer = NewsModelSerializer(instance=news)
        dic = serializer.data
        if dic['Figure'] != None:
            dic['Figure'] = png2base64(serializer.data['Figure'])
        return Response({'code': 200, 'msg': '请求成功', 'data': dic})