# update_actual_data.py
from django.core.management.base import BaseCommand
import pytz
from django.db.models import Q
from datetime import datetime, timedelta
from production.models import machineWiseData, ProductionAndon, lineMachineConfig

class Command(BaseCommand):
    help = 'Update actual column in the latest record of MachineWiseData model'

    def handle(self, *args, **options):

        year = 2024
        month = 3
        day = 12
        hour = 15  # 24-hour format
        minute = 30
        second = 0

        # Create a datetime object
        # today = datetime(year, month, day, hour, minute, second)

        # Extract Time from the latest record in ProductionAndon
        today = datetime.now(pytz.timezone('Asia/Kolkata'))
        current_time = ProductionAndon.objects.latest('machine_datetime').machine_datetime



        # Print job_id
        # Filter the ProductionAndon records where current_time falls between assigned start and end production times
        filtered_job = lineMachineConfig.objects.filter(
            Q(assigned_start_production__gte=current_time) & Q(assigned_end_production__lte=current_time)
        ).first()

        # Extract the job_id from the filtered record
        if filtered_job:
            job_id = filtered_job.job_id
            print("Job ID where current time is between assigned start and end production times:", job_id)
        else:
            print("No job found where current time is between assigned start and end production times.")









        print("Current Time:", current_time)
        print("Today:", today)

        # Extract date and hour components from both timestamps
        current_time_date = current_time.date()
        current_time_hour = current_time.hour

        today_date = today.date()
        today_hour = today.hour

        # Compare date and hour components
        if current_time_date == today_date:
            same_date = True
        else:
            same_date = False

        if current_time_hour == today_hour:
            same_hour = True
        else:
            same_hour = False

        if same_date and same_hour:
            print("Same Date and Hour")
            # Step 2: Read 'machine_datetime' from the current hour in ProductionAndon
            start_hour = current_time.replace(minute=0, second=0, microsecond=0)
            end_hour = start_hour + timedelta(hours=1)

            andon_records = ProductionAndon.objects.filter(
                machine_datetime__gte=start_hour,
                machine_datetime__lt=end_hour
            ).order_by('machine_datetime')
            # print("Start Hour:", start_hour)
            # print("End Hour:", end_hour)

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
            # print("andon first reading:", andon_records.first().machine_datetime)
            # print("andon last reading:", andon_records.last().machine_datetime)
            # print("First Reading (p):", andon_records.first().p)
            # print("Last Reading (p):", andon_records.last().p)
            print(actual_value)

            latest_machine_data = machineWiseData.objects.latest('id')

            # Uncomment the following lines to update the actual value
            latest_machine_data.actual = actual_value
            latest_machine_data.save()


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
            
            passed_minutes = (andon_records.last().machine_datetime.minute - start_hour.minute)
            
            # print("I Count: ", i_count)
            # print("R Count: ", r_count)
            r_time_minutes = round(r_count * 10 / 60, 2)
            i_time_minutes = round(passed_minutes - r_time_minutes)

            # print("R Time Minutes:", r_time_minutes)
            # print("I Time Minutes:", i_time_minutes)
            # print("Passed Minutes:", passed_minutes)

            latest_machine_data.on_time = r_time_minutes
            latest_machine_data.idle_time = i_time_minutes
            latest_machine_data.save()

            self.stdout.write(self.style.SUCCESS('Actual value updated successfully.'))
        
        else:
            self.stdout.write(self.style.WARNING('MachineData not updated.'))
            return
