from django.db import models

# Create your models here.
class Loai(models.Model):
    loai = models.CharField(max_length=100)

    def __str__(self):
        return self.loai


class KhuyenMai(models.Model):
    ma = models.CharField(max_length=100)
    ten = models.CharField(max_length=100)
    giatri = models.IntegerField()
    ngaybd = models.DateTimeField()
    ngaykt = models.DateTimeField()
    ngaytao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.ten

def upload_path(instance, filname):
    return '/'.join([ filname])

class SanPham(models.Model):
    ten = models.CharField(max_length=50)
    giagoc = models.IntegerField()
    manhinh = models.CharField(max_length=100)
    chip = models.CharField(max_length=50)
    ram = models.CharField(max_length=100)
    bonhotrong = models.CharField(max_length=100)
    camerasau = models.CharField(max_length=100)
    cameratruoc = models.CharField(max_length=100)
    pin = models.CharField(max_length=50)
    cover = models.ImageField(blank=True, null=True, upload_to=upload_path)
    soluong = models.IntegerField()
    km = models.ForeignKey(KhuyenMai, on_delete=models.CASCADE, blank=True, null=True,)
    loai = models.ForeignKey(Loai, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.ten)


class DonGia(models.Model):
    gia = models.IntegerField()
    sanphamid = models.ForeignKey(SanPham, on_delete=models.CASCADE)
    ngaybd = models.DateTimeField()
    ngaykt = models.DateTimeField()

    def __str__(self):
        return str(self.gia)