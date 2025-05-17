from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import lineMachineSlotConfig, lineMachineConfig, productionPlanning, assemblyLineWiseData, soloAssemblyLineData, spellAssemblyLineData, Filtrix, Filtrix2
from django.utils import timezone
from datetime import datetime, timedelta
from django.db.models import F, Max
from django.dispatch import receiver
from config import models as config_models
from production.serializers import ScheduleInputSerializer

from django.db.models import Count
from django.contrib.postgres.aggregates import ArrayAgg

from . import models


'''copying data from lineMachineSlotConfig to lineMachineConfig'''
# @receiver(post_save, sender=lineMachineSlotConfig)
# def copy_data_to_line_machine_config(sender, instance, created, **kwargs):
#     if created:
#         # Check if a lineMachineConfig entry with the same job_id already exists
#         existing_entry = lineMachineConfig.objects.filter(job_id=instance.job_id).first()

#         if not existing_entry:
#             # If no existing entry with the same job_id, create a new one
#             lineMachineConfig.objects.create(
#                 job_id=instance.job_id,
#                 company=instance.company,
#                 plant=instance.plant,
#                 shopfloor=instance.shopfloor,
#                 product_id=instance.product_id,
#                 assembly_line=instance.assembly_line,
#                 machine_id=instance.machine_id,
#                 total_order= instance.balance_production + instance.planned_production,
#                 required_time=instance.planned_hours,
#                 manager=instance.manager
#             )


'''copying data from lineMachineSlotConfig to lineMachineConfig with assigned start production'''
# @receiver(post_save, sender=lineMachineSlotConfig)
# def copy_data_to_line_machine_config(sender, instance, created, **kwargs):
#     if created:
#         # Find the first non-null value among "shift_a," "shift_b," and "shift_c"
#         first_non_null_shift = None
#         for shift_field in ["shift_a", "shift_b", "shift_c"]:
#             shift_value = getattr(instance, shift_field)
#             if shift_value is not None:
#                 first_non_null_shift = shift_value
#                 break

#         if first_non_null_shift is not None:
#             # Check if a lineMachineConfig entry with the same job_id already exists
#             existing_entry = lineMachineConfig.objects.filter(job_id=instance.job_id).first()

#             if not existing_entry:
#                 # If no existing entry with the same job_id, create a new one
#                 lineMachineConfig.objects.create(
#                     job_id=instance.job_id,
#                     company=instance.company,
#                     plant=instance.plant,
#                     shopfloor=instance.shopfloor,
#                     product_id=instance.product_id,
#                     assembly_line=instance.assembly_line,
#                     machine_id=instance.machine_id,
#                     total_order=instance.planned_production,
#                     required_time=instance.planned_hours,
#                     manager=instance.manager,
#                     assigned_start_production=first_non_null_shift  # Assign the value
#                 )
#             else:
#                 # Update the existing entry with the first non-null shift value
#                 existing_entry.assigned_start_production = first_non_null_shift
#                 existing_entry.save()




'''copying data from lineMachineSlotConfig to lineMachineConfig with assigned start production with date'''
@receiver(post_save, sender=lineMachineSlotConfig)
def copy_data_to_line_machine_config(sender, instance, created, **kwargs):
    if created:
        # Find the first non-null value among "shift_a," "shift_b," and "shift_c"
        first_non_null_shift = None
        for shift_field in ["shift_a", "shift_b", "shift_c"]:
            shift_value = getattr(instance, shift_field)
            if shift_value is not None:
                first_non_null_shift = f"{instance.date}, {shift_value}" # Concatenate shift_value and instance.date
                break

        if first_non_null_shift is not None:
            # Find the last non-null shift value from the last row of the associated job_id
            last_row_instance = lineMachineSlotConfig.objects.filter(job_id=instance.job_id).order_by('-id').first()
            if last_row_instance:
                last_non_null_shift = f"{last_row_instance.date}, {last_row_instance.shift_b}"
                

            # Check if a lineMachineConfig entry with the same job_id already exists
            existing_entry = lineMachineConfig.objects.filter(job_id=instance.job_id).first()
            # production_entry = productionPlanning.objects.filter(job_id=instance.job_id).first()

            first_production_date = lineMachineSlotConfig.objects.filter(job_id=instance.job_id).order_by('date').first()
            last_production_date = lineMachineSlotConfig.objects.filter(job_id=instance.job_id).aggregate(Max('date'))['date__max']




            if not existing_entry:
                # If no existing entry with the same job_id, create a new one
                lineMachineConfig.objects.create(
                    job_id=instance.job_id,
                    company=instance.company,
                    plant=instance.plant,
                    shopfloor=instance.shopfloor,
                    product_id=instance.product_id,
                    stage_name = 'Laminator',
                    product_target = instance.job_id.product_target,
                    assembly_line=instance.assembly_line,
                    machine_id=instance.machine_id,
                    total_order = instance.job_id.quantity,
                    required_time=instance.planned_hours,
                    manager=instance.manager,
                    assigned_end_production=first_non_null_shift,  # Assign the value
                    assigned_start_production=last_non_null_shift
                )

                '''Copy to assemblyLineWiseData'''
                # Fetch the product instance
                product_instance = config_models.ProductRecipe2.objects.filter(product_name=instance.product_id).first()

                # Get all 'stage' values from the 'stages' JSONField
                # stages_data = [stage_dict.get('stage', '') for stage_dict in product_instance.stages]
                # stages_data = [stage_dict for stage_dict in product_instance.stages if 'stage' in stage_dict]
                stages_data = [{k: stage_dict[k] for k in ('stage_no', 'stage') if k in stage_dict} for stage_dict in product_instance.stages]

                # If no existing entry with the same job_id, create a new one
                assemblyLineWiseData.objects.create(
                    plant=instance.plant,
                    shopfloor=instance.shopfloor,
                    assemblyline=instance.assembly_line,
                    machine_id=instance.machine_id,
                    product_id=instance.product_id,
                    date_production= first_production_date.date,
                    # stages = stages_data,
                    shift_name = "Shift FS 06 - 14 (7)"
                    # stages = 4,
                )


                # '''Copy to soloAssemblyLineData'''
                

                # soloAssemblyLineData.objects.create(
                #     stage_no = stages_data[0]['stage_no'],
                #     stage = stages_data[0]['stage']
                # )

            else:
                # Update the existing entry with the first non-null shift value
                existing_entry.assigned_start_production = first_non_null_shift
                existing_entry.save()

            create_solo_assembly_line_data(first_production_date, last_production_date)
            create_spell_assembly_line_data(first_production_date, last_production_date)



def create_solo_assembly_line_data(first_production_date, last_production_date):
    # Define the stage data for four rows
    stages_data = [
        {'stage_no': 1, 'stage': '1', 'mc_on_hours': 420, 'mc_idle_hours': 0, 'target': 60},
        # {'stage_no': 2, 'stage': 'Laminator', 'mc_on_hours': 600,  'mc_idle_hours': 0, 'target': 54},
        # {'stage_no': 3, 'stage': 'Framing', 'mc_on_hours': 600,  'mc_idle_hours': 0, 'target': 54},
        # {'stage_no': 4, 'stage': 'Flash Testing', 'mc_on_hours': 600,  'mc_idle_hours': 0, 'target': 54},
        # {'stage_no': 5, 'stage': 'FQA', 'mc_on_hours': 600,  'mc_idle_hours': 0, 'target': 54},
    ]

    '''Copy to soloAssemblyLineData and this works fine'''
    for stage_info in stages_data:
        current_date = first_production_date.date
        last_date = last_production_date

        while current_date <= last_date:
            # Check if an object with the same date, stage, and shift already exists
            existing_object = soloAssemblyLineData.objects.filter(
                date=current_date,
                stage_no=stage_info['stage_no'],
                stage=stage_info['stage'],
                shift__in=['FS', 'SS', 'TS'],  # Add any other shifts if necessary
            ).exists()

            # If the object doesn't exist, create a new one
            if not existing_object:
                for shift_name in ['FS', 'SS', 'TS']:
                    soloAssemblyLineData.objects.create(
                        stage_no=stage_info['stage_no'],
                        stage=stage_info['stage'],
                        mc_idle_hours=stage_info['mc_idle_hours'],
                        target=stage_info['target'],
                        date=current_date,
                        shift=shift_name,
                    )

            current_date += timedelta(days=1)



def create_spell_assembly_line_data(first_production_date, last_production_date):
    # Define the stage data for four rows
    stages_data = [
        {'stage_no': 1, 'stage': '1', 'mc_on_hours': 420, 'mc_idle_hours': 0, 'target': 60},
        # {'stage_no': 2, 'stage': 'Forming, chip mounter', 'mc_on_hours': 420,  'mc_idle_hours': 0, 'target': 0},
        # {'stage_no': 3, 'stage': 'Welding, Moulding', 'mc_on_hours': 420,  'mc_idle_hours': 0, 'target': 0},
        # {'stage_no': 4, 'stage': 'Final inspection Stamping', 'mc_on_hours': 420,  'mc_idle_hours': 0, 'target': 0},
        # {'stage_no': 5, 'stage': 'QA inspection', 'mc_on_hours': 420,  'mc_idle_hours': 0, 'target': 0},
        # {'stage_no': 5, 'stage': 'Total', 'mc_on_hours': 600,  'mc_idle_hours': 0, 'target': 54},
    ]

    '''Copy to spellAssemblyLineData and this works fine'''
    for stage_info in stages_data:
        current_date = first_production_date.date
        last_date = last_production_date

        while current_date <= last_date:
            # Check if an object with the same date, stage, and shift already exists
            existing_object = spellAssemblyLineData.objects.filter(
                date=current_date,
                stage_no=stage_info['stage_no'],
                stage=stage_info['stage'],
                shift__in=['FS', 'SS', 'TS'],  # Add any other shifts if necessary
            ).exists()

            # If the object doesn't exist, create a new one
            if not existing_object:
                for shift_name in ['FS', 'SS', 'TS']:
                    spellAssemblyLineData.objects.create(
                        stage_no=stage_info['stage_no'],
                        stage=stage_info['stage'],
                        mc_idle_hours=stage_info['mc_idle_hours'],
                        target=stage_info['target'],
                        date=current_date,
                        shift=shift_name,
                    )

            current_date += timedelta(days=1)



'''Update planned date field succesfully working'''
@receiver(post_save, sender=lineMachineConfig)
def update_planned_date(sender, instance, created, **kwargs):
    if created:
        print(f"Signal handler triggered for job_id: {instance.job_id.job_id}")
        try:
            existing_entry = lineMachineConfig.objects.filter(assigned_start_production=instance.job_id).first()
            planned_date_str = instance.assigned_start_production
            # print(f"planned_date lmc: {planned_date_str}")

            productionPlanning.objects.filter(job_id=instance.job_id.job_id).update(planned_date=planned_date_str)
            print(f"Updated planned_date for job_id: {instance.job_id.job_id}")
        except productionPlanning.DoesNotExist:
            # Handle the case where no matching production planning instance is found.
            print(f"Error: No matching production planning instance found for job_id {instance.job_id.job_id}")



'''Update planned date field succesfully working with serializer data'''
# @receiver(post_save, sender=lineMachineConfig)
# def update_start_date(sender, instance, created, **kwargs):
#     print("Signal handler is executed.")
#     if created:
#         print(f"Signal handler triggered for job_id: {instance.job_id}")
#         try:
#             # Deserialize the input data using the ScheduleInputSerializer
#             input_data = {
#                 "job_id": instance.job_id,
#                 # "company": instance.company,
#                 # "plant": instance.plant,
#                 # "shopfloor": instance.shopfloor,
#                 # "assembly_line": instance.assembly_line,
#                 # "machine_id": instance.machine_id,
#                 # "product_id": instance.product_id,
#                 # "quantity": instance.quantity,
#                 "start_date": instance.start_date  # Use the 'start_date' from the input
#             }
#             serializer = ScheduleInputSerializer(data=input_data)

#             if serializer.is_valid():
#                 # Extract the 'start_date' from the input data and update the 'start_date' field in productionPlanning
#                 start_date = serializer.validated_data['start_date']
#                 production_planning = productionPlanning.objects.get(job_id=instance.job_id)
#                 production_planning.planned_date = start_date
#                 production_planning.save()
#                 print(f"Updated start_date for job_id: {instance.job_id}")
#             else:
#                 print("Error: Input data is invalid.")
#         except productionPlanning.DoesNotExist:
#             # Handle the case where no matching production planning instance is found.
#             print(f"Error: No matching production planning instance found for job_id {instance.job_id}")

@receiver(post_save, sender=Filtrix)
def update_filtrix2_on_filtrix_create(sender, instance, created, **kwargs):
    if created:
        now = instance.created_at if instance.created_at else datetime.now()
        today = now.date()

        # Define the shift slots (08:00 - 09:00 ... 17:00 - 18:00)
        shift_start_hour = 8
        shift_end_hour = 18  # last slot is 17:00 - 18:00

        # Current slot hour (e.g., 12 if now is 12:15)
        current_hour = now.replace(minute=0, second=0, microsecond=0).hour

        # For all slots from 08:00 up to and including the current slot
        for hour in range(shift_start_hour, current_hour + 1):
            slot_start = datetime.combine(today, datetime.min.time()).replace(hour=hour)
            slot_end = slot_start + timedelta(hours=1)
            shift_label = f"{slot_start.strftime('%H:%M')} - {slot_end.strftime('%H:%M')}"
            # Only create if not exists for today
            if not Filtrix2.objects.filter(day=today, shift=shift_label).exists():
                Filtrix2.objects.create(
                    day=today,
                    shift=shift_label,
                    on_time='00:60',
                    idle_time='00:00',
                    planned=25,
                    actual=0,
                    performance=0,
                    gap=-25,
                )

        # Now update the current slot's actual, performance, and gap
        shift_start = now.replace(minute=0, second=0, microsecond=0)
        shift_end = shift_start + timedelta(hours=1)
        shift_label = f"{shift_start.strftime('%H:%M')} - {shift_end.strftime('%H:%M')}"

        filtrix2_obj, _ = Filtrix2.objects.get_or_create(
            day=today,
            shift=shift_label,
            defaults={
                'on_time': '00:60',
                'idle_time': '00:00',
                'planned': 25,
                'actual': 0,
                'performance': 0,
                'gap': 0,
            }
        )

        # Increment 'actual'
        filtrix2_obj.actual = (filtrix2_obj.actual or 0) + 1

        # Calculate performance and gap
        planned_val = filtrix2_obj.planned or 0
        if planned_val > 0:
            filtrix2_obj.performance = int((filtrix2_obj.actual / planned_val) * 100)
            filtrix2_obj.gap = filtrix2_obj.actual - planned_val
        else:
            filtrix2_obj.performance = 0
            filtrix2_obj.gap = 0

        filtrix2_obj.save()