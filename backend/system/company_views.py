from .models import UserModel, CompanyModel, NewsModel #model
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
COMPANY_FIGURE_DIR = parent_dir+'/data/company_figures'
if not os.path.exists(COMPANY_FIGURE_DIR):
    os.mkdir(COMPANY_FIGURE_DIR)


def png2base64(img_path):
	pro = open(img_path, 'rb')
	data = pro.read()
	b64 = base64.b64encode(data)
	pro.close()
	return b64


class UploadCompanyFigureAPIView(APIView):
    """
    compnay figure upload: POST localhost:8000/company/upload_figure/
    :200 upload successfully
    """
    def post(self,request):
        file = request.data['file']
        filename = str(file.name)
        times = str(time.time()).split('.').pop()
        filename = times + '_' + filename
        filepath = os.path.join(COMPANY_FIGURE_DIR,filename)
        print(filepath)
        with open(filepath, 'wb+') as destination:
            for chunk in request.data['file'].chunks():
                destination.write(chunk)
        destination.close()
        return Response({'code':200,'msg':'上传成功','data':filepath})
    
class CompanyRegisterAPIView(APIView):
    """
    user login: POST localhost:8000/company/register/
    :200 register successfully
    :203 user name have existed
    """
    def post(self,request):
        data_dict = request.data
        user = UserModel.objects.get(UserName=data_dict.pop('UserName'))
        data_dict['Owner'] = user.id
        data_dict['Class'] = int(data_dict['Class'])
        serializer = CompanyModelSerializer(data=data_dict)
        if not serializer.is_valid():
            print(serializer.errors)
        serializer.save()
        if user.Rank > 4:
            user.Rank = 3
        user.save()
        return Response({'code':200,'msg':'注册成功','data':serializer.data})
    

class CompanysAcquireAPIView(APIView):
    """
    user login: POST localhost:8000/companys/acquire/
    :200 request successfully
    """
    def post(self, request):

        data_dict = request.data
        UserName = data_dict['UserName']
        OrderField = data_dict['OrderField']
        Order = data_dict['Order']
        PageNumber = data_dict['PageNumber']-1
        PageSize = data_dict['PageSize']
        SearchField = data_dict['SearchField']
        SearchMethod = data_dict['SearchMethod']
        SearchValue = data_dict['SearchValue']
        print(data_dict)
        user = UserModel.objects.get(UserName=UserName)
        if request.data['All']:
            companys = CompanyModel.objects.all()
        else:
            companys = CompanyModel.objects.filter(Owner=user.id)

        if SearchField == 'Owner':
            owners = UserModel.objects.all()
            filter_kwargs = {f"UserName__icontains": SearchValue} if SearchMethod == 'contains' else {f"UserName": SearchValue}
            owners =  owners.filter(**filter_kwargs)
            if OrderField == 'Owner':
                if Order == 'descend':
                    owners = owners.order_by(f"-UserName")
            else:
                if Order == 'descend':
                    companys = companys.order_by(f"-{OrderField}")    
            owner_ids = [owner.id for owner in owners]
            companys = companys.filter(Owner__in=owner_ids)                        
        else:
            filter_kwargs = {f"{SearchField}__icontains": SearchValue} if SearchMethod == 'contains' else {SearchField: SearchValue}
            companys = companys.filter(**filter_kwargs)
            if OrderField == 'Owner':
                owners = UserModel.objects.all()
                if Order == 'descend':
                    owners = owners.order_by(f"-UserName")
                owner_ids = [owner.id for owner in owners]
                companys = companys.filter(Owner__in=owner_ids)   
            else:
                if Order == 'descend':
                    companys = companys.order_by(f"-{OrderField}")                                      
        total = companys.count()
        companys = companys[(PageNumber * PageSize):((PageNumber + 1) * PageSize)]
        serializers = CompanyModelSerializer(companys, many=True)
        datas = serializers.data
        for data in datas:
            data['Owner'] = UserModel.objects.get(id=data['Owner']).UserName
        return Response({'code':200,'msg':'请求成功','data':datas, 'total':total})


class CompanysStatusAPIView(APIView):
    """
    user login: POST localhost:8000/companys/status/
    :200 request successfully
    """
    def post(self, request):

        data_dict = request.data
        OrderField = data_dict['OrderField']
        Order = data_dict['Order']
        PageNumber = data_dict['PageNumber']-1
        PageSize = data_dict['PageSize']
        SearchField = data_dict['SearchField']
        SearchMethod = data_dict['SearchMethod']
        SearchValue = data_dict['SearchValue']
        companys = CompanyModel.objects.filter(Status=0)

        if SearchField == 'Owner':
            owners = UserModel.objects.all()
            filter_kwargs = {f"UserName__icontains": SearchValue} if SearchMethod == 'contains' else {f"UserName": SearchValue}
            owners =  owners.filter(**filter_kwargs)
            if OrderField == 'Owner':
                if Order == 'descend':
                    owners = owners.order_by(f"-UserName")
            else:
                if Order == 'descend':
                    companys = companys.order_by(f"-{OrderField}")    
            owner_ids = [owner.id for owner in owners]
            companys = companys.filter(Owner__in=owner_ids)                        
        else:
            filter_kwargs = {f"{SearchField}__icontains": SearchValue} if SearchMethod == 'contains' else {SearchField: SearchValue}
            companys = companys.filter(**filter_kwargs)
            if OrderField == 'Owner':
                owners = UserModel.objects.all()
                if Order == 'descend':
                    owners = owners.order_by(f"-UserName")
                owner_ids = [owner.id for owner in owners]
                companys = companys.filter(Owner__in=owner_ids)   
            else:
                if Order == 'descend':
                    companys = companys.order_by(f"-{OrderField}")      

        total = companys.count()
        companys = companys[(PageNumber * PageSize):((PageNumber + 1) * PageSize)]
        serializers = CompanyModelSerializer(companys, many=True)
        datas = serializers.data
        for data in datas:
            data['Owner'] = UserModel.objects.get(id=data['Owner']).UserName
        return Response({'code':200,'msg':'请求成功','data':datas, 'total':total})

                


class CompanyStatusChangeByIDAPIView(APIView):
    """
    user login: POST localhost:8000/company/statuschange/
    :200 request successfully
    """
    def post(self,request):
        id = request.data['id']
        Status = request.data['Status']
        company = CompanyModel.objects.get(id=id)
        company.Status = Status
        company.save()
        serializers = CompanyModelSerializer(instance=company)
        return Response({'code':200,'msg':'请求成功','data':serializers.data})
    
class CompanyAcquireByIDAPIView(APIView):
    """
    user login: POST localhost:8000/company/acquirebyid/
    :200 request successfully
    """
    def post(self,request):
        id = request.data['id']
        company = CompanyModel.objects.get(id=id)
        serializer = CompanyModelSerializer(instance=company)
        dic = serializer.data
        print(dic['Figure'])
        if dic['Figure'] != None:
            dic['Figure'] = png2base64(serializer.data['Figure'])
        return Response({'code':200,'msg':'请求成功','data':dic})

class CompanyDeleteByIDAPIView(APIView):
    """
    user login: POST localhost:8000/company/acquirebyid/
    :200 delete successfully
    """
    def post(self,request):
        id = request.data['id']
        company = CompanyModel.objects.get(id=id)
        company.delete()
        return Response({'code':200,'msg':'请求成功','data':None})

class CompanyUpdateAPIView(APIView):
    """
    user login: POST localhost:8000/user/change_email/
    :200 update successfully
    """
    def post(self,request):
        data_dict = request.data
        print(data_dict)
        user = UserModel.objects.get(UserName=data_dict.pop('UserName'))
        print(user.id)
        company = CompanyModel.objects.get(id=data_dict['id'])
        # company.Owner = user
        # company.Class = int(data_dict['Class'])
        # company.Abstract = 'asdasdadasd'
        data_dict['Owner'] = user.id
        serializer = CompanyModelSerializer(instance=company, data=data_dict)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        else: print(serializer.errors)
        # company.save()
        # serializer = CompanyModelSerializer(instance=company)
        return Response({'code':200,'msg':'公司信息修改成功','data':serializer.data})



# class CompanysAcquireByClassAPIView(APIView):
#     """
#     user login: POST localhost:8000/company/acquirebyclass/
#     :200 request successfully
#     """
#     def post(self,request):
#         import copy
#         Class = request.data['Class']
#         companys = CompanyModel.objects.filter(Status=1, Class=Class)
#         serializers = CompanyModelSerializer(instance=companys,many=True)
#         data = copy.deepcopy(serializers.data)
#         print(data)
#         for dic in data:
#             if dic['Figure'] != None:
#                 dic['Figure'] = png2base64(dic['Figure'])
#         return Response({'code':200,'msg':'请求成功','data':data})




class CompanysAcquireByClassAPIView(APIView):
    """
    user login: POST localhost:8000/companys/acquirebyclass/
    :200 request successfully
    """
    def post(self, request):

        data_dict = request.data
        Class = request.data['Class']
        print(Class)
        OrderField = data_dict['OrderField']
        Order = data_dict['Order']
        PageNumber = data_dict['PageNumber']-1
        PageSize = data_dict['PageSize']
        SearchField = data_dict['SearchField']
        SearchMethod = data_dict['SearchMethod']
        SearchValue = data_dict['SearchValue']

        companys = CompanyModel.objects.filter(Status=1, Class=int(Class)-1)

        filter_kwargs = {f"{SearchField}__icontains": SearchValue} if SearchMethod == 'contains' else {SearchField: SearchValue}
        companys = companys.filter(**filter_kwargs)

        if Order == 'descend':
            companys = companys.order_by(f"-{OrderField}")            

        total = companys.count()
        companys = companys[(PageNumber * PageSize):((PageNumber + 1) * PageSize)]
        serializers = CompanyModelSerializer(companys, many=True)
        data = copy.deepcopy(serializers.data)
        for dic in data:
            if dic['Figure'] != None:
                dic['Figure'] = png2base64(dic['Figure'])
        return Response({'code':200,'msg':'请求成功','data':data, 'total':total})
    


def count(request):
    last_user = CompanyModel.objects.last()
    return  JsonResponse({'code':200,'msg':'请求成功','data':int(last_user.id)+1}) 