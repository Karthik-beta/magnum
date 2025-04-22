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

        # Get current time and set start_time and end_time
        # current_time = datetime.now(pytz.timezone('Asia/Kolkata'))
        current_time = ProductionAndon.objects.latest('machine_datetime').machine_datetime
        print("Current Time:", current_time)

        start_time = current_time.replace(minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(hours=1)

        # Step 7: Loop until start_time is 00:00
        while end_time.hour > 0 or (end_time.hour == 0 and end_time.minute > 0):
            # Step 3: Get first and last 'p' values
            andon_records = ProductionAndon.objects.filter(
                machine_datetime__gte=start_time,
                machine_datetime__lt=end_time
            ).order_by('machine_datetime')

            if not andon_records:
                self.stdout.write(self.style.WARNING(f'No ProductionAndon records for the current shift hour. Exiting.'))
                return

            first_reading = andon_records.first().p
            last_reading = andon_records.last().p

            print("Andon first reading:", andon_records.first().machine_datetime)
            print("Andon last reading:", andon_records.last().machine_datetime)

            # Step 4: Calculate 'actual' value
            actual_value = last_reading - first_reading
            print("Actual Value:", actual_value)


            # r Count
            r_count = ProductionAndon.objects.filter(
                machine_datetime__gte=start_time,
                machine_datetime__lt=end_time,
                r='R'
            ).count()

            # i Count
            i_count = ProductionAndon.objects.filter(
                machine_datetime__gte=start_time,
                machine_datetime__lt=end_time,
                r='I'
            ).count()

            # print("R Count:", r_count)
            # print("I Count:", i_count)

            r_in_minutes = r_count * 10 / 60
            i_in_minutes = 60 - r_in_minutes

            print("R in Minutes:", r_in_minutes)
            print("I in Minutes:", i_in_minutes)

            # Step 5: Update 'actual' field in 'machineWiseData'
            time_range = f"{start_time.strftime('%H:%M')} - {end_time.strftime('%H:%M')}"
            print("Time Range:", time_range)
            matching_machine_data = machineWiseData.objects.filter(time=time_range, date=start_time.date()).first()
            print("Matching Machine Data: ", matching_machine_data.time)
            print(f"Matching Machine Data: {matching_machine_data.time} -> {matching_machine_data.date}")

            if matching_machine_data:
                # matching_machine_data.actual = actual_value
                # matching_machine_data.on_time = r_count * 10 / 60
                # matching_machine_data.idle_time = 60 - (r_count * 10 / 60)
                # matching_machine_data.save()

                self.stdout.write(self.style.SUCCESS(f'Actual value updated successfully for {time_range}'))
            else:
                self.stdout.write(self.style.WARNING(f'No matching time range found in machineWiseData for {time_range}'))

            # Step 8: Reduce time range by 1 hour
            start_time -= timedelta(hours=1)
            end_time = start_time + timedelta(hours=1)
