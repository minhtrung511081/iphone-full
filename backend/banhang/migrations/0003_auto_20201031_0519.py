# Generated by Django 3.1.1 on 2020-10-31 05:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sanpham', '0001_initial'),
        ('banhang', '0002_auto_20201031_0518'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chitietdonhang',
            old_name='donhang',
            new_name='donhangn',
        ),
        migrations.AlterUniqueTogether(
            name='chitietdonhang',
            unique_together={('sanpham', 'donhangn')},
        ),
    ]