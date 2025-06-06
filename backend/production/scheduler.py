# scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events
from apscheduler.jobstores.base import JobLookupError
from apscheduler.triggers.interval import IntervalTrigger
from django.core.management import call_command
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

_scheduler = None
_paused_jobs = {}

def get_scheduler():
    """Get or create the global scheduler instance"""
    global _scheduler
    try:
        if _scheduler is None:
            _scheduler = BackgroundScheduler(
                timezone=settings.TIME_ZONE,
                job_defaults={
                    'misfire_grace_time': 60 * 5,  # 5 minutes grace time
                    'coalesce': True,  # Combine multiple missed runs
                    'max_instances': 1
                }
            )
            _scheduler.add_jobstore(DjangoJobStore(), "default")
            
            # Add jobs with better configuration
            _scheduler.add_job(
                run_my_command,
                trigger=IntervalTrigger(
                    minutes=1,
                    timezone=settings.TIME_ZONE
                ),
                id="my_job",
                replace_existing=True
            )
            
            logger.info("Created new scheduler instance")
        return _scheduler
    except Exception as e:
        logger.error(f"Failed to create/get scheduler: {str(e)}")
        return None

def run_my_command():
    """Execute management commands with better error handling"""
    commands = ['machinewise', 'andon10', 'andon9']
    
    for command in commands:
        try:
            call_command(command)
            logger.info(f"Successfully executed command: {command}")
        except Exception as e:
            logger.error(f"Error executing command {command}: {str(e)}")

def start():
    scheduler = get_scheduler()  # Use the global scheduler instance
    if not scheduler:
        logger.error("Scheduler instance could not be retrieved. Aborting start.")
        return

    # Check if the job already exists
    existing_job = scheduler.get_job("my_job")
    if existing_job:
        logger.info("Job 'my_job' already exists. Skipping re-creation.")
    else:
        try:
            scheduler.add_job(
                run_my_command,
                trigger=IntervalTrigger(minutes=1, timezone=settings.TIME_ZONE),
                id="my_job",
                replace_existing=True,
                max_instances=1,  # Prevent overlap
                misfire_grace_time=30  # Allow a grace period of 30 seconds
            )
            logger.info("Job 'my_job' added successfully.")
        except Exception as e:
            logger.error(f"Failed to add job 'my_job': {str(e)}")

    # Register the job and events
    try:
        register_events(scheduler)
        scheduler.start()
        logger.info("Scheduler started.")
    except Exception as e:
        logger.error(f"Failed to start scheduler: {str(e)}")

def pause_scheduler():
    """Pause all jobs without stopping the scheduler"""
    global _paused_jobs
    scheduler = get_scheduler()
    if scheduler:
        try:
            _paused_jobs = {}
            for job in scheduler.get_jobs():
                _paused_jobs[job.id] = job.next_run_time
                job.pause()
            logger.info("All scheduler jobs paused")
            return True
        except Exception as e:
            logger.error(f"Failed to pause scheduler: {str(e)}")
    return False

def resume_scheduler():
    """Resume all paused jobs"""
    global _paused_jobs
    scheduler = get_scheduler()
    if scheduler:
        try:
            for job in scheduler.get_jobs():
                if job.id in _paused_jobs:
                    job.resume()
            _paused_jobs = {}
            logger.info("All scheduler jobs resumed")
            return True
        except Exception as e:
            logger.error(f"Failed to resume scheduler: {str(e)}")
    return False

def shutdown_scheduler():
    """Safely shutdown the scheduler"""
    global _scheduler
    try:
        if _scheduler and _scheduler.running:
            _scheduler.shutdown(wait=True)
            _scheduler = None
            logger.info("Scheduler shutdown successfully")
            return True
        return False
    except Exception as e:
        logger.error(f"Scheduler shutdown failed: {str(e)}")
        return False