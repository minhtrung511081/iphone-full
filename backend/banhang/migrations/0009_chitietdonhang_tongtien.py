# Generated by Django 3.1.1 on 2020-11-07 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banhang', '0008_remove_chitietdonhang_tongtien'),
    ]

    operations = [
        migrations.AddField(
            model_name='chitietdonhang',
            name='tongtien',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
