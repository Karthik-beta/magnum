from django.utils import timezone
from production.models import TestTable  

dummy_row = TestTable(
    field1='Dummy Value',
    field2=timezone.now()  
)

# Save the dummy row to the database
dummy_row.save()
