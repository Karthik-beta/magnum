from django.apps import AppConfig
from django.core.management import call_command
import sys
import os

# Load the correct environment file
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')

class ProductionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'production'

    def ready(self):
        import production.signals
        # Prevent the scheduler from starting during migrations
        if 'runserver' in sys.argv or 'uwsgi' in sys.argv:
            from . import scheduler
            # Delayed scheduler start after migrations are checked/applied
            try:
                if ENVIRONMENT != 'local':
                    call_command('migrate', interactive=False)  # Ensure all migrations are applied
                    scheduler.start()
                    print("Scheduler started.")
            except Exception as e:
                print(f"Scheduler failed to start: {e}")