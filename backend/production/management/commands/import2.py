# Import necessary modules
import pandas as pd
from django.core.management.base import BaseCommand
from production.models import ExcelImport

class Command(BaseCommand):
    help = 'Import data from Excel file and update the ExcelImport model'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the Excel file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']

        try:
            # Read the Excel file using pandas
            df = pd.read_excel(file_path)

            # Iterate through rows and update data in ExcelImport model if changes are detected
            for index, row in df.iterrows():
                existing_record = ExcelImport.objects.filter(field1=row['field1']).first()

                if existing_record:
                    # Check if any field in the record has changed
                    fields_to_update = {}
                    for field in [f.name for f in ExcelImport._meta.get_fields() if f.name != 'id']:
                        if getattr(existing_record, field) != row[field]:
                            fields_to_update[field] = row[field]

                    # Update fields if there are changes
                    if fields_to_update:
                        existing_record.__dict__.update(fields_to_update)
                        existing_record.save()

                else:
                    # If the record doesn't exist, create a new one
                    ExcelImport.objects.create(**row)

            self.stdout.write(self.style.SUCCESS('Data imported and updated successfully'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))
