# update_actual_data.py
from django.core.management.base import BaseCommand
import pytz
from datetime import datetime, timedelta
from production.models import machineWiseData, ProductionAndon, soloAssemblyLineData

class Command(BaseCommand):
    help = 'Update actual column in the latest record of MachineWiseData model based on shifts'

    def handle(self, *args, **options):
        # Step 1: Define shifts
        first_shift_start = 8
        first_shift_end = 20

        # Get current time and set start_time and end_time
        # current_time = datetime.now(pytz.timezone('Asia/Kolkata'))
        current_time = ProductionAndon.objects.latest('machine_datetime').machine_datetime
        # print("Current Time:", current_time)

        start_time = current_time.replace(hour=8, minute=0, second=0, microsecond=0)
        end_time = current_time

        # print("Start Time:", start_time)
        # print("End Time:", end_time)


        if 8 <= current_time.hour <= 20:
            shift = 'FS'
        else:
            shift = 'SS'

        andon_records = ProductionAndon.objects.filter(
            machine_datetime__gte=start_time,
            machine_datetime__lt=end_time
        ).order_by('machine_datetime')

        first_reading = andon_records.first().p
        last_reading = andon_records.last().p
        actual_value = last_reading - first_reading
        # print("First Reading (p):", first_reading)
        # print("Last Reading (p):", last_reading)
        # print("Actual Value:", actual_value)

        data_instance = soloAssemblyLineData.objects.get(
            date=current_time.date(),
            shift=shift
        )

        data_instance.actual = actual_value
        # data_instance.shift = shift
        data_instance.save()

        self.stdout.write(self.style.SUCCESS('Successfully updated actual column in soloAssemblyLineData model.'))

        