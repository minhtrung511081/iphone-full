# Generated by Django 3.1.1 on 2020-10-31 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sanpham', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='khuyenmai',
            name='ngaybd',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='khuyenmai',
            name='ngaykt',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='khuyenmai',
            name='ngaytao',
            field=models.DateField(),
        ),
    ]
