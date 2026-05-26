import pandas as pd

from emissions.models import (
    EmissionRecord
)


VALID_UNITS = [
    'Liters',
    'Cubic Meters',
    'Kg'
]

VALID_PLANTS = [
    'BLR01',
    'MUM02',
    'DEL05',
    'CHE03',
    'HYD07'
]


def process_sap_row(row, organization, source):

    suspicious = False

    # Negative quantity
    if row['Quantity'] < 0:
        suspicious = True

    # Missing unit
    if pd.isna(row['Unit']):
        suspicious = True

    # Invalid unit
    if str(row['Unit']) not in VALID_UNITS:
        suspicious = True

    # Unknown plant
    if str(row['Plant Code']) not in VALID_PLANTS:
        suspicious = True

    # Invalid date
    try:
        pd.to_datetime(row['Date'])
    except:
        suspicious = True

    record = EmissionRecord.objects.create(
        organization=organization,
        source=source,

        category='Scope 1',

        activity_type=row['Fuel Type'],

        quantity=row['Quantity'],

        unit=row['Unit'],

        normalized_quantity=row['Quantity'],

        normalized_unit=row['Unit'],

        suspicious_flag=suspicious,

        raw_data={
            key: str(value)
            for key, value in row.to_dict().items()
        }
    )

    return record