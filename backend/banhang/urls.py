from django.urls import *
from django.conf.urls import *
from . import views
urlpatterns = [
    path('PurchaseInvoiceList/', views.PurchaseInvoiceList.as_view()),
    path('hoadon/<int:pk>/', views.hoadonV.as_view()),
    # path('PurchaseInvoiceDetailsList/', views.PurchaseInvoiceDetailsList.as_view()),
    path('DetailedPurchaseInvoiceDetails/<int:pk>/', views.DetailedPurchaseInvoiceDetails.as_view()),
    path('chitietV/<int:pk>/', views.chitietV.as_view()),
    # path('make/', views.MakePurchase.as_view(), name='make-purchase'),
    path('detail/<int:pk>/', views.DetailList.as_view(), name='detail-list'),
    path('ctdhobj/<int:pk>/', views.ctdhObjV.as_view()),
    path('ctdhobjget/<int:pk>/', views.ctdhObjVget.as_view()),
    path('noid/', views.noid.as_view()),
    path('donhanglist/', views.donhangList.as_view()),
    path('idV/', views.idV.as_view()),
    path('donhangdetail/<int:pk>/', views.donhangxoa.as_view()),
    path('send/', views.send_email),
    path('subscribe/', views.subscribe, name = 'subscribe'),
    path('kiemtra/<int:pk>/', views.kiemtraV.as_view()),
    path('make/', views.MakePurchase.as_view()),
]
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]