# Generated by Django 3.1.1 on 2020-11-14 11:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nhaphang', '0002_auto_20201101_0715'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='phieunhap',
            name='tongtien',
        ),
    ]