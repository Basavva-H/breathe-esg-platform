from django.contrib import admin
from .models import Organization, DataSource, EmissionRecord, AuditLog

from django.utils.html import format_html

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_at']


@admin.register(DataSource)
class DataSourceAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'source_type',
        'organization',
        'original_file_name',
        'uploaded_at'
    ]


@admin.register(EmissionRecord)
class EmissionRecordAdmin(admin.ModelAdmin):

    list_display = [
        'id',
        'activity_type',
        'category',
        'quantity',
        'unit',
        'status',
        'show_suspicious',
        'locked'
    ]

    list_filter = [
        'category',
        'status',
        'suspicious_flag'
    ]

    search_fields = [
        'activity_type'
    ]

    readonly_fields = [
        'raw_data',
        'created_at'
    ]

    def show_suspicious(self, obj):

        if obj.suspicious_flag:
            return "⚠️ Suspicious"

        return "✅ Valid"

    show_suspicious.short_description = "Validation Status"

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):

    list_display = [
        'id',
        'record',
        'action',
        'old_status',
        'new_status',
        'changed_at'
    ]
    