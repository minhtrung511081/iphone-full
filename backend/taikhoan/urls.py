from django.urls import *
from django.conf.urls import *
from rest_framework import routers
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token #addthis
router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)
urlpatterns = [
    path('registerAccount/', views.createAccount.as_view()),
    url(r'^getToken/', obtain_jwt_token),
    url(r'^token/', TokenObtainPairView.as_view()),
    path('accountList/', views.AccountList.as_view()),
    path('accountListuser/', views.AccountList1.as_view()),
    path('optionsAccountListAdmin/<int:pk>/', views.OptionsAccountListAdmin.as_view()),
    path('changePassword/', views.ChangePasswordView.as_view()),
    path('optionsAccountUser/', views.OptionsAccountUser.as_view()),
    url(r'^', include(router.urls)),
    url(r'^auth/', ObtainAuthToken.as_view()),
    
    path('xemac/', views.xemac.as_view()),
    path('thongbaoList/', views.createThongbao.as_view()),
    path('objectThongbao/<int:pk>/', views.objectThongbao.as_view()),
    path(r'api-token-auth/', obtain_jwt_token),
    path(r'api-token-refresh/', refresh_jwt_token),
]
