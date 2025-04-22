import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { interval } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-prod-plan',
  templateUrl: './prod-plan.component.html',
  styleUrls: ['./prod-plan.component.scss']
})
export class ProdPlanComponent implements OnInit {

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
    private refreshIntervalSeconds = 5;


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

    visible: boolean = false;



    deleteClick(item: { id: any }) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
      // Extract the employee_id from the log object
      const itemId = item.id;
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

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }


    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Production Plan Added' });
    }

    prodPlanAdded() {
        this.display = false;
        this.refreshProdPlanList();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Production Plan Added' });
    }



    closeClick(){
      this.display=false;
      this.refreshProdPlanList();
    }

    refreshProdPlanList() {
      this.loading = true;

      const params = {
        page: this.currentPage.toString(),
        page_size: this.rows.toString()
      };

      this.service.getProductionPlan(params).subscribe((data: any) => {
        this.productionPlanList = data.results; // Assuming your API response has a 'results' property
        this.totalRecords = data.count;   // Assuming your API response has a 'count' property
        this.loading = false;
      });
    }

    // refreshProdPlanList() {
    //     // Create an observable that emits values at a specified interval
    //     const interval$ = interval(this.refreshIntervalSeconds * 1000);

    //     // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
    //     // Use distinctUntilChanged to ensure that the HTTP request is made only if the parameters have changed
    //     interval$.pipe(
    //       distinctUntilChanged(),
    //       switchMap(() => {
    //         this.loading = true;

    //         const params = {
    //           page: this.currentPage.toString(),
    //           page_size: this.rows.toString(),
    //         };

    //         // Use switchMap to cancel the previous HTTP request if a new interval emits
    //         return this.service.getProductionPlan(params);
    //       })
    //     )
    //     .subscribe((data: any) => {
    //       this.productionPlanList = data.results; // Assuming your API response has a 'results' property
    //       this.totalRecords = data.count;   // Assuming your API response has a 'count' property
    //       this.loading = false;
    //     });
    //   }





  }
