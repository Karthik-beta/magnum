import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-solo-assemblyline',
  templateUrl: './add-edit-solo-assemblyline.component.html',
  styleUrls: ['./add-edit-solo-assemblyline.component.scss']
})
export class AddEditSoloAssemblylineComponent {

    @Input() prodassembly: any;
    @Output() prodAssemblyAdded: EventEmitter<void> = new EventEmitter<void>();

    constructor(private service: SharedService) {}

    id!: number;
    mc_on_hours!: number;
    actual!: number;
    target!: number;
    current!: number;

    ngOnInit(): void {
        if (this.prodassembly) {
            this.id = this.prodassembly.id;
            this.mc_on_hours = this.prodassembly.mc_on_hours;
            this.actual = this.prodassembly.actual;
            this.target = this.prodassembly.target;
            this.current = this.prodassembly.current;
        }
      }

    updateAssemblyLine() {
        // Create an employee object from form data
        const plan = {
          id: this.id,
          mc_on_hours: this.mc_on_hours,
          actual: this.actual,
          target: this.target,
          current: this.current,
          // Add other properties as needed
        };

        this.service.updateSoloAssemblyLineData(plan).subscribe({
          next: (response) => {
            // Handle success response if needed
            // console.log('Assemblyline updated:', response);

            // Show success message
            //  this.messageService.add({
            //   severity: 'success',
            //   summary: 'Success',
            //   detail: 'Successfully Updated Production Plan Details'
            // });

            // Programmatically trigger the Close button
            const closeButton = document.getElementById('closeButton') as HTMLButtonElement;
            if (closeButton) {
              closeButton.click();
            }

            // Emit event to notify parent component
            this.prodAssemblyAdded.emit();

          },
          error: (error) => {
            // Handle error if needed
            // console.error('Error updating employee:', error);

            // Show error message
            // this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Failed to Update Production Plan Details' });

          }
        });

      }

}
