from django.core.management.base import BaseCommand
from production.models import ProductionAndon, soloAssemblyLineData
from django.db.models import Q
from datetime import datetime, timedelta
from pytz import utc, timezone

class Command(BaseCommand):
    help = 'Updates the actual column in machineWiseData model'

    def handle(self, *args, **options):
        # Get the last record from column 'p' in 'ProductionAndon' model
        last_record_value = ProductionAndon.objects.latest('machine_datetime').p

        # Get the current time and add 5 hours and 30 minutes
        current_time_utc = datetime.now(utc)
        current_time_ist = current_time_utc.astimezone(timezone('Asia/Kolkata'))

        # Check if the time is between 08 to 20 hours
        if 8 <= current_time_ist.hour <= 20:
            shift = 'FS'
        else:
            shift = 'SS'

        # Get the soloAssemblyLineData instance based on date and shift
        data_instance = soloAssemblyLineData.objects.get(
            date=current_time_ist.date(),
            shift=shift
        )

        # Update 'actual' and 'shift' fields
        data_instance.actual = last_record_value
        # data_instance.shift = shift
        data_instance.save()

        # Check if the time is between 08 to 20 hours
        # if 8 <= current_time_ist.hour <= 20:
        #     # Count the total number of rows where 'r' column is "I" between 08 to 20 hours
        #     i_count = ProductionAndon.objects.filter(
        #         machine_datetime__date=current_time_ist.date(),
        #         machine_datetime__hour__range=[8, 20],
        #         r='I'
        #     ).count()

        #     # Count the total number of rows where 'r' column is "R" between 08 to 20 hours
        #     r_count = ProductionAndon.objects.filter(
        #         machine_datetime__date=current_time_ist.date(),
        #         machine_datetime__hour__range=[8, 20],
        #         r='R'
        #     ).count()
        # else:
        #     # Count the total number of rows where 'r' column is "I" between 20 to 08 hours
        #     i_count = ProductionAndon.objects.filter(
        #         Q(machine_datetime__date=current_time_ist.date(), machine_datetime__hour__gte=20) |
        #         Q(machine_datetime__date=current_time_ist.date() + timedelta(days=1), machine_datetime__hour__lt=8),
        #         r='I'
        #     ).count()

        #     # Count the total number of rows where 'r' column is "R" between 20 to 08 hours
        #     r_count = ProductionAndon.objects.filter(
        #         Q(machine_datetime__date=current_time_ist.date(), machine_datetime__hour__gte=20) |
        #         Q(machine_datetime__date=current_time_ist.date() + timedelta(days=1), machine_datetime__hour__lt=8),
        #         r='R'
        #     ).count()

        # # Calculate time in minutes
        # i_time_minutes = round(i_count * 10 / 60, 2)
        # r_time_minutes = round(r_count * 10 / 60, 2)

        # # Update 'Running' and 'Idle' fields
        # data_instance.mc_on_hours = r_time_minutes
        # data_instance.mc_idle_hours = i_time_minutes
        # data_instance.save()

        self.stdout.write(self.style.SUCCESS('Successfully updated actual column in soloAssemblyLineData model.'))