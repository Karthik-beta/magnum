import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MenuItem } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';


import { timer } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-view-lmc',
  templateUrl: './view-lmc.component.html',
  styleUrls: ['./view-lmc.component.scss']
})
export class ViewLmcComponent implements OnInit {



    constructor(private service: SharedService) { }



      //PrimeNg Table
      lineMachineList: any[] = [];
      rows: number = 10;
      currentPage: number = 1;
      totalRecords: number = 0;
      text: string = '';
      results: any[] = [];
      rowsPerPageOptions: number[] = [10, 20, 30];
      loading: boolean = false;



    ModalTitle:string="";
    lmcPlan: any;
    searchText:string="";
    ProductionPlanListWithoutFilter:any=[];


    items: MenuItem[] = [];


    planned: number;

    processing: number;

    completed: number;

    transaction_today: number;




    ngOnInit(): void {
      this.refreshProdPlanList();
      this.statsview();

      this.items = [
        { label: 'Import', icon: 'fas fa-file-import' },
        { label: 'Export', icon: 'fas fa-download' },
        // { separator: true },
    ];
    }

    addClick(){
      this.lmcPlan={
        job_id: "",
        company: "",
        plant: "",
        shopfloor: "",
        assembly_line: "",
        machine_id: "",
        product_id: "",
        product_target: "",
      }
      this.ModalTitle="Add Production Plan";
    }

    editClick(item: any){
      this.lmcPlan=item;
      this.ModalTitle="Edit Production Plan";
    }

    deleteClick(item: any){
    //   if(confirm('Are you sure??')){
    //     this.service.deleteProductionPlanning(item.ProductionPlanId).subscribe(data=>{
    //       alert(data.toString());
    //       this.refreshProdPlanList();
    //     })
    //   }
    }

    closeClick(){
      this.ActivateDetailsLMCComp=false;
      this.refreshProdPlanList();
    }

    refreshProdPlanList(){
      this.loading = true;

      const params = {
        page: this.currentPage.toString(),
        page_size: this.rows.toString()
      };

      this.service.getLineMachineConfig(params).subscribe((data: any) => {
        this.lineMachineList = data.results; // Assuming your API response has a 'results' property
        this.totalRecords = data.count;   // Assuming your API response has a 'count' property
        this.loading = false;
      });
    }

    loadLogs(event: TableLazyLoadEvent): void {
        this.loading = true;

        const params: any = {
          page: ((event.first || 0) / (event.rows || 10) + 1).toString(),
          page_size: (event.rows || 10).toString(),
          sortField: event.sortField || '',
          sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
        };

        this.service.getLineMachineConfig(params).subscribe((data: any) => {
          this.lineMachineList = data.results;
          this.totalRecords = data.count;
          this.loading = false;
        });
      }

      display: boolean = false;
      ActivateDetailsLMCComp:boolean=false;


      ViewClick(item: any){
        this.lmcPlan=item;
        this.ModalTitle= item.job_id;
        this.ActivateDetailsLMCComp=true;
      }

      statsview() {
        timer(0, 10000)  // Emit an initial value immediately and then every 10 seconds
            .pipe(
                switchMap(() => this.service.getProductionStats()),  // Switch to the new observable every 10 seconds
                distinctUntilChanged()  // Only emit when the data changes
            )
            .subscribe((data: any) => {
                this.planned = data.planned;
                this.processing = data.order_in_process;
                this.completed = data.completed;
                this.transaction_today = data.transactions_today;
            });
    }


  }

