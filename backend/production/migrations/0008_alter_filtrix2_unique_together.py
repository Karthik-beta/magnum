# Generated by Django 4.2.6 on 2025-05-17 12:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0007_alter_filtrix2_actual_alter_filtrix2_planned'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='filtrix2',
            unique_together={('day', 'shift')},
        ),
    ]
