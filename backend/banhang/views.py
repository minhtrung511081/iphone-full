from rest_framework.pagination import LimitOffsetPagination
from django.http import HttpResponse,HttpResponseRedirect
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from rest_framework.generics import get_object_or_404
import django_filters.rest_framework
from .serializers import *
from taikhoan.models import *
from django.core.mail import BadHeaderError, send_mail,EmailMessage
from mysite.settings import EMAIL_HOST_USER
from . import forms
from django.shortcuts import render
from .utils import Util
from django.template.loader import render_to_string
# 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
# send_mail('Subject here', 'Here is the message.', 'from@example.com', ['to@example.com'], fail_silently=False)
# Create your views here.

# class createdonhang(generics.CreateAPIView):
#     serializer_class = Serializer
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = DonHang.objects.all()
#     def perform_create(self, serializer):
#         serializer.save(customer=self.request.user)
    
#     def create(self, request, *args, **kwargs):
#         # data = request.data
#         sp = SanPham.objects.filter(self.request.params('id'))
#         # int soluong = self.request.params('soluong')
#         # int gia = self.request.params('giagoc')
#         # int giatong = soluong*gia
#         # data_serializer = TodoSerializer(instance=todo_item,data=request.data, partial=True)     
#         new_hoadon = ChiTietDonHang.objects.create(soluong=data['soluong'],sanpham=['sanpham',donhang])
#         return Response(data, status=status.HTTP_201_CREATED)


# class Maketest(generics.ListCreateAPIView):

#     model = ChiTietDonHang
#     serializer_class = SomethingSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.DATA, many=True)
#         if serializer.is_valid():
#             serializer.save()
#             headers = self.get_success_headers(serializer.data)
#             return Response(serializer.data, status=status.HTTP_201_CREATED,
#                             headers=headers)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class MakePurchase(generics.ListCreateAPIView):
#     serializer_class = InvoiceWithDetailSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(customer=self.request.user)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #      data = {
    #         'Status': serializer.data.get('status')
    #     }
    #     return Response(serializer,status=status.HTTP_201_CREATED)
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     # Calculate the money
    #     money = 0
    #     items = ChiTietDonHang.objects.filter(donhang=serializer.data.get('id'))
    #     for item in items:
    #         money += (item.soluong * item.gia)
    #         product = item.sanpham

    #     # user = Account.objects.get(pk=serializer.data.get('customer'))

    #     # print invoice
    #     data = {
    #         # 'Customer': user.username,
    #         'Description': serializer.data.get('description'),
    #         'Payment_time': serializer.data.get('created_time'),
    #         'Total_price': money,
    #         'Status': serializer.data.get('status')
    #     }
    #     # if user.mail_verified is True:
    #     # self.send_purchase_email(user, serializer, items, money)
    #     return Response(data, status=status.HTTP_201_CREATED)


    # serializer_class = InvoiceWithDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]

    # queryset = DonHang.objects.all()
    # def perform_create(self, serializer):
    #     donhang=DonHang.objects.filter(id=self.kwargs['pk'])
    #     serializer.save(donhang=donhang)
    # # def perform_create(self, serializer):
    #     serializer.save(customer=self.request.user)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)   
    #     self.perform_create(serializer)
    #     money = 0
    #     items = ChiTietDonHang.objects.filter(donhang=serializer.data.get('id'))
    #     for item in items:
    #         money += (item.soluong * item.gia)
    #         product = item.sanpham
       
    #     data = {
          
    #         'Total_price': money,

    #     }
    #     return Response(data, status=status.HTTP_201_CREATED)


# Create your views here.
#DataFlair #Send Email
def subscribe(request):
    sub = forms.Subscribe()
    if request.method == 'POST':
        sub = forms.Subscribe(request.POST)
        subject = 'Welcome to DataFlair'
        message = 'Hope you are enjoying your Django Tutorials'
        recepient = str(sub['Email'].value())
        send_mail(subject, 
            message, EMAIL_HOST_USER, [recepient], fail_silently = False)
        return render(request, 'banhang/success.html', {'recepient': recepient})
    return render(request, 'banhang/index.html', {'form':sub})



def send_email(request):
    subject = request.POST.get('subject', 'ccc')
    message = request.POST.get('message', 'kkkkkk')
    from_email = request.POST.get('from_email', 'trungb1610689@student.ctu.edu.vn')
    if subject and message and from_email:
        try:
            send_mail(subject, message, from_email, ['minhtrung511081@gmail.com'])
        except BadHeaderError:
            return HttpResponse('Invalid header found.')
        return HttpResponseRedirect('/contact/thanks/')
    else:
        # In reality we'd use a form class
        # to get proper validation errors.
        return HttpResponse('Make sure all fields are entered and valid.')


class MakePurchase(generics.CreateAPIView):
    serializer_class = InvoiceWithDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

   
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Calculate the money
        money = 0
        items = ChiTietDonHang.objects.filter(donhang=serializer.data.get('id'))
        for item in items:
            money += (item.soluong * item.gia)
            product = item.sanpham

        # print invoice
        data = {
            'Total_price': money,
        }
        return Response(data, status=status.HTTP_201_CREATED)


    def send_purchase_email(user, serializer, items, money):
        data = {
            'donhang': serializer.data.get('id'),
            'items': items,
            'user': user,
            'total_price': money
        }
        html_content = loader.render_to_string("confirm_email.html", data)
        # Send email
        subject = 'Thanks For Your Purchase!'
        from_email = 'trungb1610689@student.ctu.edu.vn'
        to_email = user.email
        send_mail(subject=subject, message=html_content, from_email=from_email, recipient_list=[to_email], html_message=html_content)



class PurchaseInvoiceList(generics.ListCreateAPIView):
    serializer_class = PurchaseInvoiceSerializer
    
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    # queryset = DonHang.objects.filter(customer=self.request.user)
    def get_queryset(self):
        queryset = DonHang.objects.filter(customer=self.request.user.id)
        return queryset
    # def get(self, request, format=None):
    #     serializer = PurchaseInvoiceSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def list(self, request):
    #     # Note the use of `get_queryset()` instead of `self.queryset`
    #     queryset = DonHang.objects.filter(customer=self.request.user)
    #     serializer = PurchaseInvoiceSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # serializer_class = InvoiceWithDetailSerializer
    # permission_classes = [permissions.IsAuthenticated]

    
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
        # Calculate the money
        # money = 0
        # items = PurchaseDetail.objects.filter(invoice=serializer.data.get('id'))
        # for item in items:
        #     money += (item.quantity * item.price)
        #     product = item.product

        # user = TaiKhoan.objects.filter(pk=self.request.user.id)
        # user = get_object_or_404(TaiKhoan, pk=self.request.user.id)
        # print invoice
        # data = {
            # 'Customer': user.username,
            # 'Description': serializer.data.get('description'),
            # 'Payment_time': serializer.data.get('created_time'),
            # 'Total_price': money,
            # 'Status': serializer.data.get('status')
        # }
        # if user.mail_verified is True:
            # self.send_purchase_email(user, serializer, items, money)
        # return Response(data, status=status.HTTP_201_CREATED)



    # @staticmethod
    # def send_purchase_email(serializer):
    #     # data = {
    #         # 'order_number': serializer.data.get('id'),, items, money
    #         # 'items': items,
    #         # 'user': user,
    #         # 'total_price': money
    #     # }
    #     # Send email
    #     subject = 'Thanks For Your Purchase!'
    #     from_email = 'trungb1610689@student.ctu.edu.vn'
    #     to_email = 'minhtrung511081@gmail.com'
    #     send_mail(subject=subject, message='helo', from_email=from_email, recipient_list=[to_email],)



    # def perform_create(self, serializer):
    #     serializer.save(customer=self.request.user)



class PurchaseInvoiceDetailsList(generics.ListCreateAPIView):
    queryset = ChiTietDonHang.objects.all()
    serializer_class = PurchaseInvoiceDetailsSerializer
   
class donhangList(generics.ListAPIView):
    queryset = DonHang.objects.all()
    serializer_class = donhangS

class chitietV(generics.ListCreateAPIView):
    serializer_class = PurchaseInvoiceDetailsSerializer
   
# self.kwargs['pk'] donhang__customer=self.request.user
    def get_queryset(self):
        return ChiTietDonHang.objects.filter(donhang=self.kwargs['pk'])
    def perform_create(self, serializer):
        donhang=DonHang.objects.filter(id=self.kwargs['pk'])
        serializer.save(donhang=donhang)

class DetailedPurchaseInvoiceDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChiTietDonHang.objects.all()
    serializer_class = PurchaseInvoiceDetailsSerializer


class donhangxoa(generics.RetrieveUpdateDestroyAPIView):
    queryset = DonHang.objects.all()
    serializer_class = InvoiceSerializer

class DetailList(generics.ListCreateAPIView):
    serializer_class = DetailSerializer1

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChiTietDonHang.objects.filter(donhang=self.kwargs['pk'])

    def perform_create(self, serializer):
        hoa = get_object_or_404(DonHang, pk=self.kwargs['pk'])
        serializer.save(donhang=hoa)


class kiemtraV(generics.ListCreateAPIView):
    serializer_class = ctdhObjS
    # queryset=ChiTietDonHang.objects.all()
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        money = 0
        # items = ChiTietDonHang.objects.filter(donhang__id=self.kwargs['pk'])
        items = ChiTietDonHang.objects.filter(donhang=self.kwargs['pk'])
        user = TaiKhoan.objects.filter(donhang__id=self.kwargs['pk'])
        order_number = DonHang.objects.filter(id=self.kwargs['pk'])
        for item in items:
            money += (item.soluong * item.gia)
            sanpham = item.sanpham
            
        # email_body = 'Hi ' \
            # ' Bạn đã đặt hàng ở cửa hàng Bán điện thoại di động \n'
        data = {
            'items': items,
            'total_price': money,
            'order_number':order_number[0].id,
            'username':user[0].username,
            'email':user[0].email,
            'phone':user[0].phone,
            'address':user[0].address,
            'first_name':user[0].first_name,
            'last_name':user[0].last_name

            # 'email_body': email_body,
            # 'to_email': 'minhtrung511081@gmail.com',
            # 'email_subject': 'Thông báo từ cửa hàng điện thoại di động'
        }
        html_content = render_to_string("confirm_email.html", data)
        # email = EmailMessage(
        #     subject=data['email_subject'], body=result['sanpham'], to=[data['to_email']])
        # Util.send_email(data)
        # send_email(data)
        # email.send()
        from_email = 'trungb1610689@student.ctu.edu.vn'
        subject = 'Bạn đã đặt hàng ở shop Minh Trung!'
        to_email = 'minhtrung511081@gmail.com'
        send_mail(subject=subject, message=html_content, from_email=from_email, recipient_list=[to_email], html_message=html_content)

                


class hoadonV(generics.RetrieveUpdateDestroyAPIView):
    queryset = DonHang.objects.all()
    serializer_class = hoadonS


class ctdhObjV(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChiTietDonHang.objects.all()
    serializer_class = ctdhObjS


class ctdhObjVget(generics.ListAPIView):
    def get_queryset(self):
        return ChiTietDonHang.objects.filter(donhang=self.kwargs['pk'])
    serializer_class = ctdhObjSget

class noid(generics.ListAPIView):
    def get_queryset(self):
        queryset = ChiTietDonHang.objects.filter(donhang__customer=self.request.user)
        return queryset
    serializer_class = ctdhObjSget

class idV(generics.ListAPIView):
    def get_queryset(self):
        return DonHang.objects.filter(customer=self.request.user)
    serializer_class = idS

class MakePurchase(generics.CreateAPIView):
    serializer_class = InvoiceWithDetailSerializer1
    permission_classes = [permissions.IsAuthenticated]

   
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Calculate the money
        money = 0
        items = ChiTietDonHang.objects.filter(donhang=serializer.data.get('id'))
        for item in items:
            money += (item.soluong * item.gia)
            sanpham = item.sanpham

        user = TaiKhoan.objects.get(pk=serializer.data.get('customer'))
        # Checkout
        # card = Card_default.objects.get(owner=user).card
        # try:
        #     charge = stripe.Charge.create(
        #         amount=int(money),
        #         currency='vnd',
        #         customer=user.id,
        #         source=card.id
        #     )
        # except stripe.error.CardError as e:
        #     invoice = PurchaseInvoice.objects.get(pk=serializer.data.get('id'))
        #     invoice.status = 4
        #     invoice.save()
        #     return Response({
        #         'Error': e
        #     }, status=status.HTTP_400_BAD_REQUEST)

        # print invoice
        # data = {
        #     'Customer': user.username,
        #     'Description': serializer.data.get('description'),
        #     'Payment_time': serializer.data.get('created_time'),
        #     'Total_price': money,
        #     'Status': serializer.data.get('status')
        # }
        # if user.mail_verified is True:
        self.send_purchase_email(user, serializer, items, money)
        return Response(data, status=status.HTTP_201_CREATED)


    def send_purchase_email(user, serializer, items, money):
        data = {
            'items': items,
            'total_price': money,
            'order_number':order_number[0].id,
            'username':user[0].username,
            'email':user[0].email,
            'phone':user[0].phone,
            'address':user[0].address,
            'first_name':user[0].first_name,
            'last_name':user[0].last_name
        }
        html_content = render_to_string("confirm_email.html", data)
        # Send email
        from_email = 'trungb1610689@student.ctu.edu.vn'
        subject = 'Bạn đã đặt hàng ở shop Minh Trung!'
        to_email = user.email
        send_mail(subject=subject, message=html_content, from_email=from_email, recipient_list=[to_email], html_message=html_content)

