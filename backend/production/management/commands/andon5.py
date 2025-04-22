from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from production.models import ProductionAndon

class Command(BaseCommand):
    help = 'Print the difference between the last and first "p" column values for each hour between 08:00 and 20:00'

    def handle(self, *args, **options):
        # Define the time ranges
        start_time_08_to_20 = datetime.now().replace(hour=8, minute=0, second=0, microsecond=0, tzinfo=None)
        end_time_08_to_20 = datetime.now().replace(hour=20, minute=0, second=0, microsecond=0, tzinfo=None)

        start_time_20_to_08 = datetime.now().replace(hour=20, minute=0, second=0, microsecond=0, tzinfo=None)
        print(start_time_20_to_08)
        end_time_20_to_08 = start_time_20_to_08 + timedelta(hours=12)
        print(end_time_20_to_08)

        # Get the current time from the database
        current_time_db = ProductionAndon.objects.latest('machine_datetime').machine_datetime
        current_time = current_time_db.replace(tzinfo=None)
        print(current_time)

        # Check if the current time falls within the specified ranges
        if start_time_08_to_20 <= current_time <= end_time_08_to_20 or start_time_20_to_08 <= current_time <= end_time_20_to_08:
            # Determine the appropriate time range based on the current time
            start_time = start_time_08_to_20 if 8 <= current_time.hour < 20 else start_time_20_to_08

            # Loop through each hour from the determined start time
            for hour in range(start_time.hour, start_time.hour + 12):
                current_hour = start_time.replace(hour=hour, minute=0, second=0, microsecond=0)
                print("Current Hour: ", current_hour)
                next_hour = current_hour + timedelta(hours=1)
                print("Next Hour: ", next_hour)

                andon_records = ProductionAndon.objects.filter(
                    machine_datetime__gte=current_hour,
                    machine_datetime__lt=next_hour
                ).order_by('machine_datetime')

                if not andon_records:
                    self.stdout.write(self.style.WARNING(f'No ProductionAndon records for {current_hour}-{next_hour}. Skipping.'))
                    continue

                # Calculate the difference between the last and first 'p' column values
                first_reading = andon_records.first().p
                last_reading = andon_records.last().p
                actual_value = last_reading - first_reading

                # Print the result for each hour
                print("First Reading: ", first_reading)
                print("Last Reading: ", last_reading)
                self.stdout.write(self.style.SUCCESS(f'{current_hour}-{next_hour}: {actual_value}'))
        else:
            self.stdout.write(self.style.WARNING('Current time is not within the specified ranges (08:00 - 20:00 or 20:00 - 08:00). Exiting.'))