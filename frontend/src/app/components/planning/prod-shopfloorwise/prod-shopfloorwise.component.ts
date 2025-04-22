import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/shared.service';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-prod-shopfloorwise',
  templateUrl: './prod-shopfloorwise.component.html',
  styleUrls: ['./prod-shopfloorwise.component.scss']
})
export class ProdShopfloorwiseComponent implements OnInit {

    constructor(private service:SharedService) {}


    rows: number = 10;
    currentPage: number = 1;
    totalRecords: number = 0;
    text: string = '';
    results: any[] = [];
    rowsPerPageOptions: number[] = [10, 20, 30];

    AssemblylineWiseData: any[] = [];
    shopfloorStatus: any[] = [];
    items: MenuItem[] = [];

    stagesArray: any[] = [];
    display: boolean = false;

    exportDisplay: boolean = false;


    loading: boolean = false;

    plant: any;
    shopfloor: any;
    assembly_line: any;
    machine_id: any;
    barChart: any;

    barOptions: any;


    stateOptions: any[] = [
        { label: 'Show', value: 'true' },
        { label: 'Hide', value: 'false' }
    ];

    AssemblylineWiseDataStatic = [
        {
            plant: "Puducherry",
            shopfloor: "ORT Shopfloor",
            assemblyline: "Line 1 Spindle Production",
        }
    ]

    showElements: string = 'false';

    private refreshInterval: any;

    ngOnInit(): void {
        this.initCharts();
        this.loadAssemblyLineWiseData();
        this.loadShopfloorStatus();

        this.timeFunction();

        // Set up automatic refresh every minute (60000 milliseconds)
        this.refreshInterval = setInterval(() => {
            this.refreshData();
        }, 60000);

        this.plant = [
            { name: 'CHENNAI' },
          ],
          this.shopfloor = [
            { name: 'XYZ' },
          ],
          this.assembly_line = [
            { name: 'TSE' },
          ],
          this.machine_id= [
            { name: 'TSE-001' },
            { name: 'TSE-002' },
            { name: 'TSE-003' },
          ]

        this.items = [
            { label: 'Import', icon: 'fas fa-file-import' },
            { label: 'Export', icon: 'fas fa-download', command: () => this.exportDisplay = true },
        ];

    }

    private refreshData(): void {
        // this.loadAssemblyLineWiseData();
        this.loadShopfloorStatus();
    }

    dummyList: any[] = [
        {
            plant: 'Chennai',
            shopfloor: 'Shopfloor - 1',
            assembly_line: 'Assemblyline - 1',
            sub_assemblyline: 'BL-3-A',
            product_id: 'AQUA 1000ml',
            date: '',
            mc_on_hours: 1320,
            mc_idle_hours: 0,
            actual: 0,
            target: 1440,
            performance: 100,
        },
        // {
        //     plant: 'CHENNAI',
        //     shopfloor: 'XYZ',
        //     assembly_line: 'TSE',
        //     machine_id: 'TSE-002',
        //     product_id: 'CASSEROLES',
        //     date: '01-10-2023',
        //     mc_on_hours: 1440,
        //     mc_idle_hours: 0,
        //     actual: 1354,
        //     target: 1440,
        //     performance: 94,
        // },
        // {
        //     plant: 'CHENNAI',
        //     shopfloor: 'XYZ',
        //     assembly_line: 'TSE',
        //     machine_id: 'TSE-003',
        //     product_id: 'CASSEROLES',
        //     date: '01-10-2023',
        //     mc_on_hours: 1400,
        //     mc_idle_hours: 76,
        //     actual: 1324,
        //     target: 1440,
        //     performance: 86,
        // }
    ];

    // getBackgroundColorStyle(performance: number): any {
    //     let backgroundColor = '';

    //     if (performance > 90) {
    //       backgroundColor = 'green';
    //     } else if (performance >= 80 && performance <= 90) {
    //       backgroundColor = 'yellow';
    //     } else if (performance < 80) {
    //       backgroundColor = 'red';
    //     }

    //     return {'background-color': backgroundColor };
    //   }

    getBackgroundColorStyle(performance: number): any {
        let backgroundColor = '';

        if (performance > 90) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), green)';
        } else if (performance >= 80 && performance <= 90) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), yellow)';
        } else if (performance < 80) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), red)';
        }

        return { 'background': backgroundColor };
      }



      initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barChart = {
            labels: [''],
            datasets: [
                {
                    label: 'Running',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [65]
                },
                {
                    label: 'Breakdown',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [35]
                }
            ]
        };

        this.barOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 3.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
                    },
                datalabels: {
                    display: true,
                    color: textColor
                }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }


    id: any;
    product_id: any;
    date_production: any;
    totalOnTime: any;
    totalIdleTime: any;
    totalBreakdownTime: any;
    totalProductionCount: any;


    loadAssemblyLineWiseData() {
        this.service.getAssemblyLineWiseData().subscribe(data=>{
        this.AssemblylineWiseData=data;

        // Individual
        this.id = this.AssemblylineWiseData[0].id;
        this.plant = this.AssemblylineWiseData[0].plant;
        this.shopfloor = this.AssemblylineWiseData[0].shopfloor;
        this.assembly_line = this.AssemblylineWiseData[0].assembly_line;
        this.machine_id = this.AssemblylineWiseData[0].machine_id;
        this.product_id = this.AssemblylineWiseData[0].product_id;
        this.date_production = this.AssemblylineWiseData[0].date_production;
      });
    }

    loadShopfloorStatus() {
        this.service.getShopfloorStatus().subscribe(data=>{
        this.shopfloorStatus=data;

        this.calculateTotalOnTime();
        this.calculateIdleTime();
        this.calculateBreakdownTime();
        this.calculateTotalProduction();
      });
    }

    // calculateTotalOnTime(): void {
    //     let totalSeconds = 0;

    //     // Convert each on_time to seconds and sum
    //     this.shopfloorStatus.forEach(item => {
    //         const timeString = item.on_time;
    //         if (timeString) {
    //             const [hours, minutes, seconds] = timeString.split(':').map(Number);
    //             totalSeconds += (hours * 3600) + (minutes * 60) + seconds;
    //         }
    //     });

    //     // Convert total seconds back to HH:mm:ss format
    //     const hours = Math.floor(totalSeconds / 3600);
    //     const minutes = Math.floor((totalSeconds % 3600) / 60);
    //     const seconds = totalSeconds % 60;

    //     this.totalOnTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    // }

    calculateTotalOnTime(): void {
        let totalSeconds = 0;

        // Convert each on_time to seconds and sum
        this.shopfloorStatus.forEach(item => {
            const timeString = item.on_time;
            if (timeString) {
                const [hours, minutes] = timeString.split(':').map(Number);
                totalSeconds += (hours * 3600) + (minutes * 60);
            }
        });

        // Round off total seconds to the nearest minute
        let totalMinutes = Math.round(totalSeconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        this.totalOnTime = `${this.padZero(hours)}:${this.padZero(minutes)}`;
    }


    // calculateIdleTime(): void {
    //     let totalSeconds = 0;

    //     // Convert each idle_time to seconds and sum
    //     this.shopfloorStatus.forEach(item => {
    //         const timeString = item.idle_time;
    //         if (timeString) {
    //             const [hours, minutes, seconds] = timeString.split(':').map(Number);
    //             totalSeconds += (hours * 3600) + (minutes * 60) + seconds;
    //         }
    //     });

    //     // Convert total seconds back to HH:mm:ss format
    //     const hours = Math.floor(totalSeconds / 3600);
    //     const minutes = Math.floor((totalSeconds % 3600) / 60);
    //     const seconds = totalSeconds % 60;

    //     this.totalIdleTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    // }

    calculateIdleTime(): void {
        let totalSeconds = 0;

        // Convert each idle_time to seconds and sum
        this.shopfloorStatus.forEach(item => {
            const timeString = item.idle_time;
            if (timeString) {
                const [hours, minutes] = timeString.split(':').map(Number);
                totalSeconds += (hours * 3600) + (minutes * 60) ;
            }
        });

        // Round off total seconds to the nearest minute
        let totalMinutes = Math.round(totalSeconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        this.totalIdleTime = `${this.padZero(hours)}:${this.padZero(minutes)}`;
    }


    private padZero(num: number): string {
        return num.toString().padStart(2, '0');
    }

    // calculateBreakdownTime(): void {
    //     let totalSeconds = 0

    //     // Convert each breakdown_time to seconds and sum
    //     this.shopfloorStatus.forEach(item => {
    //         const timeString = item.breakdown_time;
    //         if (timeString) {
    //             const [hours, minutes, seconds] = timeString.split(':').map(Number);
    //             totalSeconds += (hours * 3600) + (minutes * 60) + seconds;
    //         }
    //     });

    //     // Convert total seconds back to HH:mm:ss format
    //     const hours = Math.floor(totalSeconds / 3600);
    //     const minutes = Math.floor((totalSeconds % 3600) / 60);
    //     const seconds = totalSeconds % 60;

    //     this.totalBreakdownTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    // }

    calculateBreakdownTime(): void {
        let totalSeconds = 0;

        // Convert each breakdown_time to seconds and sum
        this.shopfloorStatus.forEach(item => {
            const timeString = item.breakdown_time;
            if (timeString) {
                const [hours, minutes] = timeString.split(':').map(Number);
                totalSeconds += (hours * 3600) + (minutes * 60);
            }
        });

        // Round off total seconds to the nearest minute
        let totalMinutes = Math.round(totalSeconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        this.totalBreakdownTime = `${this.padZero(hours)}:${this.padZero(minutes)}`;
    }


    calculateTotalProduction(): void {
        this.totalProductionCount = this.shopfloorStatus.reduce((total, item) => {
            // Convert to number to ensure proper addition and handle potential null/undefined
            const count = Number(item.production_count) || 0;
            return total + count;
        }, 0);
    }


    getShift(): string {
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();
        const currentMinute = currentDateTime.getMinutes();
        const currentTime = currentHour + (currentMinute / 60); // Convert to decimal for easier comparison

        // Define shift boundaries
        if (currentTime >= 6.5 && currentTime < 14.5) {
            return 'Shift A, 06:30 - 14:30';
        } else if (currentTime >= 14.5 && currentTime < 22.5) {
            return 'Shift B, 14:30 - 22:30';
        } else {
            return 'Shift C, 22:30 - 06:30';
        }
    }

    currentShift = this.getShift();


    editClick(item: any) {
        this.display = true;
        console.log("item data", item);
    }

    selectedDate: Date;


    exportExcel(): void {
        const currentDate = new Date();
        const shiftHour = currentDate.getHours();

        // Determine shift period
        let shiftPeriod = "FS";
        if (shiftHour >= 14 && shiftHour < 22) {
          shiftPeriod = "SS";
        } else if (shiftHour >= 22 || shiftHour < 6) {
          shiftPeriod = "NS";
        }

        // Format date for filename
        const dateStr = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        const filename = `Shift_Report_${shiftPeriod}_${dateStr}.xlsx`;
        const dateStrFormatted = currentDate.toISOString().split('T')[0];
        if (typeof this.selectedDate === 'string') {
            this.selectedDate = new Date(this.selectedDate);
        }

        if (this.selectedDate instanceof Date && !isNaN(this.selectedDate.getTime())) {
            const isoString = this.selectedDate.toISOString();
            console.log('Formatted ISO String:', isoString);
            // Continue with your export logic
        } else {
            console.error('Invalid date:', this.selectedDate);
        }
        const formattedDate = this.selectedDate.toISOString().split('T')[0];

        const params = {
            'date': formattedDate,
        }

        this.service.downloadShopfloorStatus(params).subscribe((response: any) => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
        });

        this.exportDisplay = false;
    }



    mc_on_hours: number=0;
    mc_idle_hours: number=0;
    actual: number=0;
    target: number=0;
    performance: number=0;
    gap: number=0;
    kWh: number=0;


    currentDate$: Observable<Date>;
    private subscription: Subscription;

    // Declare the currentDate property to hold the current date
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

    ngOnDestroy() {
        // Unsubscribe from the observable to avoid memory leaks
        this.subscription.unsubscribe();
    }


}
