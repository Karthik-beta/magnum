import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { interval } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-prod-plan-report',
  templateUrl: './prod-plan-report.component.html',
  styleUrls: ['./prod-plan-report.component.scss']
})
export class ProdPlanReportComponent implements OnInit {

    constructor(private service:SharedService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    //PrimeNg Table
    productionPlanList: any[] = [];
    rows: number = 10;
    currentPage: number = 1;
    totalRecords: number = 0;
    text: string = '';
    results: any[] = [];
    rowsPerPageOptions: number[] = [10, 20, 30];
    loading: boolean = false;

    display: boolean = false;
    items: MenuItem[] = [];

    // Set a default interval value (e.g., 5 seconds)
    private refreshIntervalSeconds = 60;


    ModalTitle:string="";
    ActivateAddEditProdPlanComp:boolean=false;
    prodplan:any;
    searchText:string="";
    ProductionPlanListWithoutFilter:any=[];

    @ViewChild('footerTemplate') footerTemplate: TemplateRef<any>;


    ngOnInit(): void {
      this.refreshProdPlanList();

      this.items = [
        { label: 'Import', icon: 'fas fa-file-import' },
        { label: 'Export', icon: 'fas fa-download' },
        // { separator: true },
    ];

    }

    onProdPlanAdded() {
      this.refreshProdPlanList();
    }

    loadLogs(event: TableLazyLoadEvent): void {
      this.loading = true;

      const params: any = {
        page: ((event.first || 0) / (event.rows || 10) + 1).toString(),
        page_size: (event.rows || 10).toString(),
        sortField: event.sortField || '',
        sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
      };

      this.service.getProductionPlan(params).subscribe((data: any) => {
        this.productionPlanList = data.results;
        this.totalRecords = data.count;
        this.loading = false;
      });
    }



    addClick(){
      this.prodplan={
        id: null,
        product_id:"",
        customer:"",
        expected_date:"",
        quantity:0,
        planned_date: null,
        batch_no:"",
        processing_date: null,
        completed_date: null,
      }
      this.ModalTitle="Add Production Plan";
      this.ActivateAddEditProdPlanComp=true;
    }

    editClick(item: any){
      this.prodplan=item;
      this.ModalTitle="Edit Production Plan";
      this.ActivateAddEditProdPlanComp=true;
    }

    // deleteClick(item: { id: any }){
    //   if(confirm('Are you sure??')){
    //     this.service.deleteProductionPlanning(item.id).subscribe(data=>{
    //       alert(data.toString());
    //       this.refreshProdPlanList();
    //     })
    //   }
    // }

    onprodPlanAdded() {
      this.refreshProdPlanList();
    }

    visible: boolean = false;

    showDialog() {
      this.visible = true;
    }

    // deleteClick(item: { id: any }) {
    //   // Extract the employee_id from the log object
    //   const itemId = item.id;
    //   console.log('Deleting item with id:', itemId);

    //   // Display the confirmation dialog before proceeding with deletion
    //   this.confirmationService.confirm({
    //     message: 'Are you sure that you want to delete this item?',
    //     header: 'Confirmation',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //       // Call the deleteProductionPlan method from the service
    //       this.service.deleteProductionPlan(itemId).subscribe({
    //         next: (response) => {
    //           // Handle success response if needed
    //           // Show success message
    //           this.messageService.add({
    //             severity: 'success',
    //             summary: 'Success',
    //             detail: 'Item has been deleted successfully.'
    //           });

    //           // Load data
    //           this.refreshProdPlanList();
    //         },
    //         error: (error) => {
    //           // Handle error if needed
    //           // Show error message
    //           this.messageService.add({
    //             severity: 'error',
    //             summary: 'Error',
    //             detail: 'Failed to delete Item.'
    //           });
    //         }
    //       });
    //     },
    //     reject: () => {
    //       // User rejected the confirmation, do nothing or handle as needed
    //       this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled' });
    //       // console.log('Deletion cancelled by user.');
    //     }
    //   });
    // }


    deleteClick(item: { id: any }) {
      // Extract the employee_id from the log object
      const itemId = item.id;
      console.log('Deleting item with id:', itemId);
      this.service.deleteProductionPlan(itemId).subscribe({
        next: (response) => {
          // Handle success response if needed
          // Show success message


          // Load data
          this.refreshProdPlanList();
        },
        error: (error) => {
          // Handle error if needed
          // Show error message
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Item.'
          });
        }
      });
    }




    closeClick(){
      this.ActivateAddEditProdPlanComp=false;
      this.refreshProdPlanList();
    }

    // refreshProdPlanList() {
    //   this.loading = true;

    //   const params = {
    //     page: this.currentPage.toString(),
    //     page_size: this.rows.toString()
    //   };

    //   this.service.getProductionPlan(params).subscribe((data: any) => {
    //     this.productionPlanList = data.results; // Assuming your API response has a 'results' property
    //     this.totalRecords = data.count;   // Assuming your API response has a 'count' property
    //     this.loading = false;
    //   });
    // }

    refreshProdPlanList() {
        // Create an observable that emits values at a specified interval
        const interval$ = interval(this.refreshIntervalSeconds * 1000);

        // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
        // Use distinctUntilChanged to ensure that the HTTP request is made only if the parameters have changed
        interval$.pipe(
          distinctUntilChanged(),
          switchMap(() => {
            this.loading = true;

            const params = {
              page: this.currentPage.toString(),
              page_size: this.rows.toString(),
            };

            // Use switchMap to cancel the previous HTTP request if a new interval emits
            return this.service.getProductionPlan(params);
          })
        )
        .subscribe((data: any) => {
          this.productionPlanList = data.results; // Assuming your API response has a 'results' property
          this.totalRecords = data.count;   // Assuming your API response has a 'count' property
          this.loading = false;
        });
      }



    filterData(){
      var searchText = this.searchText.toLowerCase();

      this.productionPlanList = this.ProductionPlanListWithoutFilter.filter(function (el: any) {
        return el.EmployeeId.toString().toLowerCase().includes(searchText) ||
               el.productId.toString().toLowerCase().includes(searchText) ||
               el.drawingNo.toString().toLowerCase().includes(searchText) ||
              el.entrycustomer.toString().toLowerCase().includes(searchText) ||
              el.entrypono.toString().toLowerCase().includes(searchText) ||
              el.entrybatchno.toString().toLowerCase().includes(searchText) ||
              el.plandate.toString().toLowerCase().includes(searchText) ||
              el.expecteddate.toString().toLowerCase().includes(searchText);
      });
    }


  }

