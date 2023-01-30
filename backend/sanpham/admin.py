from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(SanPham),
admin.site.register(Loai),
admin.site.register(KhuyenMai),
