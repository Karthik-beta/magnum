import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-add-edit-prod-plan',
  templateUrl: './add-edit-prod-plan.component.html',
  styleUrls: ['./add-edit-prod-plan.component.scss']
})
export class AddEditProdPlanComponent implements OnInit {

    @Input() prodplan: any;
    @Output() prodPlanAdded: EventEmitter<void> = new EventEmitter<void>();

    @Input() showFooterButtons: boolean = true;

    constructor(private service: SharedService, private messageService: MessageService, private confirmationService: ConfirmationService) { }


    items: MenuItem[] = [];
    customers: any;


    id!: number;
    product_id: any=[];
    customer: any=[];
    expected_date: string="";
    batch_no: any=[];
    quantity!: number;
    planned_date: string="";
    processing_date: string="";
    completed_date: string="";
    po_no: any=[];


    productList:any=[];
    batchList:any=[];
    poNoList:any=[];

    ngOnInit(): void {
      this.id = this.prodplan.id;
      this.product_id = this.prodplan.product_id;
      this.customer = this.prodplan.customer;
      this.expected_date = this.prodplan.expected_date;
      this.batch_no = this.prodplan.batch_no;
      this.quantity = this.prodplan.quantity;
      this.planned_date = this.prodplan.planned_date;
      this.processing_date = this.prodplan.processing_date;
      this.completed_date = this.prodplan.completed_date;
      this.po_no = this.prodplan.po_no;
      this.getProductList();
      this.getBatchList();
      this.getPoNoList();


      this.customers = [
        { label: 'ABS' },
        // { label: 'CUSTOMER B' }
      ]

    }

    addProductionPlan() {
      // Create an employee object from form data
      const plan = {
        id: this.id,
        product_id: this.product_id.label,
        customer: this.customer.label,
        expected_date: this.expected_date,
        batch_no: this.batch_no.label,
        quantity: this.quantity,
        planned_date: this.planned_date,
        processing_date: this.processing_date,
        completed_date: this.completed_date,
        po_no: this.po_no.label
        // Add other properties as needed
      };

    //   console.log('plan', plan);

      // Call the service method to update employee data
      this.service.addProductionPlan(plan).subscribe({
        next: (response) => {
          // Handle success response if needed
        //   console.log('Employee data updated:', response);

          // Programmatically trigger the Close button
          const closeButton = document.getElementById('closeButton') as HTMLButtonElement;
          if (closeButton) {
            closeButton.click();
          }

          // Emit event to notify parent component
          this.prodPlanAdded.emit();

        },
        error: (error) => {
          // Handle error if needed
          console.error('Error updating employee data:', error);

          // Show error message
          this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Failed to Add Production Plan' });
        }
      });
    }

    updateProductionPlan(){
      var plan = {
        id: this.id,
        product_id: this.product_id,
        customer: this.customer,
        expected_date: this.expected_date,
        batch_no: this.batch_no,
        quantity: this.quantity,
        planned_date: this.planned_date,
        processing_date: this.processing_date,
        completed_date: this.completed_date,
        po_no: this.po_no
      };

      this.service.updateProductionPlan(plan).subscribe({
        next: (response) => {
          // Handle success response if needed
          // console.log('Employee updated:', response);

          // Programmatically trigger the Close button
          const closeButton = document.getElementById('closeButton') as HTMLButtonElement;
          if (closeButton) {
            closeButton.click();
          }

          // Emit event to notify parent component
          this.prodPlanAdded.emit();

        },
        error: (error) => {
          // Handle error if needed
          // console.error('Error updating employee:', error);

          // Show error message
          this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Failed to Update Production Plan Details' });

        }
      });
    }

    deleteEmployee() {
      this.service.getProductionPlan(this.id).subscribe({
        next: (response) => {
          // Handle success response if needed
          console.log('Employee deleted:', response);
        },
        error: (error) => {
          // Handle error if needed
          console.error('Error deleting employee:', error);
        }
      });
    }


    getProductList() {
      this.service.getProductList().subscribe(data=>{
        // this.productList=data;
        // console.log(this.productList);
        this.productList = data.map(item => ({label: item.product_Name, value: item.product_Name}));
      });
    }

    getBatchList(){
      this.service.getBatchList().subscribe(data=>{
        this.batchList=data.map(item => ({label: item.batch_name, value: item.batch_name}));
      });
    }

    getPoNoList(){
      this.service.getPoNoList().subscribe(data=>{
        this.poNoList=data.map(item => ({label: item.po_no, value: item.po_no}));
      });
    }

  }
