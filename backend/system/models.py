
from django.db import models

class UserModel(models.Model):
    UserName = models.CharField(max_length=50,unique=True,blank=False,null=False) 
    Password = models.CharField(max_length=50,unique=False,blank=False,null=False) 
    Country = models.CharField(unique=False,max_length=30,blank=False,null=False,default='中国')
    Email = models.EmailField(unique=False,blank=False,null=False)
    Mobile = models.CharField(unique=True,max_length=13,blank=True,null=True)
    CreatedTime = models.DateTimeField(auto_now_add=True)
    Rank = models.IntegerField(unique=False,blank=True,null=False,default=4)
    """
    1 mean super manager
    2 mean common manager
    3 mean company manager
    4 mean common user
    """


class CompanyModel(models.Model):
    COMPANY_CHIOCE={
        (0,"食品公司"),
        (1,"农产品公司"),
        (2,"医药试剂公司"),
        (3,"大型仪器设备公司"),
        (4,"中小型医疗设备公司"),
        (5,"重要产业园及种植基地"),
        (6,"天然药物原生药材"),
        (7,"中医院与名中医"),
        (8,"医药新特品种"),
        (9,"生物制药"),
        (10,"西医院与名西医"),
        (11,"健康管理咨询机构"),
        (12,"健康体检中心"),
        (13,"健康护理服务机构"),
        (14,"化妆品公司"),
        (15,"医疗美容门诊机构"),
        (16,"医疗美容专用产品公司"),
    }
    STATUS_CHOICE={
        (0,"审核中"),
        (1,"已通过"),
        (2,"退回"),
    }

    CompanyName = models.CharField(unique=False,max_length=50,blank=False,null=True)
    Email = models.EmailField(unique=False,blank=True,null=True)
    Mobile = models.CharField(unique=False,max_length=13,blank=True,null=True)
    Landline = models.CharField(unique=False,max_length=13,blank=True,null=True)
    CreatedTime = models.DateTimeField(auto_now_add=True)
    Owner = models.ForeignKey(UserModel,on_delete=models.CASCADE)
    Address = models.CharField(max_length=200,blank=True,null=True) 
    Abstract = models.CharField(max_length=100,blank=True,null=True) 
    Introduction = models.CharField(max_length=500,blank=True,null=True) 
    Class = models.SmallIntegerField(choices=COMPANY_CHIOCE,default=0)
    Figure = models.CharField(max_length=100,blank=True,null=True)
    Status = models.SmallIntegerField(choices=COMPANY_CHIOCE,default=0)


class NewsModel(models.Model):
    Subject = models.CharField(unique=False,max_length=50,blank=False,null=True)
    Time = models.DateField()
    CreatedTime = models.DateTimeField(auto_now_add=True)
    Owner = models.ForeignKey(UserModel,on_delete=models.CASCADE)
    Figure = models.CharField(max_length=100,blank=True,null=True)
    Abstract = models.CharField(max_length=100,blank=True,null=True) 
    Introduction = models.CharField(max_length=500,blank=True,null=True) 


class CumulativeModel(models.Model):
    Name = models.CharField(max_length=50,unique=True,blank=False,null=False) 
    Cumulative = models.SmallIntegerField(default=0)

    





