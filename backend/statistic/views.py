from .serializers import *
from rest_framework import generics
from .models import *
from sanpham.models import SanPham, Loai
from nhaphang.models import ChiTietPhieuNhap, PhieuNhap, NguonNhap
from taikhoan.models import TaiKhoan
from banhang.models import DonHang, ChiTietDonHang


class manageCategories(generics.ListAPIView):
    serializer_class = managecategories_Serializers

    def get_queryset(self):
        # if self.request.user.is_s is True:
        # queryset = SanPham.objects.filter(loai__loai=self.request.data.get('loai'))
        queryset = SanPham.objects.filter(loai=self.kwargs['pk'])
        result = []
        for i in queryset:
            result.append(manage_flower(i.id, i.ten, i.giagoc, i.loai, i.soluong))
        return result


class ctdhV(generics.ListAPIView):
    serializer_class = ctdh_Serializers

    def get_queryset(self):
       
        ct = ChiTietDonHang.objects.filter(donhang=self.kwargs['pk'])
        
        result = []
        for i in ct:
            pro = SanPham.objects.filter(chitietdonhang__id=i.id)
            result.append(ctdh(i.id, i.soluong, i.gia,pro[0].cover,pro[0].ten))
        return result


class put_flower(generics.ListCreateAPIView):
    serializer_class = put_Serializers

    def get_queryset(self):
        if self.request.user.is_staff is True:
            card = ChiTietPhieuNhap.objects.filter(sanpham__id=self.kwargs['pk'])
            cate = Loai.objects.filter(sanpham__id=self.kwargs['pk'])
            
            result = []
            for ca in card:
                bill = PhieuNhap.objects.filter(chitietphieunhap__id=ca.id)
                address = NguonNhap.objects.filter(phieunhap__id=bill[0].id)
                account = TaiKhoan.objects.filter(phieunhap__id=bill[0].id)   
                result.append(put(ca.id, ca.sanpham, ca.soluong, ca.gia, cate[0].loai,bill[0].id,address[0].name, account[0].username))
            return result


class order_view(generics.ListCreateAPIView):
    serializer_class = order_Serializers

    def get_queryset(self):
        if self.request.user.is_staff is True:
            card = ChiTietDonHang.objects.filter(donhang__id=self.kwargs['pk'])
            id_bill = self.kwargs['pk']
            result = []
            for ca in card:
                account = TaiKhoan.objects.filter(donhang__id=self.kwargs['pk'])
                # add = []
                # ten = []

                for ac in account:
                    # add.append(ac.address)
                    # ten.append(ac.username)

                    result.append(order(id_bill, ca.id, ca.sanpham, ca.soluong, ca.gia, ac.address, ac.username,ac.first_name,ac.last_name))
            return result


class statisticsView(generics.ListCreateAPIView):
    serializer_class = statisticsSerializer

    def get_queryset(self):
        if self.request.user.is_staff is True:
            card = ChiTietDonHang.objects.filter(sanpham__id=self.kwargs['pk'])
            # queryset = Product.objects.filter(categoriesCode__idCategories=self.request.data.get('categories'))
            kq = []
            tongcong = 0
            for i in card:
                bill = DonHang.objects.filter(chitietdonhang__id=i.id)
                tongcong = i.soluong * i.gia
                kq.append(statistics(bill[0].id, i.sanpham, i.soluong, i.gia, tongcong))
            return kq


class totalView(generics.ListCreateAPIView):
    serializer_class = totalSerializer

    def get_queryset(self):
        if self.request.user.is_staff is True:
            card = ChiTietDonHang.objects.filter(sanpham__id=self.kwargs['pk'])
            result = []
            soluong = 0
            # totalMoney = decimal.Decimal(0.0)
            totalMoney = 0
            for i in card:
                soluong = i.soluong + soluong
                totalMoney = i.soluong * i.gia + totalMoney
            result.append(total(soluong, totalMoney))
        return result
