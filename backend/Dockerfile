FROM python:3.11.7

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the entire application
COPY . /app/

# Install cron
RUN apt-get update && apt-get install -y cron

# Copy cron job file into container
COPY cron2.py /app/cron2.py

# Add cron job entry
RUN echo "* * * * * python /app/cron2.py >> /var/log/cron.log 2>&1" > /etc/cron.d/my-cron-job

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/my-cron-job

# Expose port 8000 for development (adjust for production)
EXPOSE 8000

# Apply the cron jobs defined in Django settings
# CMD ["sh", "-c", "python manage.py crontab add && cron && python manage.py runserver 0.0.0.0:8000"]
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]