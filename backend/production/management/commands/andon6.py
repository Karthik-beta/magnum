# update_past_24_hours_data.py
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from production.models import machineWiseData, ProductionAndon

class Command(BaseCommand):
    help = 'Update actual column in the latest record of MachineWiseData model for the past 24 hours'

    def handle(self, *args, **options):
        # Get the current time
        # now = timezone.now()
        current_time_db = ProductionAndon.objects.latest('machine_datetime').machine_datetime
        now = current_time_db.replace(tzinfo=None)
        print("Current Time:", now)

        # Loop over the past 24 hours
        for hour in range(24):
            # Calculate the start and end of the current hour
            # start_hour = now - timedelta(hours=hour+1)
            start_hour = now.replace(minute=0, second=0, microsecond=0) + timedelta(hours=hour+1)
            print("Start Hour:", start_hour)
            # end_hour = now - timedelta(hours=hour)
            end_hour = start_hour - timedelta(hours=hour)
            print("End Hour:", end_hour)

            self.update_actual_data(start_hour, end_hour)

    def update_actual_data(self, start_hour, end_hour):
        # The rest of the code is the same as in the original command, but using start_hour and end_hour instead of calculating them
        andon_records = ProductionAndon.objects.filter(
            machine_datetime__gte=end_hour,
            machine_datetime__lt=start_hour
        ).order_by('machine_datetime')

        if not andon_records:
            self.stdout.write(self.style.WARNING(f'No ProductionAndon records for the hour starting at {start_hour}.'))
            return

        first_reading = andon_records.first().p
        print("First Reading (p):", andon_records.first().p)
        last_reading = andon_records.last().p
        print("Last Reading (p):", andon_records.last().p)
        actual_value = last_reading - first_reading
        print("Actual Value:", actual_value)

        latest_machine_data = machineWiseData.objects.latest('id')

        # latest_machine_data.actual = actual_value
        # latest_machine_data.save()

        i_count = ProductionAndon.objects.filter(
                machine_datetime__gte=start_hour,
                machine_datetime__lt=end_hour,
                r='I'
            ).count()
        
        r_count = ProductionAndon.objects.filter(
                machine_datetime__gte=start_hour,
                machine_datetime__lt=end_hour,
                r='R'
            ).count()

        i_time_minutes = round(i_count * 10 / 60, 2)
        r_time_minutes = round(r_count * 10 / 60, 2)

        # latest_machine_data.on_time = r_time_minutes
        # latest_machine_data.idle_time = i_time_minutes
        # latest_machine_data.save()

        self.stdout.write(self.style.SUCCESS(f'Actual value updated successfully for the hour starting at {start_hour}.'))