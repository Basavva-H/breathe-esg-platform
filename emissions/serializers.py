from rest_framework import serializers

from .models import (
    EmissionRecord
)


class EmissionRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmissionRecord

        fields = [
            'id',
            'category',
            'activity_type',
            'quantity',
            'unit',
            'status',
            'suspicious_flag',
            'locked',
            'created_at'
        ]