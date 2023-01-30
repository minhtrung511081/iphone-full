from django.db import models
from sanpham.models import *
from django.core.validators import RegexValidator
from taikhoan.models import *
from django.core.validators import MinValueValidator, MaxValueValidator
class NguonNhap(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=200)
    phone_regex = RegexValidator(regex=r'^0\d{9,11}', message="Please enter right phone number")
    phone = models.CharField(max_length=11, validators=[phone_regex], unique=True)

    def __str__(self):
        return self.name


class PhieuNhap(models.Model):
    # tongtien = models.IntegerField()
    ngaytao = models.DateField(auto_now_add=True)
    nguonnhap = models.ForeignKey(NguonNhap, on_delete=models.CASCADE)
    staff = models.ForeignKey(TaiKhoan, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)

class ChiTietPhieuNhap(models.Model):
    soluong = models.IntegerField()
    phieunhap = models.ForeignKey(PhieuNhap, on_delete=models.CASCADE)
    sanpham = models.ForeignKey(SanPham, on_delete=models.CASCADE)
    gia = models.FloatField(validators=[MinValueValidator(0)])

    class Meta:
        unique_together = (('sanpham', 'phieunhap'),)

    def __str__(self):
        return str(self.id)

