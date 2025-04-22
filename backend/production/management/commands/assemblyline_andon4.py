from django.core.management.base import BaseCommand
from production.models import ProductionAndon, soloAssemblyLineData
from django.db.models import Q
from datetime import datetime, timezone, timedelta
from pytz import utc, timezone

class Command(BaseCommand):
    help = 'Updates the actual column in machineWiseData model'

    def handle(self, *args, **options):
        # Get the last record from column 'p' in 'ProductionAndon' model
        last_record_value = ProductionAndon.objects.latest('machine_datetime').p

        # Get the current time from the ProductionAndon model
        current_time = ProductionAndon.objects.latest('machine_datetime').machine_datetime
        # current_time = datetime(2024, 2, 8, 21, 46, 0, 29000)
        # current_time = datetime(2024, 2, 9, 00, 1, 0, 29000)
        print("Current Time:", current_time)
        

        # Check if the time is between 08 to 20 hours
        if 8 <= current_time.hour <= 20:
            shift = 'FS'

            start_time = current_time.replace(hour=8, minute=0, second=0, microsecond=0)
            passed_minutes = (current_time - start_time).total_seconds() // 60

            print(f"Shift: {shift}, Start Time: {start_time}")
            print(f"Shift: {shift}, Passed Minutes: {passed_minutes}")

            r_count = ProductionAndon.objects.filter(
                machine_datetime__gte=start_time,
                machine_datetime__lt=current_time,
                r='R'
            ).count()

            i_count = ProductionAndon.objects.filter(
                machine_datetime__gte=start_time,
                machine_datetime__lt=current_time,
                r='I'
            ).count()

            r_in_minutes = round(r_count * 10 / 60, 3)
            i_in_minutes = round(i_count * 10 / 60, 3)
            print(f"I Count: {i_in_minutes}")    
            print(f"R Count: {r_in_minutes}")

            running_time = r_in_minutes
            print(f"Running Time: {running_time}")

            idle_time = passed_minutes - r_in_minutes
            print(f"Idle Time: {idle_time}")

            # Get the soloAssemblyLineData instance based on date and shift
            data_instance = soloAssemblyLineData.objects.get(
                date=current_time.date(),
                shift=shift
            )

            data_instance.mc_on_hours = running_time
            data_instance.mc_idle_hours = idle_time
            data_instance.save()

        else:
            shift = 'SS'

            if 20 <= current_time.hour <= 24:
                start_time = current_time.replace(hour=20, minute=0, second=0, microsecond=0)
                passed_minutes = (current_time - start_time).total_seconds() // 60

                r_count = ProductionAndon.objects.filter(
                    machine_datetime__gte=start_time,
                    machine_datetime__lt=current_time,
                    r='R'
                ).count()

                i_count = ProductionAndon.objects.filter(
                    machine_datetime__gte=start_time,
                    machine_datetime__lt=current_time,
                    r='I'
                ).count()

                r_in_minutes = round(r_count * 10 / 60, 3)
                i_in_minutes = round(i_count * 10 / 60, 3)
                print(f"I Count: {i_in_minutes}")    
                print(f"R Count: {r_in_minutes}")

                running_time = r_in_minutes
                print(f"Running Time: {running_time}")

                idle_time = passed_minutes - r_in_minutes
                print(f"Idle Time: {idle_time}")

                # Get the soloAssemblyLineData instance based on date and shift
                data_instance = soloAssemblyLineData.objects.get(
                    date=current_time.date(),
                    shift=shift
                )

                # data_instance.mc_on_hours = running_time
                # data_instance.mc_idle_hours = idle_time
                # data_instance.save()

            elif 0 <= current_time.hour <= 8:
                start_time = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
                passed_minutes_midnight = (current_time - start_time).total_seconds() // 60
                passed_minutes = 240 + passed_minutes_midnight

                previous_start_time = current_time.replace(hour=20, minute=0, second=0, microsecond=0) - timedelta(days=1)
                previous_end_time = current_time.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(days=1)

                r_previous_count = ProductionAndon.objects.filter(
                    machine_datetime__gte=previous_start_time,
                    machine_datetime__lt=previous_end_time,
                    r='R'
                ).count()

                i_previous_count = ProductionAndon.objects.filter(
                    machine_datetime__gte=previous_start_time,
                    machine_datetime__lt=previous_end_time,
                    r='I'
                ).count()

                r_count = ProductionAndon.objects.filter(
                    machine_datetime__gte=start_time,
                    machine_datetime__lt=current_time,
                    r='R'
                ).count()

                i_count = ProductionAndon.objects.filter(
                    machine_datetime__gte=start_time,
                    machine_datetime__lt=current_time,
                    r='I'
                ).count()

                total_r_count = r_previous_count + r_count

                r_in_minutes = round(total_r_count * 10 / 60, 3)
                i_in_minutes = round(i_count * 10 / 60, 3)
                print(f"I Count: {i_in_minutes}")    
                print(f"R Count: {r_in_minutes}")

                print("Previous Start Time:", previous_start_time)
                print("Previous End Time:", previous_end_time)

                running_time = r_in_minutes
                print(f"Running Time: {running_time}")

                idle_time = passed_minutes - r_in_minutes
                print(f"Idle Time: {idle_time}")


                # Get the soloAssemblyLineData instance based on date and shift
                data_instance = soloAssemblyLineData.objects.get(
                    date=current_time.date(),
                    shift=shift
                )

                # data_instance.mc_on_hours = running_time
                # data_instance.mc_idle_hours = idle_time
                # data_instance.save()




        print(f"Shift: {shift}, Passed Minutes: {passed_minutes}")
