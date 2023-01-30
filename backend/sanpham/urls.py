from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

from . import views
from .views import *
# router = routers.DefaultRouter()
# router.register('hinhanh/', HinhAnhViewSet)
urlpatterns = [
    path('sanpham/', views.Sanpham.as_view()),
    path('objectsp/<int:pk>/', views.objectspview.as_view()),

    # path('spUD/<int:pk>/', views.updateV.as_view()),

    path('obj/<int:pk>/', views.sanphamnew.as_view()),
     path('spctdh/<int:pk>/', views.sanphamctdh.as_view()),
    # path('', include(router.urls)),
    path('loai/', views.Loaiview.as_view()),
    path('objectloai/<int:pk>/', views.objectloaiview.as_view()),
    path('khuyenmai/', views.KhuyenMaiview.as_view()),
    path('objkhuyenmai/<int:pk>/', views.KhuyenMai_obj_view.as_view()),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
