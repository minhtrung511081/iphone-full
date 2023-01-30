from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class TaiKhoan(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=200, blank=True, null=True,)
    phone_regex = RegexValidator(regex=r'^0\d{9,11}', message="Please enter right phone number")
    phone = models.CharField(max_length=11, validators=[phone_regex], unique=True,blank=True, null=True, )

    def __str__(self):
        return self.username


class ThongBao(models.Model):
    noidung = models.CharField(max_length=200)
    trangthai = models.CharField(max_length=50)

    def __str__(self):
        return self.noidung


class CauHoi(models.Model):
    noidung = models.CharField(max_length=200)
    trangthai = models.CharField(max_length=50)
    taikhoan = models.ForeignKey(TaiKhoan, on_delete=models.CASCADE)

    def __str__(self):
        return self.noidung


class TraLoi(models.Model):
    noidung = models.CharField(max_length=200)
    trangthai = models.CharField(max_length=50)
    cauhoi = models.ForeignKey(CauHoi, on_delete=models.CASCADE)
    taikhoan = models.ForeignKey(TaiKhoan, on_delete=models.CASCADE)

    def __str__(self):
        return self.noidung