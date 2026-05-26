from rest_framework import serializers

from .models import (
    EmissionRecord
)
from .models import AuditLog

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

class AuditLogSerializer(serializers.ModelSerializer):

    record_name = serializers.SerializerMethodField()

    class Meta:
        model = AuditLog

        fields = [
            'id',
            'record_name',
            'action',
            'old_status',
            'new_status',
            'changed_at'
        ]

    def get_record_name(self, obj):

        return str(obj.record)