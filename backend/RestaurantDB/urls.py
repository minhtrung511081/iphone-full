from django.urls import include, path
from . import views
from .views import *

urlpatterns = [
    path('Order/', views.OrderView.as_view()),
    path('Order/<int:pk>/', views.ObjOrderView.as_view()),
    path('Item/', views.ItemView.as_view()),
    path('Customer/', views.CustomerView.as_view()),
]