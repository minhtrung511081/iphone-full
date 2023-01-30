# Generated by Django 3.1.1 on 2020-10-31 05:18

from django.db import migrations, models
import django.db.models.deletion
import sanpham.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='KhuyenMai',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ma', models.CharField(max_length=100)),
                ('ten', models.CharField(max_length=100)),
                ('giatri', models.IntegerField()),
                ('ngaybd', models.DateTimeField()),
                ('ngaykt', models.DateTimeField()),
                ('ngaytao', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Loai',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('loai', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SanPham',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ten', models.CharField(max_length=50)),
                ('giagoc', models.IntegerField()),
                ('manhinh', models.CharField(max_length=100)),
                ('chip', models.CharField(max_length=50)),
                ('ram', models.CharField(max_length=100)),
                ('bonhotrong', models.CharField(max_length=100)),
                ('camerasau', models.CharField(max_length=100)),
                ('cameratruoc', models.CharField(max_length=100)),
                ('pin', models.CharField(max_length=50)),
                ('cover', models.ImageField(blank=True, null=True, upload_to=sanpham.models.upload_path)),
                ('soluong', models.IntegerField()),
                ('km', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sanpham.khuyenmai')),
                ('loai', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sanpham.loai')),
            ],
        ),
        migrations.CreateModel(
            name='DonGia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gia', models.IntegerField()),
                ('ngaybd', models.DateTimeField()),
                ('ngaykt', models.DateTimeField()),
                ('sanphamid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sanpham.sanpham')),
            ],
        ),
    ]