# Generated by Django 3.1.1 on 2020-11-06 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banhang', '0005_auto_20201031_1331'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donhang',
            name='ngaytao',
            field=models.DateField(auto_now_add=True),
        ),
    ]
