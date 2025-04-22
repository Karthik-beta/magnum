import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-alert-report',
  templateUrl: './alert-report.component.html',
  styleUrls: ['./alert-report.component.scss']
})
export class AlertReportComponent implements OnInit {

    constructor(
      private service: SharedService, private messageService: MessageService, private confirmationService: ConfirmationService) { }


    // andonList: any[] = [];
    andonListCopy: any[] = [];
    rows: number = 10;
    currentPage: number = 1;
    totalRecords: number = 0;
    text: string = '';
    results: any[] = [];
    rowsPerPageOptions: number[] = [10, 20, 30];
    loading: boolean = false;



    selectedCategory: string = 'All';
    selectedMachine: string='All';
    selectedAssemblyline: string='All';
    selectedShift: string='All';

    items: MenuItem[] = [];



    today_open_alerts: number = 0;
    total_open_alerts: number = 0;
    total_acknowledge_alerts: number = 0;
    total_resetting_alerts: number = 0;
    total_engineering_alerts: number = 0;
    total_quality_alerts: number = 0;
    total_mech_maint_alerts: number = 0;
    total_elect_maint_alerts: number = 0;
    total_alerts: number = 0;



    ngOnInit(): void {
      this.refreshAndList();
      this.metricsData();

      this.items = [
        { label: 'Import', icon: 'fas fa-file-import' },
        { label: 'Export', icon: 'fas fa-download',
            command: () => {
                this.downloadAndonData();
            }
        },
        // { separator: true },
      ];
    }


    refreshAndList(): void {
      this.loading = true;

      const params = {
        page: this.currentPage.toString(),
        page_size: this.rows.toString(),
      };

      this.service.getAndList(params).subscribe((data: any) => {
        this.andonList = data.results; // Assuming your API response has a 'results' property
        this.totalRecords = data.count;   // Assuming your API response has a 'count' property
        this.loading = false;

      });
    }


    @ViewChild('filter') filter!: ElementRef;

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onPageChange(event: any): void {
      this.rows = event.rows;
      this.currentPage = event.page ;

      this.refreshAndList();
    }

    loadLogs(event: TableLazyLoadEvent): void {
    //   this.loading = true;

    //   const params: any = {
    //     page: ((event.first || 0) / (event.rows || 10) + 1).toString(),
    //     page_size: (event.rows || 10).toString(),
    //     sortField: event.sortField || '',
    //     sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
    //   };

    //   this.service.getAndList(params).subscribe((data: any) => {
    //     this.andonList = data.results;
    // this.andonListCopy = this.andonList.slice();  // Make a copy of the andonList
    // console.log('copied array',this.andonListCopy);
    //     this.totalRecords = data.count;
    //     this.loading = false;
    //   });
    }

    onCategoryChange() {
      if (this.selectedCategory === 'All') {
        // If you have an "All" option, show all data
        this.andonList = this.andonList; // Use the instance member this.originalAndonList
      }
      else {
        // Filter the andonList based on the selected category
        this.andonList = this.andonList.filter((item: any) => item.category === this.selectedCategory);
        //                                                   ^^^^^^ Add a type for the 'item' parameter
      }
    }

    onMachineChange() {
      if (this.selectedMachine === 'All') {
        // If you have an "All" option, show all data
        this.andonList = this.andonList; // Use the instance member this.originalAndonList
      }
      else {
        // Filter the andonList based on the selected machine
        this.andonList = this.andonList.filter((item: any) => item.machineId === this.selectedMachine);
        //                                                   ^^^^^^ Add a type for the 'item' parameter
      }
    }

    onAssemblylineChange() {
      if (this.selectedAssemblyline === 'All') {
        // If you have an "All" option, show all data
        this.andonList = this.andonList; // Use the instance member this.originalAndonList
      }
      else {
        // Filter the andonList based on the selected assemblyline
        this.andonList = this.andonList.filter((item: any) => item.assemblyline === this.selectedAssemblyline);
        //                                                   ^^^^^^ Add a type for the 'item' parameter
      }
    }

    onShiftChange() {
      if (this.selectedShift === 'All') {
        // If you have an "All" option, show all data
        this.andonList = this.andonList; // Use the instance member this.originalAndonList
      }
      else {
        // Filter the andonList based on the selected shift
        this.andonList = this.andonList.filter((item: any) => item.shift === this.selectedShift);
        //                                                   ^^^^^^ Add a type for the 'item' parameter
      }
    }

    downloadAndonData() {
      this.service.downloadAndonData().subscribe({
        next: (data) => {
          // Create a Blob object from the response data
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          // Create a URL for the Blob
          const url = window.URL.createObjectURL(blob);

          // Create a link element and trigger a click event to download the file
          const a = document.createElement('a');
          a.href = url;

          // Get the current date
          const currentDate = new Date();

          // Format the date as a string (e.g., "2023-09-01")
          const formattedDate = currentDate.toISOString().split('T')[0];

          // Define the filename based on the formatted date
          const filename = `Andon_data_${formattedDate}.xlsx`;

          // Set the download attribute with the filename
          a.download = filename;

          document.body.appendChild(a);
          a.click();

          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

          // Show success message
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Excel is being downloaded successfully.'
          });
        },
        error: (error) => {
          // Handle any error that might occur during the download
          console.error('Error downloading Andon data:', error);

          // Show error message
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to download excel.'
          });
        }
      });
    }




    metricsData() {
      this.service.getMetricsData().subscribe((data: any) => {
        this.results = data;
        this.today_open_alerts = data.today_open_alerts;
        this.total_open_alerts = data.total_open_alerts;
        this.total_acknowledge_alerts = data.total_acknowledge_alerts;
        this.total_resetting_alerts = data.total_resetting_alerts;
        this.total_engineering_alerts = data.total_engineering_alerts;
        this.total_quality_alerts = data.total_quality_alerts;
        this.total_mech_maint_alerts = data.total_mech_maint_alerts;
        this.total_elect_maint_alerts = data.total_elect_maint_alerts;
        this.total_alerts = data.total_alerts;
      });
    }

    andonList = [
        {
            id: 1,
            company: 'Caterpillar',
            plant: 'CHENNAI',
            shopfloor: 'Workstation',
            assemblyline: 'SSL Main Line',
            machineId: 'WS-001',
            category: 'Equipment Down',
            alertShift: 'GS',
            andonNewIssueTimestamp: '16-04-2025 13:02',
            andonAlertTimestamp: '16-04-2025 13:03',
            andonAcknowledgeTimestamp: '16-04-2025 13:06',
            andonResolvedTimestamp: '16-04-2025 13:06',
            counter: '00:04:00',
            resolution: 'ICA (Interim Containment Action)'
        },
        {
            id: 2,
            company: 'Caterpillar',
            plant: 'CHENNAI',
            shopfloor: 'Workstation',
            assemblyline: 'SSL Main Line',
            machineId: 'WS-001',
            category: 'Equipment Down',
            alertShift: 'GS',
            andonNewIssueTimestamp: '16-04-2025 11:02',
            andonAlertTimestamp: '16-04-2025 11:03',
            andonAcknowledgeTimestamp: '16-04-2025 11:06',
            andonResolvedTimestamp: '16-04-2025 11:09',
            counter: '00:07:00',
            resolution: 'ICA (Interim Containment Action)'
        },
        {
            id: 3,
            company: 'Caterpillar',
            plant: 'CHENNAI',
            shopfloor: 'Workstation',
            assemblyline: 'SSL Main Line',
            machineId: 'WS-002',
            category: 'Equipment Down',
            alertShift: 'GS',
            andonNewIssueTimestamp: '16-04-2025 11:02',
            andonAlertTimestamp: '16-04-2025 11:03',
            andonAcknowledgeTimestamp: '16-04-2025 11:06',
            andonResolvedTimestamp: '16-04-2025 11:09',
            counter: '00:07:00',
            resolution: 'PCA (Permanent Corrective Action)'
        }
    ]

  }
