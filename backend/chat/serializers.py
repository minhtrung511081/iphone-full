from rest_framework import serializers
from .models import *

class SalesInvoicesSerializer(serializers.ModelSerializer):
    # nguonnhap = serializers.StringRelatedField(many=False)
    # staff = serializers.StringRelatedField(many=False)
    class Meta:
        model = Member
        fields = '__all__'