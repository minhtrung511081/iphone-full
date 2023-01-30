from rest_framework import serializers
from .models import *
from rest_framework.exceptions import APIException
from sanpham.models import *
from taikhoan.models import *

class PurchaseInvoiceSerializer(serializers.ModelSerializer):

    customer = serializers.StringRelatedField(many=False)
    class Meta:
        model = DonHang
        fields = ['id', 'ngaytao', 'customer']


class PurchaseInvoiceDetailsSerializer(serializers.ModelSerializer):
    donhang = serializers.StringRelatedField(many=False)
    class Meta:
        model = ChiTietDonHang
        fields = ['id' ,'soluong', 'sanpham', 'donhang','gia']


class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChiTietDonHang
        fields = ['id', 'sanpham', 'soluong', 'gia']


class newSerializer(serializers.ModelSerializer):
    gia = serializers.FloatField(required=False)
    soluong = serializers.FloatField(required=False)
    class Meta:
        model = ChiTietDonHang
        fields = ['id', 'sanpham','gia','soluong']
    
    def create(self, validated_data):
        # in_stock = validated_data['sanpham'].soluong
        # if validated_data.get('gia', None):
            # result = ChiTietDonHang.objects.create(**validated_data)
        # else:
        # gia = validated_data['sanpham'].giagoc
        result = ChiTietDonHang.objects.create(**validated_data)
        return result
  

class InvoiceWithDetailSerializer(serializers.ModelSerializer):
    detail = newSerializer(write_only=True, many=True)
    class Meta:
        model = DonHang
        fields = ['id', 'ngaytao','detail']

    def create(self, validated_data):
        # detail [] = validated_data
        detail = validated_data.pop('detail')
        
        donhang = DonHang.objects.create(**validated_data)
           
        for each in detail:
            sanpham = each['sanpham']
            sanpham.save()
            # soluong = each['soluong']
            # temp = each['soluong']
            print(each['soluong'])
            # print(qty)
            gia = sanpham.giagoc
            print(gia)
            print(each)
            print(validated_data)
            ChiTietDonHang.objects.create(donhang=donhang,gia=gia, **each)
        return donhang


class InvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = DonHang
        fields = ['id', 'customer', 'ngaytao']




class DonHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonHang
        fields = ['id', 'soluong', 'sanpham', 'donhang']


class DetailSerializer1(serializers.ModelSerializer):
    gia = serializers.FloatField(read_only=True)

    class Meta:
        model = ChiTietDonHang
        fields = ['id', 'sanpham', 'soluong', 'gia']

    def create(self, validated_data):
        if validated_data.get('gia', None):
            result = ChiTietDonHang.objects.create(**validated_data)
        else:
            price = validated_data['sanpham'].giagoc
            result = ChiTietDonHang.objects.create(gia=price, **validated_data)
        return result


class hoadonS(serializers.ModelSerializer):
    class Meta:
        model = DonHang
        fields = ['id', 'customer', 'ngaytao']


class ctdhObjS(serializers.ModelSerializer):
    gia = serializers.FloatField(read_only=True)
    class Meta:
        model = ChiTietDonHang
        fields = ['id', 'sanpham','donhang', 'soluong', 'gia']


class ctdhObjSget(serializers.ModelSerializer):
    gia = serializers.FloatField(read_only=True)
    sanpham = serializers.StringRelatedField(many=False)
    class Meta:
        model = ChiTietDonHang
        fields = ['id', 'sanpham','donhang', 'soluong', 'gia']

class donhangS(serializers.ModelSerializer):
    class Meta:
        model = DonHang
        fields = ['id', 'customer', 'ngaytao']

class idS(serializers.ModelSerializer):
    class Meta:
        model = DonHang
        fields = ['id']



class DetailSerializer123(serializers.ModelSerializer):
    gia = serializers.FloatField(required=False)

    class Meta:
        model = ChiTietDonHang
        fields = ['id', 'sanpham', 'soluong', 'gia']

    
    def create(self, validated_data):
        in_stock = validated_data['sanpham'].soluong
        if validated_data['soluong'] > in_stock:
            raise APIException('The quantity of this product is not enough for adding.')
        if validated_data.get('gia', None):
            result = ChiTietDonHang.objects.create(**validated_data)
        else:
            gia = validated_data['sanpham'].giagoc
            print(validated_data['sanpham'])
            result = ChiTietDonHang.objects.create(gia=gia, **validated_data)
        return result


class InvoiceWithDetailSerializer1(serializers.ModelSerializer):

    class Meta:
        model = DonHang
        fields = ['id', 'customer','ngaytao']

    def create(self, validated_data):

        donhang = DonHang.objects.create(**validated_data)

        if validated_data.get('gia', None):
            result = ChiTietDonHang.objects.create(**validated_data)
        else:
            price = validated_data['sanpham'].giagoc
            result = ChiTietDonHang.objects.create(gia=price, **validated_data)
        return donhang
