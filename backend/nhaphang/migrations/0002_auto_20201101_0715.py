# Generated by Django 3.1.1 on 2020-11-01 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nhaphang', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phieunhap',
            name='ngaytao',
            field=models.DateField(auto_now_add=True),
        ),
    ]
