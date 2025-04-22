from django.core.management.base import BaseCommand
from production.models import ProductionAndon, soloAssemblyLineData
from django.db.models import Q
from datetime import datetime, timedelta
from pytz import utc, timezone

class Command(BaseCommand):
    help = 'Updates the actual column in machineWiseData model and counts "I" rows'

    def handle(self, *args, **options):
        # Get the last record from column 'p' in 'ProductionAndon' model
        last_record_value = ProductionAndon.objects.latest('machine_datetime').p

        # Get the current time 
        current_time = ProductionAndon.objects.latest('machine_datetime').machine_datetime
        print(current_time)

        # Check if the time is between 08 to 20 hours
        if 8 <= current_time.hour <= 20:
            shift = 'FS'
        else:
            shift = 'SS'

        # Get the soloAssemblyLineData instance based on date and shift
        data_instance = soloAssemblyLineData.objects.get(
            date=current_time.date(),
            shift=shift
        )

        # Update 'actual' and 'shift' fields
        # data_instance.actual = last_record_value
        # data_instance.shift = shift
        # data_instance.save()

        # Check if the time is between 08 to 20 hours
        if 8 <= current_time.hour <= 20:
            # Count the total number of rows where 'r' column is "I" between 08 to 20 hours
            i_count = ProductionAndon.objects.filter(
                machine_datetime__date=current_time.date(),
                machine_datetime__hour__range=[8, 20],
                r='I'
            ).count()

            # Count the total number of rows where 'r' column is "R" between 08 to 20 hours
            r_count = ProductionAndon.objects.filter(
                machine_datetime__date=current_time.date(),
                machine_datetime__hour__range=[8, 20],
                r='R'
            ).count()
        else:
            # Count the total number of rows where 'r' column is "I" between 20 to 08 hours
            i_count = ProductionAndon.objects.filter(
                Q(machine_datetime__date=current_time.date(), machine_datetime__hour__gte=20) |
                Q(machine_datetime__date=current_time.date() + timedelta(days=1), machine_datetime__hour__lt=8),
                r='I'
            ).count()

            # Count the total number of rows where 'r' column is "R" between 20 to 08 hours
            r_count = ProductionAndon.objects.filter(
                Q(machine_datetime__date=current_time.date(), machine_datetime__hour__gte=20) |
                Q(machine_datetime__date=current_time.date() + timedelta(days=1), machine_datetime__hour__lt=8),
                r='R'
            ).count()

        # Calculate time in minutes
        i_time_minutes = round(i_count * 10 / 60, 2)
        r_time_minutes = round(r_count * 10 / 60, 2)

        print(i_time_minutes)
        print(r_time_minutes)
        
        # Update 'Running' and 'Idle' fields
        # data_instance.mc_on_hours = r_time_minutes
        # data_instance.mc_idle_hours = i_time_minutes
        # data_instance.save()

        # Print the count value
        self.stdout.write(self.style.SUCCESS(f'Total "I" rows count: {i_time_minutes}'))

        self.stdout.write(self.style.SUCCESS(f'Total "R" rows count: {r_time_minutes}'))
