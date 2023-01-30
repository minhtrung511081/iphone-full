from django.db import models

# Create your models here.

class Customer(models.Model):
    Name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.Name

    
class Item(models.Model):
    Name = models.CharField(max_length=100)
    Price = models.IntegerField()
    def __str__(self):
        return self.Name

class Order(models.Model):
    OrderNo = models.CharField(max_length=50)
    CustomerID = models.ForeignKey(Customer, on_delete=models.CASCADE)
    PMethod = models.CharField(max_length=50)
    GTotal = models.IntegerField()
    def __str__(self):
        return str(self.id)

class OrderItems(models.Model):
    OrderID = models.ForeignKey(Order, on_delete=models.CASCADE)
    ItemID = models.ForeignKey(Item, on_delete=models.CASCADE) 
    Quantity = models.IntegerField()
    def __str__(self):
        return str(self.id)