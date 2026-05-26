import pandas as pd

from emissions.models import (
    EmissionRecord
)


VALID_TARIFFS = [
    'Commercial',
    'Industrial',
    'Residential'
]


def process_utility_row(row, organization, source):

    suspicious = False

    # Negative electricity usage
    if row['kWh'] < 0:
        suspicious = True

    # Missing meter ID
    if pd.isna(row['Meter ID']) or row['Meter ID'] == '':
        suspicious = True

    # Invalid tariff
    if str(row['Tariff']) not in VALID_TARIFFS:
        suspicious = True

    # Invalid billing period
    try:
        start = pd.to_datetime(row['Billing Start'])
        end = pd.to_datetime(row['Billing End'])

        if end < start:
            suspicious = True

    except:
        suspicious = True

    record = EmissionRecord.objects.create(
        organization=organization,
        source=source,

        category='Scope 2',

        activity_type='Electricity Usage',

        quantity=row['kWh'],

        unit='kWh',

        normalized_quantity=row['kWh'],

        normalized_unit='kWh',

        suspicious_flag=suspicious,

        raw_data={
            key: str(value)
            for key, value in row.to_dict().items()
        }
    )

    return record