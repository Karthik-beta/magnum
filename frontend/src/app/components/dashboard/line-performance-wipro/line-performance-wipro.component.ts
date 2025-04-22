import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface TableDataItem {
    serialNo: number;
    lotNo: string;
    productCode: string;
    start: string;
    end: string;
    pickup: string;
    workstation: string;
    dropoff: string;
    actual: string;
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
  selector: 'app-line-performance-wipro',
  templateUrl: './line-performance-wipro.component.html',
  styleUrls: ['./line-performance-wipro.component.scss']
})
export class LinePerformanceWiproComponent implements OnInit {

    tableData: TableDataItem[] = [];
    staticRowData: any = {};
    loading: boolean = false;
    totalRecords: number = 1000;

    lotNo: string='';
    productCode: string='';
    search: string='';

    workstationId: string = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.timeFunction();
        this.route.paramMap.subscribe(params => {
            this.workstationId = params.get('id') || '';
        });

        // Andon Breakdown Section
        this.rows = [...this.dummyList];

        // Analysis Section
        this.productionChart();
        this.bar2Chart();
        this.bar4Chart();
        this.qualityChart();
        this.generateSampleData();
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
            pickup: this.randomDateTime(), // Random pickup time
            workstation: this.randomDateTime(),
            dropoff: this.randomDateTime(), // Random dropoff time
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

    randomDateTime(): string {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 1); // Generate a date within the next 24 hours
        const randomTime = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

        // Format the date-time as "yyyy-MM-dd HH:mm"
        const year = randomTime.getFullYear();
        const month = String(randomTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const date = String(randomTime.getDate()).padStart(2, '0');
        const hours = String(randomTime.getHours()).padStart(2, '0');
        const minutes = String(randomTime.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${date} ${hours}:${minutes}`;
    }

      dummyStaticRow = [
        {
            shift: "08:00 - 09:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            performance: 76.8,
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "09:00 - 10:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            performance: 6.8,
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "10:00 - 11:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            performance: 76.8,
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "11:00 - 12:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            // performance: 76.8,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "12:00 - 01:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "01:00 - 02:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "02:00 - 03:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "03:00 - 04:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "04:00 - 05:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
            actual: 25,
            performance: this.randomInt(0, 100),
            gap: this.randomInt(-5, 5)
        },
        {
            shift: "05:00 - 06:00",
            mcOn: "00:60",
            mcIdle : "00:00",
            plan: 22,
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
            company: 'Caterpillar',
            plant: 'CHENNAI',
            shopfloor: 'Workstation',
            assemblyline: 'SSL Main Line',
            machineId: 'WS-001',
            category: 'Equipment Down',
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
        { header: 'Plant', field: 'plant', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Shopfloor', field: 'shopfloor', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Line', field: 'assemblyline', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Workstation', field: 'machineId', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'machineId', options: ['WS-001', 'WS-002', 'WS-003', 'WS-004', 'WS-005'], editableFor: ['Operator'] },
        { header: 'Alert Shift', field: 'alertShift', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'text' },
        { header: 'Breakdown Reason', field: 'category', visibleTo: ['Team Leader', 'Acknowledge', 'Resolved'], type: 'category', options: ['Equipment Down', 'Part Unavailable', 'Missing SWS', 'Fit issue', 'Part Damage', 'Safety issue'], editableFor: ['Team Leader'] },
        { header: 'Raise Alert', field: 'raiseAlert', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'raiseAlert', buttonAction: 'onNewIssue' },
        { header: 'Andon Alert', field: 'andonAlert', visibleTo: ['Team Leader', 'Acknowledge', 'Resolved'], type: 'andonAlert', buttonAction: 'onAndonAlert' },
        { header: 'Andon Acknowledge', field: 'andonAcknowledge', visibleTo: ['Acknowledge', 'Resolved'], type: 'button', buttonAction: 'onAndonAcknowledge' },
        { header: 'Andon Resolved', field: 'andonResolved', visibleTo: ['Resolved'], type: 'button', buttonAction: 'onAndonResolved' },
        { header: 'Resolution', field: 'resolution', visibleTo: ['Resolved'], type: 'resolution', options: ['ICA (Interim Containment Action)', 'PCA (Permanent Corrective Action)'], editableFor: ['Resolved'] },
        { header: 'Total Breakdown', field: 'totalBreakdown', visibleTo: ['Operator', 'Team Leader', 'Acknowledge', 'Resolved'], type: 'counter' },
    ];

    selectRole(role: string) {
        this.currentUserRole = role;
    }

    isVisible(column: any): boolean {
        return column.visibleTo.includes(this.currentUserRole);
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

    lines: any[] = [
        { id: 1, name: 'SSL Workstation' },
    ]

    workstations: any[] = [
        { id: 1, name: 'Workstation-001' },
        { id: 2, name: 'Workstation-002' },
        { id: 3, name: 'Workstation-003' },
        { id: 4, name: 'Workstation-004' },
        { id: 5, name: 'Workstation-005' },
    ]

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
            category: 'RESETTING',

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

    onNewAlert() {
        this.addRow();
    }

    onNewIssue(row: any) {
        row.andonNewIssueTimestamp = new Date();
        row.andonNewIssueCompleted = true;
        // this.addRow();
        row.alertStartTime = new Date();
        this.startTimer(row);
    }

    onAndonAlert(row: any) {
        row.andonAlertCompleted = true;
        row.andonAlertTimestamp = new Date();
        // row.alertStartTime = new Date();
        // this.startTimer(row);
        // this.startTimer(); // You might need to modify this to work with multiple rows
        row.acknowledgeButton = true;
        row.counterDisplay = true;
        // this.onNewAlert();
    }

    onAndonAcknowledge(row: any) {
        row.andonAcknowledgeCompleted = true;
        row.andonAcknowledgeTimestamp = new Date();
        row.resolvedButton = true;
    }

    onAndonResolved(row: any) {
        row.andonResolvedCompleted = true;
        row.andonResolvedTimestamp = new Date();
        this.stopTimer(row);
        console.log('Resolving:', row);
        // this.stopTimer(); // You might need to modify this to work with multiple rows
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
