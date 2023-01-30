from django.urls import *
from django.conf.urls import *
from . import views
urlpatterns = [
    path('manageCategories/<int:pk>/', views.manageCategories.as_view()),
    path('order/<int:pk>/', views.order_view.as_view()),
    path('statistics/<int:pk>/', views.statisticsView.as_view()),
    path('total/<int:pk>/', views.totalView.as_view()),
    path('put/<int:pk>/', views.put_flower.as_view()),
    path('ctdh/<int:pk>/', views.ctdhV.as_view()),
]
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]
