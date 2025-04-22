from django.core.management.base import BaseCommand
from datetime import datetime
from production.models import ProductionAndon, machineWiseData

class Command(BaseCommand):
    help = 'Copy data from ProductionAndon to machineWiseData'

    def handle(self, *args, **kwargs):
        # Define time ranges
        time_ranges = [
            ("08:00", "09:00"),
            ("09:00", "10:00"),
            ("10:00", "11:00"),
            
            # Add more time ranges as needed
        ]

        for start_time, end_time in time_ranges:
            # Convert string time to datetime objects for comparison
            start_datetime = datetime.strptime(start_time, "%H:%M")
            end_datetime = datetime.strptime(end_time, "%H:%M")

            # Get the last recorded 'p' value from ProductionAndon
            last_record = ProductionAndon.objects.filter(
                machine_datetime__lt=end_datetime,
                machine_datetime__gte=start_datetime
            ).order_by('-machine_datetime').first()

            if last_record:
                # Update existing machineWiseData entry
                machineWiseData.objects.filter(
                    time=f"{start_time} - {end_time}",
                    date=datetime.now().date(),  # Set the appropriate date
                    machine_id=last_record.machine_id
                ).update(
                    actual=last_record.p,
                    idle_time=60 - last_record.on_time if last_record.on_time else 60,
                    on_time=last_record.on_time if last_record.on_time else 0,
                    # Add other fields as needed
                )

        self.stdout.write(self.style.SUCCESS('Data updated successfully.'))
