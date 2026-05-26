from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class DataSource(models.Model):
    SOURCE_TYPES = [
        ('sap', 'SAP'),
        ('utility', 'Utility'),
        ('travel', 'Travel'),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_TYPES
    )

    original_file_name = models.CharField(max_length=255)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source_type} - {self.original_file_name}"


class EmissionRecord(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    category = models.CharField(max_length=50)

    activity_type = models.CharField(max_length=100)

    quantity = models.FloatField()

    unit = models.CharField(max_length=50)

    normalized_quantity = models.FloatField(
        null=True,
        blank=True
    )

    normalized_unit = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )

    suspicious_flag = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    locked = models.BooleanField(default=False)

    raw_data = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.activity_type} - {self.quantity} {self.unit}"
    

class AuditLog(models.Model):

    record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    action = models.CharField(max_length=100)

    old_status = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )

    new_status = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )

    changed_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.record.id} - {self.action}"