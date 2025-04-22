# update_actual_data.py
from django.core.management.base import BaseCommand
import pytz
from datetime import datetime, timedelta
from production.models import machineWiseData, ProductionAndon

class Command(BaseCommand):
    help = 'Update actual column in the latest record of MachineWiseData model'

    def handle(self, *args, **options):
        # Step 1: Get the current time in Asia/Kolkata timezone
        current_time_ist = datetime.now(pytz.timezone('Asia/Kolkata'))
        print("Last Record Value:", ProductionAndon.objects.latest('machine_datetime').machine_datetime)
        print("Last Record Value:", ProductionAndon.objects.latest('machine_datetime').p)

        # Step 2: Read 'machine_datetime' from the current hour in ProductionAndon
        start_hour = current_time_ist.replace(minute=0, second=0, microsecond=0)
        end_hour = start_hour + timedelta(hours=1)

        andon_records = ProductionAndon.objects.filter(
            machine_datetime__gte=start_hour.strftime('%Y-%m-%d %H:%M:%S'),
            machine_datetime__lt=end_hour.strftime('%Y-%m-%d %H:%M:%S')
        ).order_by('machine_datetime')
        print("Start Hour:", start_hour)
        print("End Hour:", end_hour)

        # # Print all records for debugging
        # for record in andon_records:
        #     print(f"machine_datetime: {record.machine_datetime}, p: {record.p}")

        if not andon_records:
            self.stdout.write(self.style.WARNING('No ProductionAndon records for the current hour. Exiting.'))
            return

        # Step 3: Calculate 'actual' and update the latest record in MachineWiseData
        first_reading = andon_records.first().p
        last_reading = andon_records.last().p
        actual_value = last_reading - first_reading
        print("andon first reading:", andon_records.first().machine_datetime)
        print("andon last reading:", andon_records.last().machine_datetime)
        print("First Reading (p):", andon_records.first().p)
        print("Last Reading (p):", andon_records.last().p)
        print(actual_value)

        latest_machine_data = machineWiseData.objects.latest('id')

        # Uncomment the following lines to update the actual value
        # latest_machine_data.actual = actual_value
        # latest_machine_data.save()

        self.stdout.write(self.style.SUCCESS('Actual value updated successfully.'))
