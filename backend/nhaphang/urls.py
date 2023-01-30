from django.urls import *
from . import views
urlpatterns = [
    path('SourceInputList/', views.SourceInputList.as_view()),
    path('DetailedSourceInput/<int:pk>/', views.DetailedSourceInput.as_view()),

    path('SalesCartList/', views.SalesCartList.as_view()),
    path('DetailedSalesCart/<int:pk>/', views.DetailedSalesCart.as_view()),
    path('addSalesCart/<int:pk>/', views.addSaleCard.as_view()),

    path('ctpnobjget/<int:pk>/', views.ctpnObjVget.as_view()),

    path('SalesInvoicesList/', views.SalesInvoicesList.as_view()),
    path('SalesInvoicesListget/', views.SalesInvoicesListget.as_view()),
    path('DetailedSalesInvoices/<int:pk>/', views.DetailedSalesInvoices.as_view()),

    path('InvoiceDetail/<int:pk>/', views.InvoiceDetail.as_view()),
    path('InvoiceList/', views.InvoiceList.as_view()),


]