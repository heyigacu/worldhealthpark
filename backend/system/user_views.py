from .models import UserModel, CompanyModel #model
from .serializers import CompanyModelSerializer, UserModelSerializer #serializer
from rest_framework.views import APIView #view
from rest_framework.response import Response #response
from rest_framework import status
from django.core import mail
from django.http import JsonResponse
from .communications import send_email
import os 
from django.http import FileResponse

PARENT_DIR = os.path.abspath(os.path.dirname(__file__))


class UserRegisterAPIView(APIView):
    """
    user login: POST localhost:8000/user/register/
    :200 register successfully
    :203 user name have existed
    """
    def post(self,request):
        print(request.data)
        data_dict = request.data
        username = data_dict['UserName']
        try:
            user = UserModel.objects.get(UserName=username)
            return Response({'code':203,'msg':'用户名已存在'})
        except:
            serializer = UserModelSerializer(data=data_dict)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'code':200,'msg':'注册成功','data':serializer.data})

def validate_email(request):
    """
    user register email validate: GET localhost:8000/user/validate_email/
    :200 validate successfully
    """
    Email = request.GET['Email']
    Subject = request.GET['Subject']
    Message = request.GET['Message']
    code = send_email(Email, Subject, Message)
    return JsonResponse({'code':200,'msg':'验证成功','data':code})

class UserLoginAPIView(APIView):
    def post(self, request):
        """
        user login: GET localhost:8000/user/login/
        :200 login successfully
        :201 user not exist
        :202 password error
        """
        data_dict = request.data
        username = data_dict['UserName']
        password = data_dict['Password']
        try:
            user = UserModel.objects.get(UserName=username)
        except:
            return Response({'code':201,'msg':'用户不存在'})
        if password == user.Password:
            serializer = UserModelSerializer(instance=user)
            return Response({'code':200,'msg':'登录成功','data':serializer.data})
        else:
            return Response({'code':202,'msg':'密码错误'})

class UserChangePasswordAPIView(APIView):
    """
    user login: POST localhost:8000/user/changepassword/
    :200 change password successfully
    :201 user not exist
    """
    def post(self,request):
        data_dict = request.data
        username = data_dict['UserName']
        try:
            user = UserModel.objects.get(UserName=username)
            serializer = UserModelSerializer(instance=user)
            dic = serializer.data
            if dic['Email'] != data_dict['Email']:
                return Response({'code':204,'msg':'用户名和密码不匹配','data':serializer.data})
            dic['Password'] = data_dict['Password']
            serializer = UserModelSerializer(instance=user, data=dic)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'code':200,'msg':'修改密码成功','data':serializer.data})
        except:
            return Response({'code':201,'msg':'用户不存在'})

class UserChangeEmailAPIView(APIView):
    """
    user login: POST localhost:8000/user/change_email/
    :200 change password successfully
    """
    def post(self,request):
        data_dict = request.data
        username = data_dict['UserName']
        user = UserModel.objects.get(UserName=username)
        serializer = UserModelSerializer(instance=user)
        dic = serializer.data
        dic['Email'] = data_dict['NewEmail']
        serializer = UserModelSerializer(instance=user, data=dic)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'code':200,'msg':'修改邮箱成功','data':serializer.data})


class UserAcquireAPIView(APIView):
    """
    user acquire: POST localhost:8000/user/acquire/
    :200 change password successfully
    """
    def post(self,request): 
        data_dict = request.data
        username = data_dict['UserName']
        book = UserModel.objects.get(UserName=username)
        serializer = UserModelSerializer(instance=book)
        return Response({'code':200,'msg':'查询成功','data':serializer.data})
    

class UsersAcquireAPIView(APIView):
    """
    user acquire: POST localhost:8000/user/acquire/
    :200 change password successfully
    """
    def post(self,request): 
        data_dict = request.data
        print(data_dict)
        OrderBy = data_dict['OrderBy']
        PageNumber = data_dict['PageNumber']-1
        PageSize = data_dict['PageSize']
        users = UserModel.objects.all().order_by(OrderBy)[(PageNumber*PageSize):((PageNumber+1)*PageSize)]
        serializers = UserModelSerializer(instance=users, many=True)
        return Response({'code':200,'msg':'查询成功','data':serializers.data})
    


class UsersAcquireAPIView(APIView):
    """
    user login: POST localhost:8000/user/acquire/
    :200 request successfully
    """
    def post(self,request):
       
        data_dict = request.data

        OrderField = data_dict['OrderField']
        Order = data_dict['Order']
        PageNumber = data_dict['PageNumber']-1
        PageSize = data_dict['PageSize']
        SearchField = data_dict['SearchField']
        SearchMethod = data_dict['SearchMethod']
        SearchValue = data_dict['SearchValue']

        users = UserModel.objects.all()
        if SearchMethod == 'contains':
            filter_kwargs = {f"{SearchField}__icontains": SearchValue}
        elif SearchMethod == 'exact':
            filter_kwargs = {f"{SearchField}": SearchValue}
        else:
            return Response({'code': 400, 'msg': '无效的搜索方法'})
        users = users.filter(**filter_kwargs)
        if Order == 'descend':
            OrderField = f"-{OrderField}"
        users = users.order_by(OrderField)
        total = users.count()
        users = users[(PageNumber * PageSize):((PageNumber + 1) * PageSize)]
        serializers = UserModelSerializer(users, many=True)

        return Response({'code': 200, 'msg': '请求成功', 'data': serializers.data, 'total': total})


class UserAcquireByIDAPIView(APIView):
    """
    user acquire: POST localhost:8000/user/acquire/
    :200 change password successfully
    """
    def post(self,request): 
        data_dict = request.data
        id = data_dict['id']
        user = UserModel.objects.get(id=id)
        serializer = UserModelSerializer(instance=user)
        return Response({'code':200,'msg':'查询成功','data':serializer.data})
    

class UserUpdateAPIView(APIView):
    """
    user login: POST localhost:8000/user/update/
    :200 update successfully
    """
    def post(self,request):
        print(request.data)
        data_dict = request.data
        user = UserModel.objects.get(id=data_dict['id'])
        data_dict['Password'] = user.Password
        serializer = UserModelSerializer(instance=user, data=data_dict)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        else: print(serializer.errors)
        return Response({'code':200,'msg':'公司信息修改成功','data':serializer.data})

class UserDeleteByIDAPIView(APIView):
    """
    user login: POST localhost:8000/company/acquirebyid/
    :200 delete successfully
    """
    def post(self,request):
        id = request.data['id']
        user = UserModel.objects.get(id=id)
        user.delete()
        return Response({'code':200,'msg':'请求成功','data':None})
    


def declare_chinese(request):
    path=os.path.join(PARENT_DIR,'files/declare_chinese.pdf')
    file = open(path, 'rb')
    response = FileResponse(file)
    response['Content-Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename="declare_chinese.pdf"'
    return response


def declare_english(request):
    path=os.path.join(PARENT_DIR,'files/declare_english.pdf')
    file = open(path, 'rb')
    response = FileResponse(file)
    response['Content-Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename="declare_english.pdf"'
    return response


def count(request):
    last_user = UserModel.objects.last()
    return  JsonResponse({'code':200,'msg':'请求成功','data':int(last_user.id)+1}) 
