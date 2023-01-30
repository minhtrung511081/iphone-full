from django.db import models

# Create your models here.

class ctdh(object):
    def __init__(self, id, soluong, gia, cover,ten):
        self.id = id
        self.soluong = soluong
        self.gia = gia
        self.cover = cover
        self.ten = ten


class manage_flower(object):
    def __init__(self, id, ten, giagoc, loai, soluong):
        self.id = id
        self.ten = ten
        self.giagoc = giagoc
        self.loai = loai
        self.soluong = soluong


class order(object):
    def __init__(self, id_bill, id, sanpham, soluong, gia, add, ten, first_name, last_name):
        self.id_bill = id_bill
        self.id = id
        self.sanpham = sanpham
        self.soluong = soluong
        self.gia = gia
        self.address = add
        self.ten = ten
        self.first_name = first_name
        self.last_name = last_name

class put(object):
    def __init__(self,id, sanpham, soluong, gia, loai, bill,address,username):
        # first_name, last_name,
        self.id = id
        self.sanpham = sanpham
        self.soluong = soluong
        self.gia = gia
        self.loai = loai
        
        # self.first_name_customer = first_name
        # self.last_name_customer = last_name
        
        self.bill = bill
        self.address = address
        self.username = username

class statistics(object):
    def __init__(self,  bill, sanpham, soluong, gia, tongcong):
        self.bill = bill
        self.sanpham = sanpham
        self.soluong = soluong
        self.gia = gia
        self.tongcong = tongcong


class total(object):
    def __init__(self, soluong, totalmoney):
        self.soluong_total = soluong
        self.total_money = totalmoney

