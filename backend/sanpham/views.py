from .serializers import *
from rest_framework import generics
from .models import *
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework import generics, permissions
from django.http import HttpResponse
from rest_framework.pagination import LimitOffsetPagination
import django_filters.rest_framework
from banhang.models import *
from .utils import Util
class sanphamnew(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SanphamSerializer1
    def get_queryset(self):
        queryset = SanPham.objects.filter(id=self.kwargs['pk'])

class sanphamctdh(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SanphamSerializer1
    def get_queryset(self):
        queryset = SanPham.objects.filter(chitietdonhang__id=self.kwargs['pk'])

class Sanpham(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SanphamSerializer
    queryset = SanPham.objects.all()
    # permission_classes = [permissions.IsAdminUser]
    # def post(self, request, *args, **kwargs):
    #     if self.request.user.is_superuser is True:
    #         return self.create(request, *args, **kwargs)
    #     else:
    #         return HttpResponse("you not permissions create")
    
    
    # def post(self, request, *args, **kwargs):
    #     ten = request.data['ten']
    #     giagoc = request.data['giagoc']
    #     manhinh = request.data['manhinh']
    #     chip = request.data['chip']
    #     ram = request.data['ram']
    #     bonhotrong = request.data['bonhotrong']
    #     camerasau = request.data['camerasau']
    #     cameratruoc = request.data['cameratruoc']
    #     pin = request.data['pin']
    #     cover = request.data['cover']
    #     soluong = request.data['soluong']
    #     km = request.data['km']
    #     loai = request.data['loai']
    #     return HttpResponse()

# class sanphamv(generics.ListCreateAPIView):
#     permission_classes = [permissions.AllowAny]
#     serializer_class = SanphamNSerializer
#     queryset = SanPham.objects.all()


class objectspview(generics.RetrieveUpdateDestroyAPIView                                                                                                                                                                                                                                                                                                                                                                                                                                                        ):
    serializer_class = SanphamSerializer
    queryset = SanPham.objects.all()
    permission_classes = [permissions.AllowAny]
    # def delete(self, request, pk, format=None):
    #     snippet = SanPham.objects.filter(id=self.kwargs['pk'])
    #     snippet.delete()
    #     data = {
    #             'message': 'ban da xoa thang cong',
    #             'status':'success'
    #         }
    #     return Response(data,status=status)



# class updateV(generics.ListCreateAPIView):
#     serializer_class = SanphamUpdate

#     # permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return SanPham.objects.filter(id=self.kwargs['pk'])

#     de per
    
    


class KhuyenMaiview(generics.ListCreateAPIView):
    serializer_class = KhuyenMaiSerializer
    queryset = KhuyenMai.objects.all()

    # def post(self, request, *args, **kwargs):
    #     if self.request.user.is_superuser is True:
    #         return self.create(request, *args, **kwargs)
    #     else:get_object_or_404(PhieuNhap, pk=self.kwargs['pk'])
    #         return HttpResponse("you not permissions create")


class KhuyenMai_obj_view(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = KhuyenMaiSerializer
    queryset = KhuyenMai.objects.all()
    # permission_classes = [permissions.IsAdminUser]


class Loaiview(generics.ListCreateAPIView):
    serializer_class = LoaiSerializer
    queryset = Loai.objects.all()
    permission_classes = [permissions.AllowAny]
    def post(self, request, format=None):
        # serializer = LoaiSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        email_body = 'Hi ' \
            ' Bạn đã đặt hàng ở cửa hàng Bán điện thoại di động \n'
        data = {'email_body': email_body, 'to_email': 'minhtrung511081@gmail.com',
                'email_subject': 'Thông báo từ cửa hàng điện thoại di động'}

        Util.send_email(data)
        return Response(status=status.HTTP_201_CREATED)
   


class objectloaiview(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LoaiSerializer
    queryset = Loai.objects.all()
    permission_classes = [permissions.AllowAny]



