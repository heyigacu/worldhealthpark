
from . import user_views,company_views,news_views,web_views
from django.urls import re_path as url

"""
API:


user login: localhost:8000/login/
user register: localhost:8000/users/

company register: post localhost:8000/companys/
company update: post localhost:8000/companys/



"""

urlpatterns=[
    # url(r'^users/$',views.UserListAPIView.as_view()),
    # url(r'^users/$',views.UserAcquireAPIView.as_view()),
    url(r'^user/acquire/$',user_views.UserAcquireAPIView.as_view()),
    url(r'^users/acquire/$',user_views.UsersAcquireAPIView.as_view()),
    url(r'^user/login/$',user_views.UserLoginAPIView.as_view()),
    url(r'^user/register/$',user_views.UserRegisterAPIView.as_view()),
    url(r'^user/validate_email/$',user_views.validate_email),
    url(r'^user/changepassword/$',user_views.UserChangePasswordAPIView.as_view()),
    url(r'^user/change_email/$',user_views.UserChangeEmailAPIView.as_view()),
    url(r'^user/update/$',user_views.UserUpdateAPIView.as_view()),
    url(r'^user/acquirebyid/$',user_views.UserAcquireByIDAPIView.as_view()),
    url(r'^user/deletebyid/$',user_views.UserDeleteByIDAPIView.as_view()),
    url(r'^user/declare_english/$',user_views.declare_english),
    url(r'^user/declare_chinese/$',user_views.declare_chinese),
    url(r'^users/count/$',user_views.count),

    
    url(r'^company/register/$',company_views.CompanyRegisterAPIView.as_view()),
    url(r'^company/upload_figure/$',company_views.UploadCompanyFigureAPIView.as_view()),
    url(r'^companys/acquire/$',company_views.CompanysAcquireAPIView.as_view()),
    url(r'^companys/status/$',company_views.CompanysStatusAPIView.as_view()),
    url(r'^company/acquirebyid/$',company_views.CompanyAcquireByIDAPIView.as_view()),
    url(r'^company/deletebyid/$',company_views.CompanyDeleteByIDAPIView.as_view()),
    url(r'^company/update/$',company_views.CompanyUpdateAPIView.as_view()),
    url(r'^company/changestatus/$',company_views.CompanyStatusChangeByIDAPIView.as_view()),
    url(r'^companys/acquirebyclass/$',company_views.CompanysAcquireByClassAPIView.as_view()),
    url(r'^companys/count/$',company_views.count),

    url(r'^newses/acquire/$',news_views.NewsesAcquireAPIView.as_view()),
    url(r'^news/acquirebyid/$',news_views.NewsAcquireByIDAPIView.as_view()),
    url(r'^news/upload_figure/$',news_views.UploadNewsFigureAPIView.as_view()),
    url(r'^news/create/$',news_views.NewsCreateAPIView.as_view()),
    url(r'^news/update/$',news_views.NewsUpdateAPIView.as_view()),
    url(r'^news/deletebyid/$',news_views.NewsDeleteByIDAPIView.as_view()),
    url(r'^newses/acquirebyn/$',news_views.NewsAcqurieByNAPIView.as_view()),
    url(r'^news/acquirebyid/(?P<id>\d+)/$', news_views.NewsAcquireByURLIDAPIView.as_view()),

    url(r'^web/set_cumulative_access/$',web_views.set_cumulative_access),

]


