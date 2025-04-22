# update_actual_data.py
from django.core.management.base import BaseCommand
import pytz
from datetime import datetime, timedelta
from production.models import machineWiseData, ProductionAndon

class Command(BaseCommand):
    help = 'Update actual column in the latest record of MachineWiseData model based on shifts'

    def handle(self, *args, **options):
        # Step 1: Define shifts
        first_shift_start = 8
        first_shift_end = 20

        # Extract current time
        # current_time = datetime.now(pytz.timezone('Asia/Kolkata'))
        current_time = ProductionAndon.objects.latest('machine_datetime').machine_datetime
        print("Current Time:", current_time)

        # Step 2: Set start_time and end_time based on shifts
        if first_shift_start <= current_time.hour < first_shift_end:
            shift = 'FS'
        else:
            shift = 'SS'
        
        start_time = current_time.replace(minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(hours=1)

        # Step 3: Get first and last 'p' values
        andon_records = ProductionAndon.objects.filter(
            machine_datetime__gte=start_time,
            machine_datetime__lt=end_time
        ).order_by('machine_datetime')

        if not andon_records:
            self.stdout.write(self.style.WARNING(f'No ProductionAndon records for the current {shift} shift hour. Exiting.'))
            return

        first_reading = andon_records.first().p
        last_reading = andon_records.last().p

        # Step 4: Calculate 'actual' value
        actual_value = last_reading - first_reading

        print(f"{shift} Shift - Andon first reading:", andon_records.first().machine_datetime)
        print(f"{shift} Shift - Andon last reading:", andon_records.last().machine_datetime)
        print(f"{shift} Shift - First Reading (p):", andon_records.first().p)
        print(f"{shift} Shift - Last Reading (p):", andon_records.last().p)
        print(f"{shift} Shift - Actual Value:", actual_value)

        # Step 5: Update 'actual' field in 'machineWiseData'
        time_range = f"{start_time.strftime('%H:%M')} - {end_time.strftime('%H:%M')}"
        print(f"{shift} Shift - Time Range:", time_range)
        matching_machine_data = machineWiseData.objects.filter(time=time_range).first()

        if matching_machine_data:
            # matching_machine_data.actual = actual_value
            # matching_machine_data.save()

            self.stdout.write(self.style.SUCCESS(f'Actual value updated successfully for {shift} shift.'))
        else:
            self.stdout.write(self.style.WARNING(f'No matching time range found in machineWiseData for {shift} shift.'))
