import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from django.shortcuts import get_object_or_404
from .services.sap_processor import process_sap_row
from .services.utility_processor import process_utility_row
from .services.travel_processor import process_travel_row
from .serializers import EmissionRecordSerializer
from .models import AuditLog
from .models import (
    Organization,
    DataSource,
    EmissionRecord
)


@api_view(['POST'])
def upload_sap_data(request):

    file = request.FILES.get('file')

    if not file:
        return Response({
            'error': 'No file uploaded'
        }, status=400)

    df = pd.read_csv(file)

    organization, _ = Organization.objects.get_or_create(
        name="Demo Company"
    )

    source = DataSource.objects.create(
        organization=organization,
        source_type='sap',
        original_file_name=file.name
    )

    created_records = 0

    for _, row in df.iterrows():

        process_sap_row(
            row=row,
            organization=organization,
            source=source
        )

        created_records += 1
    return Response({
        'message': 'SAP data uploaded successfully',
        'records_created': created_records
    })

@api_view(['POST'])
def upload_utility_data(request):

    file = request.FILES.get('file')

    if not file:
        return Response({
            'error': 'No file uploaded'
        }, status=400)

    df = pd.read_csv(file)

    organization, _ = Organization.objects.get_or_create(
        name="Demo Company"
    )

    source = DataSource.objects.create(
        organization=organization,
        source_type='utility',
        original_file_name=file.name
    )

    created_records = 0

    for _, row in df.iterrows():

        process_utility_row(
            row=row,
            organization=organization,
            source=source
        )

        created_records += 1

    return Response({
        'message': 'Utility data uploaded successfully',
        'records_created': created_records
    })

@api_view(['POST'])
def upload_travel_data(request):

    file = request.FILES.get('file')

    if not file:
        return Response({
            'error': 'No file uploaded'
        }, status=400)

    data = json.load(file)

    organization, _ = Organization.objects.get_or_create(
        name="Demo Company"
    )

    source = DataSource.objects.create(
        organization=organization,
        source_type='travel',
        original_file_name=file.name
    )

    created_records = 0

    for row in data:

        process_travel_row(
            row=row,
            organization=organization,
            source=source
        )

        created_records += 1

    return Response({
        'message': 'Travel data uploaded successfully',
        'records_created': created_records
    })

@api_view(['POST'])
def approve_record(request, record_id):

    record = get_object_or_404(
        EmissionRecord,
        id=record_id
    )

    old_status = record.status

    record.status = 'approved'
    record.locked = True

    record.save()

    AuditLog.objects.create(
        record=record,
        action='Approved Record',
        old_status=old_status,
        new_status='approved'
    )

    return Response({
        'message': 'Record approved successfully'
    })

@api_view(['POST'])
def reject_record(request, record_id):

    record = get_object_or_404(
        EmissionRecord,
        id=record_id
    )

    old_status = record.status

    record.status = 'rejected'
    record.locked = True

    record.save()

    AuditLog.objects.create(
        record=record,
        action='Rejected Record',
        old_status=old_status,
        new_status='rejected'
    )

    return Response({
        'message': 'Record rejected successfully'
    })

@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all().order_by('-id')

    serializer = EmissionRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)