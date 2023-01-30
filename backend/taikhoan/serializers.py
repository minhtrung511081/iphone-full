from rest_framework import serializers
from .models import *


class   AccountSerializerAdmin(serializers.ModelSerializer):
    class Meta:
        model = TaiKhoan
        fields = ['id', 'username', 'is_superuser', 'is_staff', 'first_name', 'last_name', 'email', 'phone', 'address']

    def create(self, validated_data):
        user = TaiKhoan.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.save()
        return instance

class xemacS(serializers.Serializer):
   class Meta:
        model = TaiKhoan
        fields = '__all__'
    

class ChangePasswordSerializer(serializers.Serializer):
    model = TaiKhoan
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaiKhoan
        fields = '__all__'


class ThongbaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThongBao
        fields = '__all__'

class AccountSerializerUser(serializers.ModelSerializer):
    username = serializers.CharField(required=False)

    class Meta:
        model = TaiKhoan
        fields = ['id','username', 'first_name', 'last_name', 'email', 'phone', 'address']


class RegisterAccount(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )

    class Meta:
        model = TaiKhoan
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'address', 'phone']

    def create(self, validated_data):
        user = TaiKhoan.objects.create_user(**validated_data)
        return user