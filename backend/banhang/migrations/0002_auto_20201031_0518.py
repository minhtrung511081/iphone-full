# Generated by Django 3.1.1 on 2020-10-31 05:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sanpham', '0001_initial'),
        ('banhang', '0001_initial'),
        ('taikhoan', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='donhang',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='taikhoan.taikhoan'),
        ),
        migrations.AddField(
            model_name='chitietdonhang',
            name='donhang',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='banhang.donhang'),
        ),
        migrations.AddField(
            model_name='chitietdonhang',
            name='sanpham',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sanpham.sanpham'),
        ),
        migrations.AlterUniqueTogether(
            name='chitietdonhang',
            unique_together={('sanpham', 'donhang')},
        ),
    ]