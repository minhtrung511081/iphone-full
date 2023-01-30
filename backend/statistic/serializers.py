from rest_framework import serializers


class managecategories_Serializers(serializers.Serializer):
    id = serializers.IntegerField()
    ten = serializers.CharField(max_length=60)
    giagoc = serializers.IntegerField()
    loai = serializers.CharField()
    soluong = serializers.IntegerField()


class ctdh_Serializers(serializers.Serializer):
    id = serializers.IntegerField()
    soluong = serializers.IntegerField()
    gia = serializers.IntegerField()
    cover = serializers.CharField(max_length=60)
    ten = serializers.CharField(max_length=60)
    

    

class order_Serializers(serializers.Serializer):
    id_bill = serializers.CharField()
    id = serializers.IntegerField()
    sanpham = serializers.CharField()
    soluong = serializers.IntegerField()
    gia = serializers.CharField()
    address = serializers.CharField()
    ten = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

class put_Serializers(serializers.Serializer):
    bill = serializers.IntegerField()
    id = serializers.IntegerField()
    sanpham = serializers.CharField()
    soluong = serializers.IntegerField()
    gia = serializers.CharField()
    loai = serializers.CharField()
    
    # first_name_customer = serializers.CharField()
    # last_name_customer = serializers.CharField()
    
    
    address = serializers.CharField()
    username = serializers.CharField()

class statisticsSerializer(serializers.Serializer):
    bill = serializers.IntegerField()
    sanpham = serializers.CharField()
    soluong = serializers.IntegerField()
    gia = serializers.IntegerField()
    tongcong = serializers.IntegerField()


class totalSerializer(serializers.Serializer):
    soluong_total = serializers.IntegerField()
    total_money = serializers.IntegerField()