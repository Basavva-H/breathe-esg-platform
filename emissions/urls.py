from django.urls import path
from .views import (
    upload_sap_data,
    upload_utility_data,
    upload_travel_data,
    approve_record,
    reject_record,
    get_records,
    get_audit_logs
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path(
        'upload/sap/',
        upload_sap_data
    ),
    path(
        'upload/utility/',
        upload_utility_data
    ),
    path(
        'upload/travel/',
        upload_travel_data
    ),
    path(
        'records/<int:record_id>/approve/',
        approve_record
    ),

    path(
        'records/<int:record_id>/reject/',
        reject_record
    ),

    path(
        'records/',
        get_records
    ),

    path(
        'audit-logs/',
        get_audit_logs
    ),
    path(
        'token/',
        TokenObtainPairView.as_view()
    ),

    path(
        'token/refresh/',
        TokenRefreshView.as_view()
    ),
]