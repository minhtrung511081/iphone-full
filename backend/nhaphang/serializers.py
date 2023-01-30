from rest_framework import serializers
from .models import *
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import APIException
from sanpham.models import *
from taikhoan.models import *

class SalesInvoicesSerializer(serializers.ModelSerializer):
    # nguonnhap = serializers.StringRelatedField(many=False)
    staff = serializers.StringRelatedField(many=False)
    class Meta:
        model = PhieuNhap
        fields = ['id', 'ngaytao', 'nguonnhap', 'staff']

class SalesInvoicesSerializerget(serializers.ModelSerializer):
    nguonnhap = serializers.StringRelatedField(many=False)
    staff = serializers.StringRelatedField(many=False)
    class Meta:
        model = PhieuNhap
        fields = ['id', 'ngaytao', 'nguonnhap', 'staff']

class SalesCartSerializer(serializers.ModelSerializer):
    gia = serializers.FloatField(read_only=True)
    class Meta:
        model = ChiTietPhieuNhap
        fields = ['id', 'sanpham', 'soluong', 'phieunhap','gia']

    def update(self, instance, validated_data):
        old_quantity = instance.soluong
        new_quantity = validated_data['soluong']
        sanpham = instance.sanpham
        sanpham.soluong = sanpham.soluong + (new_quantity - old_quantity)
        print(sanpham.soluong)
        sanpham.save()
        instance.soluong = validated_data.get('soluong', instance.soluong)
        instance.gia = validated_data.get('gia', instance.gia)
        instance.save()
        return instance

    # def destroy(self, instance, validated_data):
    #     old_quantity = instance.soluong
    #     # new_quantity = validated_data['soluong']
    #     sanpham = instance.sanpham
    #     sanpham.soluong = sanpham.soluong - old_quantity
    #     print(sanpham.soluong)
    #     sanpham.save()
    #     instance.soluong = validated_data.get('soluong', instance.soluong)
    #     instance.gia = validated_data.get('gia', instance.gia)
    #     instance.save()
    #     return instance


class addSaleSerializer1(serializers.ModelSerializer):
    gia = serializers.FloatField(read_only=True)

    class Meta:
        model = ChiTietPhieuNhap
        fields = ['id', 'sanpham', 'soluong', 'gia']

    def create(self, validated_data):
        sl =validated_data.get('soluong')
        sp = get_object_or_404(SanPham, pk=validated_data['sanpham'].id)
        sp.soluong += sl
        # slcu = sp.soluong
        # slmoi = sl + slcu
        sp.save()
        # SanPham.objects.update(soluong=sl)   
        if validated_data.get('gia', None):
            result = ChiTietPhieuNhap.objects.create(**validated_data)
        else:
            price = validated_data['sanpham'].giagoc
            result = ChiTietPhieuNhap.objects.create(gia=price, **validated_data)
        return result

    
class ctpnObjSget(serializers.ModelSerializer):
    gia = serializers.FloatField(read_only=True)
    sanpham = serializers.StringRelatedField(many=False)
    class Meta:
        model = ChiTietPhieuNhap
        fields = ['id', 'sanpham','phieunhap', 'soluong', 'gia']

class InputSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NguonNhap
        fields = ['id', 'name', 'email', 'address', 'phone']


class DetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChiTietPhieuNhap
        fields = ['id', 'mausp', 'soluong']

    def create(self, validated_data):
        mausp = get_object_or_404(MauSanPham, pk=validated_data['mausp'].id)
        soluong = validated_data['soluong']
        mausp.soluong += soluong
        mausp.save()
        return ChiTietPhieuNhap.objects.create(**validated_data)

    def update(self, instance, validated_data):
        product = get_object_or_404(SanPham, pk=instance.product.id)
        new_quantity = validated_data['quantity']
        old_quantity = instance.quantity
        product.quantity = product.quantity + new_quantity - old_quantity
        if product.quantity >= 0:
            product.save()
            instance.quantity = validated_data.get('quantity', instance.quantity)
            instance.price = validated_data.get('price', instance.price)
            instance.expired_date = validated_data.get('expired_date', instance.expired_date)
            instance.save()
            return instance
        raise APIException('Can not update this because the quantity in product will reduce under 0.')


class InvoiceWithDetailSerializer(serializers.ModelSerializer):
    ngaytao = serializers.DateTimeField(read_only=True)
    detail = DetailSerializer(write_only=True, many=True, required=False)
    staff = serializers.CharField(required=False)
    tongtien= serializers.IntegerField(required=False)
    class Meta:
        model = PhieuNhap
        fields = ['id', 'nguonnhap', 'staff', 'ngaytao', 'tongtien', 'detail']

    def create(self, validated_data):
        detail = validated_data.pop('detail')
        phieunhap = PhieuNhap.objects.create(**validated_data)
        products = []
        for each in detail:
            mausp = get_object_or_404(MauSanPham, pk=each['mausp'].id)
            soluong = each['soluong']
            mausp.soluong += soluong
            mausp.save()
            ChiTietPhieuNhap.objects.create(phieunhap=phieunhap, **each)
            products.append(mausp)
        #
        # for i in range(len(detail)):
        #     products[i].save()
        #     SalesInvoices.objects.create(invoice=invoice, **detail[i])

        return phieunhap