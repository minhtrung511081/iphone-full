import django_filters.rest_framework
from django.http import HttpResponse
from rest_framework import generics, permissions
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from .serializers import *
from .models import *
from datetime import datetime, timedelta
from django.shortcuts import render, get_object_or_404


class SalesInvoicesList(generics.ListCreateAPIView):
    # pagination_class = LimitOffsetPagination
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields = ['staff']
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = SalesInvoicesSerializer
    queryset = PhieuNhap.objects.all()
    def perform_create(self, serializer):
        serializer.save(staff=self.request.user)
    # def get_queryset(self):
    #     if self.request.user.is_superuser is True:
    #         return PhieuNhap.objects.all()
        # elif self.request.user.is_active is True:
        #     queryset = taikhoan.objects.filter(staff=self.request.user.id)
        #     return queryset
    # def get_queryset(self):
    #     one_week_ago = datetime.today() - timedelta(days=7)
    #     queryset = SalesInvoices.objects.filter(created_time__gte=one_week_ago).order_by('-created_time')
    #     # Get all invoices
    #     is_all = self.request.query_params.get('all', None)
    #     if is_all is not None and is_all == 'True':
    #         queryset = SalesInvoices.objects.all()
    #     # filter by time
    #     serializer = self.get_serializer(data=self.request.data)
    #     serializer.is_valid(raise_exception=True)
    #     if serializer.data.get('start_date') is not None and serializer.data.get('end_date') is not None:
    #         start_date = str(serializer.data.get('start_date')) + ' 00:00:00'
    #         end_date = str(serializer.data.get('end_date')) + ' 23:59:59'
    #         queryset = queryset.filter(created_time__range=[start_date, end_date])
    #     # filter by source
    #     source = self.request.query_params.get('source', None)
    #     if source is not None:
    #         queryset = queryset.filter(source=source)
    #     return queryset

    # def perform_create(self, serializer):
    #     serializer.save(staff=self.request.user)
    #     # bill = Account.objects.get(id=self.request.user.id)
    #     # serializer.save(staff=bill)


class SalesInvoicesListget(generics.ListAPIView):
    serializer_class = SalesInvoicesSerializerget
    queryset = PhieuNhap.objects.all()
   


class DetailedSalesInvoices(generics.RetrieveUpdateDestroyAPIView):
    queryset = PhieuNhap.objects.all()
    serializer_class = SalesInvoicesSerializer
    # permission_classes = [permissions.IsAdminUser]

    # def put(self, request, *args, **kwargs):
    #     if self.request.user.is_superuser is True:
    #         return self.update(request, *args, **kwargs)
    #     else:
    #         return HttpResponse("you not permission edit sales invoices")

    # def delete(self, request, *args, **kwargs):
    #     if self.request.user.is_staff is True:
    #         return self.destroy(request, *args, **kwargs)
    #     else:
    #         return HttpResponse("you not permission delete sales invoices")


class addSaleCard(generics.ListCreateAPIView):
    serializer_class = addSaleSerializer1

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChiTietPhieuNhap.objects.filter(phieunhap=self.kwargs['pk'])

    def perform_create(self, serializer):
        hoa = get_object_or_404(PhieuNhap, pk=self.kwargs['pk'])
        serializer.save(phieunhap=hoa)

class ctpnObjVget(generics.ListAPIView):
    def get_queryset(self):
        return ChiTietPhieuNhap.objects.filter(phieunhap=self.kwargs['pk'])
    serializer_class = ctpnObjSget

class SalesCartList(generics.ListCreateAPIView):
    serializer_class = SalesCartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser is True:
            return ChiTietPhieuNhap.objects.all()
        else:
            return ChiTietPhieuNhap.objects.filter(PhieuNhap__staff=self.request.user.id)


class InvoiceDetail(generics.ListCreateAPIView):
    serializer_class = DetailSerializer

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChiTietPhieuNhap.objects.filter(PhieuNhap=self.kwargs['pk'])

    def perform_create(self, serializer):
        phieunhap = get_object_or_404(PhieuNhap, pk=self.kwargs['pk'])
        serializer.save(phieunhap=phieunhap)


class DetailedSalesCart(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SalesCartSerializer
    queryset = ChiTietPhieuNhap.objects.all()
    # permission_classes = [permissions.IsAdminUser]

    # def get(self, request, *args, **kwargs):
    #     if self.request.user.is_superuser is True:
    #         return self.retrieve(request, *args, **kwargs)
    #     else: return HttpResponse("you not have permission")
    # def perform_destroy(self, serializer):
    #     phieunhap = get_object_or_404(PhieuNhap, pk=self.kwargs['pk'])
    #     serializer.save(phieunhap=phieunhap)
    def perform_destroy(self, instance):
        sl = instance.soluong
        # sp = get_object_or_404(SanPham, pk=validated_data['sanpham'].id)
        sanpham = instance.sanpham
        soluongnew = sanpham.soluong - sl
        SanPham.objects.update(soluong=soluongnew)  
        instance.delete()

class SourceInputList(generics.ListCreateAPIView):
    queryset = NguonNhap.objects.all()
    serializer_class = InputSourceSerializer
    # pagination_class = LimitOffsetPagination
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields = ['phone', 'email']

    # def get(self, request, *args, **kwargs):
    #     if self.request.user.is_staff is True:
    #         return self.list(request, *args, **kwargs)
    #     else: return HttpResponse("you not have permission")

    # def post(self, request, *args, **kwargs):
    #     if self.request.user.is_staff is True:
    #         return self.create(request, *args, **kwargs)
    #     else: return HttpResponse("you not have permission")


class DetailedSourceInput(generics.RetrieveUpdateDestroyAPIView):
    queryset = NguonNhap.objects.all()
    serializer_class = InputSourceSerializer
    # permission_classes = [permissions.IsAdminUser]

    # def get_object(self):
    #     obj = SaleSource.objects.filter(id=self.kwargs['pk'])
    #     return obj

    def get_queryset(self):
        return NguonNhap.objects.filter(id=self.kwargs['pk'])


class InvoiceList(generics.ListCreateAPIView):
    serializer_class = InvoiceWithDetailSerializer

    def perform_create(self, serializer):

        serializer.save(staff=self.request.user)


    def get_queryset(self):
        one_week_ago = datetime.today() - timedelta(days=7)
        queryset = PhieuNhap.objects.filter(ngaytao_gte=one_week_ago)
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        nguonnhap = self.request.query_params.get('nguonnhap', None)
        if nguonnhap is not None:
            queryset = queryset.filter(nguonnhap=nguonnhap)
        return queryset