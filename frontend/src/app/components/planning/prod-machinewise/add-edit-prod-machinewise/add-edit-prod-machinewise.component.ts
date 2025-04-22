import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-add-edit-prod-machinewise',
  templateUrl: './add-edit-prod-machinewise.component.html',
  styleUrls: ['./add-edit-prod-machinewise.component.scss']
})
export class AddEditProdMachinewiseComponent {

    @Input() prodmach: any;
  @Output() prodMachAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service: SharedService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  id!: number;
  date: string="";
  time: string="";
  on_time!: number;
  actual!: number;

  ngOnInit(): void {
    this.id = this.prodmach.id;
    this.date = this.prodmach.date;
    this.time = this.prodmach.time;
    this.on_time = this.prodmach.on_time;
    this.actual = this.prodmach.actual;
  }

  updateProductionMachine() {
    // Create an employee object from form data
    const plan = {
      id: this.id,
      date: this.date,
      time: this.time,
      on_time: this.on_time,
      actual: this.actual,
      // Add other properties as needed
    };

    this.service.updateMachineWiseData(plan).subscribe({
      next: (response) => {
        // Handle success response if needed
        console.log('Employee updated:', response);

        // Show success message
         this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully Updated Production Plan Details'
        });

        // Programmatically trigger the Close button
        const closeButton = document.getElementById('closeButton') as HTMLButtonElement;
        if (closeButton) {
          closeButton.click();
        }

        // Emit event to notify parent component
        this.prodMachAdded.emit();

      },
      error: (error) => {
        // Handle error if needed
        // console.error('Error updating employee:', error);

        // Show error message
        this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Failed to Update Production Plan Details' });

      }
    });

  }

}
