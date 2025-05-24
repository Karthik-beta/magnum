import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { MessageService, ConfirmationService } from 'primeng/api';

interface TableDataItem {
    serialNo: number;
    lotNo: string;
    productCode: string;
    start: string;
    end: string;
    actual: string;
    serial_no: string;
    cycleTime: string;
    shift: string; // Now 'shift' is part of each TableDataItem
    mcOn: string;
    mcIdle: string;
    plan: number;
    actualValue: number; // Avoid conflict with 'actual' column name
    performance: string;
    gap: number;
}

@Component({
  selector: 'app-filtrex-workstation',
  templateUrl: './filtrex-workstation.component.html',
  styleUrls: ['./filtrex-workstation.component.scss']
})
export class FiltrexWorkstationComponent implements OnInit {

    tableData: TableDataItem[] = [];
    staticRowData: any = {};
    loading: boolean = false;
    totalRecords: number = 1000;

    lotNo: string='';
    productCode: string='';
    search: string='';

    machine: string = '';
    shopfloorID: string = '';
    lineName: string = '';

    constructor(private route: ActivatedRoute, private service: SharedService, private cdr: ChangeDetectorRef, private messageService: MessageService) {}

    ngOnInit() {
        this.timeFunction();
        this.getAndonList();
        this.getAllAndonList();

        this.route.paramMap.subscribe(params => {
            this.machine = (params.get('lid') || '').substring(1);
            this.shopfloorID = (params.get('sid') || '').substring(1);
            this.lineName = `Line ${this.machine}`;

            // Auto-select the machine based on the route parameter
            this.selectedMachineId = `WS-${this.machine.padStart(3, '0')}`;

            // Call getAndonList whenever the route changes
            this.getAndonList();
            this.getAllAndonList();
            this.getCompanyList();
            this.getLocationList();
            this.getFiltrixList();
            this.getFiltrix2List();
        });

        // Andon Breakdown Section
        this.rows = [...this.dummyList];

        // Analysis Section
        this.productionChart();
        this.bar2Chart();
        this.bar4Chart();
        this.qualityChart();
        // this.generateSampleData();
        this.updateStaticRowData();

        this.generateShopfloorStatusData();
    }

    selectedCard: string = 'Daily Plan vs Actual'; // Holds the currently selected card
    barCode: string = '';

    selectCard(cardName: string) {
        this.selectedCard = cardName;
    }

    currentDate$: Observable<Date>;
    private subscription: Subscription;

    currentDate: Date;

        timeFunction() {
            // Create an observable that emits the current date every second
          this.currentDate$ = interval(1000).pipe(
            // Use the map operator to transform the emitted value to the current date
            map(() => new Date())
          );

          // Subscribe to the observable and update the current date property
          this.subscription = this.currentDate$.subscribe(date => {
            this.currentDate = date;
          });
    }

    generateSampleData(): void {
        this.tableData = []; // Clear previous data
        let currentTime = 8; // Start at 8:00 AM

        for (let i = 1; i <= 50; i++) {
          const startHour = String(currentTime).padStart(2, '0');
          const endHour = String(currentTime + 1).padStart(2, '0');
          const shiftTimeRange = `${startHour}:00 - ${endHour}:00`;

          this.tableData.push({
            serialNo: i,
            lotNo: `WX${12345 + i}`,
            productCode: `XRAY 9876`,
            start: `${startHour}:15`, // Example start within the hour
            end: `${startHour}:30`,   // Example end within the hour
            serial_no: `NO-${432343 + i}`,
            actual: '00:15',
            cycleTime: '01:30',
            shift: shiftTimeRange, // Assign the shift time range
            mcOn: `${startHour}:00`,
            mcIdle: '00:02',
            plan: 110 - (i % 20), // Varying plan values
            actualValue: 105 - (i % 15), // Varying actual values
            performance: '98%', // Example performance
            gap: 3
          });
          currentTime++;
          if (currentTime > 17) currentTime = 8; // Loop back to 8:00 AM after 5 PM (example)
        }
      }

      dummyStaticRow = [
        {
            shift: "08:00 - 09:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: 76.8,
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "09:00 - 10:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: 6.8,
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "10:00 - 11:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: 76.8,
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "11:00 - 12:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            // performance: 76.8,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "12:00 - 01:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "01:00 - 02:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "02:00 - 03:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "03:00 - 04:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "04:00 - 05:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "05:00 - 06:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 25,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
      ]

      updateStaticRowData(): void {
        if (this.tableData.length > 0) {
          // For this example, we'll always take the static data from the *first* item in the tableData array.
          // In a real application, you might need more sophisticated logic to determine which data to display in the static row,
          // e.g., based on the currently visible data in the scrollable section or a summary calculation.
          const firstItem = this.tableData[0];
          this.staticRowData = {
            shift: firstItem.shift,
            mcOn: firstItem.mcOn,
            mcIdle: firstItem.mcIdle,
            plan: firstItem.plan,
            actual: firstItem.actualValue,
            performance: firstItem.performance,
            gap: firstItem.gap
          };
        } else {
          this.staticRowData = { shift: '-', mcOn: '-', mcIdle: '-', plan: '-', actual: '-', performance: '-', gap: '-' };
        }
      }

      getBackgroundColorStyleForGap(gap: number): any {
        let backgroundColor = '';

        if (gap > 0) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), green)';
        }
        else if (gap === 0) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), yellow)';
        }
        else if (gap < 0) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), red)';
        }

        return { 'background': backgroundColor };
    }

      // Example: If you want to update staticRowData when scrolling (basic example - you might need a more robust scroll detection)
      @HostListener('scroll', ['$event.target'])
      onScroll(scrollElement: HTMLElement) {
        if (scrollElement.classList.contains('scrollable-body')) {
          // Basic scroll detection - you might need to calculate visible rows and use a more precise method
          if (this.tableData.length > 0 && scrollElement.scrollTop > 50) { // Just a simple threshold for example
            // In a real scenario, you would determine the *visible* data and update staticRowData accordingly.
            // For now, we'll just update it based on the *last* item in the tableData as a very basic example.
            const lastVisibleItem = this.tableData[this.tableData.length - 1]; // VERY SIMPLIFIED example
            this.staticRowData = {
              shift: lastVisibleItem.shift,
              mcOn: lastVisibleItem.mcOn,
              mcIdle: lastVisibleItem.mcIdle,
              plan: lastVisibleItem.plan,
              actual: lastVisibleItem.actualValue,
              performance: lastVisibleItem.performance,
              gap: lastVisibleItem.gap
            };
          } else if (this.tableData.length > 0 && scrollElement.scrollTop <= 50) {
              this.updateStaticRowData(); // Reset to first item's data when scrolled back to top (example)
          }
        }
      }

    // Andon Call Help
    dummyRowAdded: boolean = true;
    currentPage: number = 1;
    andonList: any[] = [];
    allAndonList: any[] = [];
    isAndonListEmpty: boolean = false;
    companyName: string = '';
    locationName: string = '';

    // getAndonList() {
    //     const params = {
    //         page: this.currentPage.toString(),
    //         page_size: this.rows.toString()
    //     };

    //     this.service.getAndList(params).subscribe((data: any) => {
    //         this.andonList =data.results;
    //         this.totalRecords = data.count;
    //         this.cdr.detectChanges();
    //     });

    //     this.getMetricsData();
    // }

    getCompanyList() {
        this.service.getCompanyList().subscribe((data: any) => {
            // Process the data as needed
            this.companyName = data[0].company_name;
            console.log('Company List:', data);
        });
    }

    getLocationList() {
        this.service.getLocation().subscribe((data: any) => {
            // Process the data as needed
            this.locationName = data[0].plant_name;
            console.log('Location List:', data);
        });
    }

    getAndonList() {
        const params = {
            page: this.currentPage.toString(),
            page_size: this.rows.toString(),
            machineId: `WS-${this.machine.padStart(3, '0')}`,
            andon_resolved_isnull: true,
            company: 'Filtrex'
        };

        this.service.getAndList(params).subscribe((data: any) => {
            // Filter the andonList to include only the machineId matching the activated route
            const routeMachineId = `WS-${this.machine.padStart(3, '0')}`;
            this.andonList = data.results.filter((item: any) => item.machineId === routeMachineId);
            this.totalRecords = this.andonList.length; // Update totalRecords based on the filtered list
            this.isAndonListEmpty = this.andonList.length === 0;
            this.cdr.detectChanges();
            console.log('Andon List:', this.andonList);
        });

        this.getAllAndonList();
    }

    getAllAndonList() {
        const params = {
            page: this.currentPage.toString(),
            page_size: this.rows.toString(),
            machineId: `WS-${this.machine.padStart(3, '0')}`,
            company: 'Filtrex',
        };

        this.service.getAndList(params).subscribe((data: any) => {
            // Filter the andonList to include only the machineId matching the activated route
            const routeMachineId = `WS-${this.machine.padStart(3, '0')}`;
            this.allAndonList = data.results.filter((item: any) => item.machineId === routeMachineId);
            this.totalRecords = this.andonList.length; // Update totalRecords based on the filtered list
            this.cdr.detectChanges();
        });

        this.getMetricsData();
    }

    metricsData: any[] = [];

    getMetricsData() {
        this.service.getMetricsData().subscribe((data: any) => {
            // Process the data as needed
            this.metricsData = data;
        });
    }

    // Andon Call Help
    dummyList: any[] = [
        // {
        //     company: 'Caterpillar',
        //     location: 'CHENNAI',
        //     shopfloor: 'XYZ',
        //     assemblyline: 'TSE',
        //     machine_id: 'TSE-001',
        //     category: 'RESETTING',
        //     sub_category: '',
        //     alert_shift: 'A',
        //     employee: '[EMPNAME, ID]',
        //     andon_alert: '22-11-2023 14:06',
        //     andon_acknowledge: '22-11-2023 15:06',
        //     andon_resolved: '22-11-2023 16:06',
        //     total_breakdown: '00:02:00'
        // }
        {
            id: 1,
            company: 'L & T Construction',
            plant: 'Puduchery',
            shopfloor: 'Metal',
            assemblyline: 'Test',
            machineId: 'WS-001',
            category: '',
            subCategory: '',
            alertShift: 'GS',
            andonAlertCompleted: false,
            andonAcknowledgeCompleted: false,
            andonResolvedCompleted: false,
            andonAlertTimestamp: null,
            andonAcknowledgeTimestamp: null,
            andonResolvedTimestamp: null,
            counter: 0,
            acknowledgeButton: true,
            resolvedButton: true,
            counterDisplay: true,
            andonNewIssueCompleted: false,
            resolution: 'ICA (Interim Containment Action)'
        },
    ];

    login: string = "";
    machineId: string = "";
    ticket: string = "";
    category: string = "";
    sub_category: string = "";
    alert_shift: string = "";
    andon_alerts: string = "";
    andon_acknowledge: string = "";
    andon_resolved: string = "";
    categoryCompleted: boolean = false;
    subCategoryCompleted: boolean = false;
    selectedCategory: string="";

    andonAlertCompleted = false;
    andonAcknowledgeCompleted = false;
    andonResolvedCompleted = false;
    andonAlertTimestamp: Date | null = null;
    andonNewIssueTimestamp: Date | null = null;
    andonNewIssueCompleted: boolean = false;
    andonAcknowledgeTimestamp: Date | null = null;
    andonResolvedTimestamp: Date | null = null;

    acknowledgeButton = false;
    resolvedButton = false;

    counterDisplay = false;
    currentUserRole: string = 'Operator';

    columnDefinitions = [
        { header: '#', field: 'id', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'index' },
        { header: 'Start M/C', field: 'startMC', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'icon' },
        { header: 'Company', field: 'company', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Plant', field: 'location', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Shopfloor', field: 'shopfloor', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Line', field: 'assemblyline', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Workstation', field: 'machineId', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'machineId', options: ['WS-001', 'WS-002', 'WS-003', 'WS-004', 'WS-005'], editableFor: ['Operator'] },
        { header: 'Alert Shift', field: 'alert_shift', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Breakdown Reason', field: 'category', visibleTo: ['Team Leader', 'Acknowledge', 'Resolved'], type: 'category', options: ['Equipment Down', 'Part Unavailable', 'Missing SWS', 'Fit issue', 'Part Damage', 'Safety issue'], editableFor: ['Team Leader'] },
        { header: 'Raise Alert', field: 'raise_alert', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'raiseAlert', buttonAction: 'onNewIssue' },
        { header: 'Andon Alert', field: 'andon_alerts', visibleTo: ['Team Leader', 'Acknowledge', 'Resolved'], type: 'andonAlert', buttonAction: 'onAndonAlert' },
        { header: 'Andon Acknowledge', field: 'andon_acknowledge', visibleTo: ['Acknowledge', 'Resolved'], type: 'button', buttonAction: 'onAndonAcknowledge' },
        { header: 'Resolution', field: 'resolution', visibleTo: ['Resolved'], type: 'resolution', options: ['ICA (Interim Containment Action)', 'PCA (Permanent Corrective Action)'], editableFor: ['Resolved'] },
        { header: 'Andon Resolved', field: 'andon_resolved', visibleTo: ['Resolved'], type: 'button', buttonAction: 'onAndonResolved' },
        { header: 'Total Breakdown', field: 'totalBreakdown', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'counter' },
    ];

    machineIds: string[] = ['WS-001', 'WS-002', 'WS-003', 'WS-004', 'WS-005'];

    // get filteredMachineIds(): string[] {
    //     return this.machineIds.filter(machineId => {
    //         const machine = this.andonList.find(item => item.machineId === machineId);
    //         // If the machine is not present in the andonList or andon_resolved is not null, include it
    //         return !machine || machine.andon_resolved !== null;
    //     });
    // }

    get filteredMachineIds(): string[] {
        return this.machineIds.filter(machineId => {
            const machine = this.andonList.find(item => item.machineId === machineId);
            // If the machine is not present in the andonList or andon_resolved is not null, include it
            const matchesRoute = machineId === `WS-${this.machine.padStart(3, '0')}`;
            return (!machine || machine.andon_resolved !== null) && matchesRoute;
        });
    }

    selectRole(role: string) {
        this.currentUserRole = role;
    }

    isVisible(column: any): boolean {
        return column.visibleTo.includes(this.currentUserRole);
    }

    alertRaiseRow(row: any): boolean {
        return this.currentUserRole === 'Operator';
    }

    isEditable(column: any): boolean {
        return column.editableFor && column.editableFor.includes(this.currentUserRole);
    }

    isoperator(): boolean {
        return this.currentUserRole === 'Operator';
    }

    isTeamLeader(): boolean {
        return this.currentUserRole === 'Team Leader';
    }

    isMaintenance(): boolean {
        return this.currentUserRole === 'Maintenance';
    }

    getFormattedTimestamp(timestamp: Date | null): string {
        if (!timestamp) {
            return '';
        }

        const datePipe = new DatePipe('en-US');
        const formattedTimestamp = datePipe.transform(timestamp, 'dd-MM-yyyy HH:mm');

        return formattedTimestamp || ''; // Ensure it returns an empty string if formattedTimestamp is null
    }

    alertRows: number[] = [];

    rows: any[] = [];
    alertStartTime: Date | null = null;
    timerInterval: any;
    counter: string = '00:00:00';
    timer: any;


    startTimer(row: any) {
        row.timer = null; // Clear any existing timer
        row.timer = setInterval(() => {
            const currentTime = new Date().getTime();
            const startTime = row.alertStartTime?.getTime() || 0;
            const elapsedMilliseconds = currentTime - startTime;
            row.counter = this.formatTotalBreakdownTime(Math.floor(elapsedMilliseconds / 1000));
        }, 1000);
        console.log('Timer started:', row.timer);
    }


    stopTimer(row: any) {
        console.log('Stopping timer for row:', row);
        clearInterval(row.timer);
        console.log('Timer stopped for row:', row);
    }

    addRow() {
        console.log('Adding new row');
        const newRow = {
            id: this.rows.length + 1,
            company: 'Caterpillar',  // You may want to make these dynamic
            plant: 'CHENNAI',          // as well
            shopfloor: 'Workstation',
            assemblyline: 'SSL Main Line',
            machineId: 'WS-001',      // And these
            category: '',

            andonNewIssueCompleted: false,
            andonNewIssueTimestamp: null,
            andonAlertCompleted: false,
            andonAlertTimestamp: null,
            alertStartTime: null,
            acknowledgeButton: false,
            counterDisplay: false,
            andonAcknowledgeCompleted: false,
            andonAcknowledgeTimestamp: null,
            resolvedButton: false,
            andonResolvedCompleted: false,
            andonResolvedTimestamp: null,
            counter: 0,
            subCategory: '',
            alertShift: 'GS',
            resolution: 'ICA (Interim Containment Action)'
        };
        this.rows = [...this.rows, newRow];
    }

    selectedMachineId: string = '';

    RaiseNewIssue(row: any) {
        // Get the current date and time in the browser's timezone
        const now = new Date();

        // Convert the date and time to Indian Standard Time (IST)
        const istTime = new Date(now.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));

        row = {
            company: 'Filtrex',
            location: 'Bangalore',
            shopfloor: `Line ${this.machine}`,
            assemblyline: 'Test',
            machineId: this.selectedMachineId,
            alert_shift: 'GS',
            raise_alert: istTime.toISOString() ,
        }

        this.service.createAndonData(row).subscribe((response: any) => {
            console.log('Andon data created:', response);
            this.getAndonList();
            this.cdr.detectChanges();
        });
    }

    onNewAlert() {
        this.addRow();
    }

    onNewIssue(row: any) {
        row.andonNewIssueTimestamp = new Date();
        row.andonNewIssueCompleted = true;
        // this.addRow();
        row.alertStartTime = new Date();
        this.startTimer(row);

        this.service.patchAndonData(row.id).subscribe((response: any) => {
            console.log('Andon data updated:', response);
            this.getAndonList();
            this.cdr.detectChanges();
        });

        row.counterDisplay = true;

    }

    onAndonAlert(row: any) {
        // row.andonAlertCompleted = true;
        // row.andonAlertTimestamp = new Date();
        // row.acknowledgeButton = true;
        // row.counterDisplay = true;

        // Get the current date and time in the browser's timezone
        const now = new Date();

        // Convert the date and time to Indian Standard Time (IST)
        const istTime = new Date(now.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));

        row = {
            id: row.id,
            andon_alerts: istTime.toISOString(),
        }

        this.service.patchAndonData(row).subscribe((response: any) => {
            console.log('Andon data updated:', response);
            this.getAndonList();
            this.cdr.detectChanges();
        });
    }

    onAndonAcknowledge(row: any) {
        // row.andonAcknowledgeCompleted = true;
        // row.andonAcknowledgeTimestamp = new Date();
        // row.resolvedButton = true;

        // Get the current date and time in the browser's timezone
        const now = new Date();

        // Convert the date and time to Indian Standard Time (IST)
        const istTime = new Date(now.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));

        row = {
            id: row.id,
            andon_acknowledge: istTime.toISOString(),
        }

        this.service.patchAndonData(row).subscribe((response: any) => {
            console.log('Andon data updated:', response);
            this.getAndonList();
            this.cdr.detectChanges();
        });
    }

    onAndonResolved(row: any) {
        // row.andonResolvedCompleted = true;
        // row.andonResolvedTimestamp = new Date();
        // this.stopTimer(row);
        // console.log('Resolving:', row);

        // Get the current date and time in the browser's timezone
        const now = new Date();

        // Convert the date and time to Indian Standard Time (IST)
        const istTime = new Date(now.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));

        row = {
            id: row.id,
            andon_resolved: istTime.toISOString(),
            total_time: this.calculateTimeDifference(row.andon_alerts),
        }

        this.service.patchAndonData(row).subscribe((response: any) => {
            console.log('Andon data updated:', response);
            this.getAndonList();
            this.cdr.detectChanges();
        });

    }

    displayAndonAlert: boolean = false;

    onCategoryChange(selectedValue: any, row: any) {
        // console.log('Category changed:', selectedValue);

        row = {
            id: row.id,
            category: selectedValue,
        }

        this.service.patchAndonData(row).subscribe((response: any) => {
            console.log('Andon data updated:', response);
            this.getAndonList();
            this.displayAndonAlert = true;
            this.cdr.detectChanges();
        });

    }

    onResolutionChange(selectedValue: any, row: any) {
        // console.log('Resolution changed:', selectedValue);

        row = {
            id: row.id,
            resolution: selectedValue,
        }

        this.service.patchAndonData(row).subscribe((response: any) => {
            console.log('Andon data updated:', response);
            this.getAndonList();
            this.cdr.detectChanges();
        });
    }

    formatTotalBreakdownTime(time: number): string {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        return formattedTime;
    }

    padZero(num: number): string {
        return num.toString().padStart(2, '0');
    }

    calculateTimeDifference(raiseAlerts: string | Date): string {
        if (!raiseAlerts) return 'N/A';

        const raiseTime = new Date(raiseAlerts);
        const currentTime = new Date();
        const diffInMs = currentTime.getTime() - raiseTime.getTime();

        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

        // Pad hours, minutes, and seconds with leading zeros
        const paddedHours = String(hours).padStart(2, '0');
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');

        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }

    filtrixList: any[] = [];
    filtrix2List: any[] = [];

    getFiltrixList() {
        this.service.getFiltrixList().subscribe({
            next: (data: any) => {
                this.filtrixList = data;
            },
            error: (error: any) => {
                console.error('Error fetching Filtrix data:', error);
            }
        });
    }

    getFiltrix2List() {
        this.service.getFiltrix2List().subscribe({
            next: (data: any) => {
                this.filtrix2List = data;
            },
            error: (error: any) => {
                console.error('Error fetching Filtrix2 data:', error);
            }
        });
    }

    product_code: string = '';
    serial_no: string = '';

    checkIfSame(): boolean {
        return this.product_code != null && this.product_code !== '' && this.serial_no != null && this.serial_no !== '' && this.product_code === this.serial_no;
    }

    postFiltrix() {
        if (!this.product_code && !this.serial_no) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Both Master Production Card and SKU No. fields are empty.'
            });
            return;
        } else if (!this.product_code) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Master Production Card field is required.'
            });
            return;
        } else if (!this.serial_no) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'SKU No. field is required.'
            });
            return;
        }
        const param = {
            product_code: this.product_code,
            sku_code: this.serial_no,
            actual: '00:00:06',
            cycle_time: '00:00:07',
        };
        this.service.postFiltrix(param).subscribe({
            next: (data: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Data posted successfully.'
                });


                this.getFiltrixList();
                this.getFiltrix2List();
                this.cdr.detectChanges();
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to add data.'
                });
                console.error('Error posting Filtrix data:', error);
            }
        });

    }

    //Production Transaction
    shopfloorStatus: any[] = [];

    generateShopfloorStatusData(): void {
        this.shopfloorStatus = [];
        let currentTime = 8;

        for (let i = 1; i <= 10; i++) {
          const startHour = String(currentTime).padStart(2, '0');
          const endHour = String(currentTime + 1).padStart(2, '0');
          const shiftTimeRange = `${startHour}:00 - ${endHour}:00`;

          this.shopfloorStatus.push({
            serialNo: i,
            time_range: shiftTimeRange,
            on_time: this.randomDuration(10, 59),   // HH:MM format
            idle_time: this.randomDuration(0, 10),
            breakdown_time: this.randomDuration(0, 5),
            production_count: this.randomInt(80, 120),
            actual: this.randomInt(60, 100),
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5),
            sauld: `${this.randomInt(90, 100)}%`
          });

          currentTime++;
          if (currentTime > 17) currentTime = 8;
        }
    }

    randomDuration(min: number, max: number): string {
        const minutes = this.randomInt(min, max);
        const hh = String(Math.floor(minutes / 60)).padStart(2, '0');
        const mm = String(minutes % 60).padStart(2, '0');
        return `${hh}:${mm}`;
    }

    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomPercentage(): string {
        return `${this.randomInt(85, 100)}%`;
    }

    // Analysis Section

    barData3: any;
    barOptions3: any;
    barData2: any;
    barOptions2: any;
    barData4: any;
    barOptions4: any;
    data3: any;
    options3: any;
    running: number = 0;
    idle: number = 0;
    breaktime: number = 0;

    productionChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData3 = {
            labels: [''],
            datasets: [
                {
                    label: 'Production Count',
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    data: [34]
                },
                {
                    label: 'Production Target',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [56]
                }
            ]
        };

        this.barOptions3 = {
            maintainAspectRatio: false,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            },
            barPercentage: 0.7,
        };
    }

    bar2Chart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        this.barData2 = {
            labels: ['Running', 'Idle', 'Break Time'],
            datasets: [
                {
                    data: [45, 23, 45],
                    backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--yellow-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--yellow-400')]
                }
            ]
        };


        this.barOptions2 = {
            cutout: '70%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            radius: '60%'
        };
    }

    bar4Chart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData4 = {
            labels: [''],
            datasets: [
            {
                label: 'Equipment Down',
                backgroundColor: documentStyle.getPropertyValue('--red-400'),
                borderColor: documentStyle.getPropertyValue('--red-400'),
                data: [48]
            },
            {
                label: 'Part Unavailable',
                backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                borderColor: documentStyle.getPropertyValue('--indigo-400'),
                data: [18]
            },
            {
                label: 'Missing SWS',
                backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                borderColor: documentStyle.getPropertyValue('--teal-400'),
                data: [25]
            },
            {
                label: 'Fit Issue',
                backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                borderColor: documentStyle.getPropertyValue('--purple-400'),
                data: [33]
            },
            {
                label: 'Part Damage',
                backgroundColor: documentStyle.getPropertyValue('--orange-400'),
                borderColor: documentStyle.getPropertyValue('--orange-400'),
                data: [33]
            },
            {
                label: 'Safety Issue',
                backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                borderColor: documentStyle.getPropertyValue('--teal-400'),
                data: [25]
            }
        ]
    };

        this.barOptions4 = {
            maintainAspectRatio: false,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        // color: textColor,
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            },
            barPercentage: 0.7,
        };
    }

    qualityChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data3 = {
            labels: ['Accept', 'Rework', 'Reject'],
            datasets: [
                {
                    data: [54, 32, 37],
                    backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--red-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--red-400')]
                }
            ]
        };

        this.options3 = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            },
            radius: '60%'
        };
    }

    getStatusClass(oee: number): string {
        if (oee > 90) {
            return 'status-good';
        } else if (oee < 80) {
            return 'status-bad';
        } else {
            return 'status-ok';
        }
    }

    ngOnDestroy() {
        // clearInterval(this.refreshInterval);
        this.subscription.unsubscribe();
    }

}
