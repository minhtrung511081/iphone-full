# Generated by Django 3.1.1 on 2020-11-15 13:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nhaphang', '0004_auto_20201114_1558'),
    ]

    operations = [
        migrations.AddField(
            model_name='chitietphieunhap',
            name='gia',
            field=models.FloatField(default=1, validators=[django.core.validators.MinValueValidator(0)]),
            preserve_default=False,
        ),
    ]
