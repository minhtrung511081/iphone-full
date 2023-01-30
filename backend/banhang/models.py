from django.db import models
from sanpham.models import *
from taikhoan.models import *
from django.core.validators import MinValueValidator, MaxValueValidator

class DonHang(models.Model):
    ngaytao = models.DateField(auto_now_add=True)
    customer = models.ForeignKey(TaiKhoan,on_delete=models.CASCADE)
    # tongtien = models.IntegerField()
    def __str__(self):
        return str(self.id)


class ChiTietDonHang(models.Model):
    soluong = models.IntegerField()
    sanpham = models.ForeignKey(SanPham, on_delete=models.CASCADE)
    donhang = models.ForeignKey(DonHang, on_delete=models.CASCADE)
    gia = models.FloatField(validators=[MinValueValidator(0)])

    class Meta:
        unique_together = (('sanpham', 'donhang'),)

    def __str__(self):
        return str(self.id)

