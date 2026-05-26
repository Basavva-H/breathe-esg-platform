from emissions.models import (
    EmissionRecord
)


VALID_MODES = [
    'flight',
    'hotel',
    'ground_transport'
]


def process_travel_row(row, organization, source):

    suspicious = False

    # Invalid mode
    if row.get('mode') not in VALID_MODES:
        suspicious = True

    # Missing airport code for flights
    if row.get('mode') == 'flight':

        if not row.get('from') or not row.get('to'):
            suspicious = True

    # Invalid distance
    if 'distance_km' in row:

        try:
            if float(row['distance_km']) <= 0:
                suspicious = True
        except:
            suspicious = True

    record = EmissionRecord.objects.create(
        organization=organization,
        source=source,

        category='Scope 3',

        activity_type=row.get('mode', 'Unknown'),

        quantity=row.get('distance_km', 1),

        unit='km',

        normalized_quantity=row.get('distance_km', 1),

        normalized_unit='km',

        suspicious_flag=suspicious,

        raw_data={
            key: str(value)
            for key, value in row.items()
        }
    )

    return record