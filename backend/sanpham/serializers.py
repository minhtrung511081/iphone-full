from rest_framework import serializers
from .models import *

class SanphamSerializer(serializers.ModelSerializer):
    # km = serializers.StringRelatedField(many=False)
    # loai = serializers.StringRelatedField(many=False)
    class Meta:
        model = SanPham
        # fields = ['ten','giagoc','manhinh','chip','ram','bonhotrong','camerasau','cameratruoc','pin','cover','soluong','km','loai']
        fields = "__all__"


class SanphamSerializer1(serializers.ModelSerializer):
    # km = serializers.StringRelatedField(many=False)
    # loai = serializers.StringRelatedField(many=False)
    class Meta:
        model = SanPham
        fields = ['id','ten','giagoc','cover','soluong','loai']


# class SanphamUpdate(serializers.ModelSerializer):
#     class Meta:
#         model = SanPham
#         fields = ['id','soluong']

#     def update(self, instance, validated_data):
#         sp =validated_data.get('id', instance.id)
#         instance.soluong = validated_data.get('soluong', instance.soluong)
#         instance.save()
#         return instance
        

class KhuyenMaiSerializer(serializers.ModelSerializer):
    class Meta:
        model = KhuyenMai
        fields = "__all__"


class LoaiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loai
        fields = "__all__"

