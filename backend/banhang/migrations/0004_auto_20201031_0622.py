# Generated by Django 3.1.1 on 2020-10-31 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banhang', '0003_auto_20201031_0519'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donhang',
            name='ngaytao',
            field=models.DateField(),
        ),
    ]
