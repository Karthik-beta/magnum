import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Observable, interval, Subscription } from 'rxjs';
import { map, switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss']
})
export class MachineDetailsComponent implements OnInit {


    constructor(private service:SharedService, private cdr: ChangeDetectorRef) { }


    activityValues: number[] = [0, 100];

    machineWiseDataList: any[] = [];

    machine1List: any[] = [];

    machineList = [
        {
            plant: 'Puducherry',
            shopfloor: 'ORT Shopfloor',
            assemblyline: 'Line 1 Spindle Production',
            machine_id: 'MC - 1',
            start_prod: '2025-01-11, 08 - 20 (11)',
            end_prod: '2023-03-31, 08 - 20 (6.0)',
            state: 'ACTIVE',
            activity: 0
        },
        // {
        //     plant: 'Puducherry',
        //     shopfloor: 'Metal Shop',
        //     assemblyline: 'PB Walkway Line 2',
        //     machine_id: 'MC - 2',
        //     start_prod: '2024-01-11, 08 - 20 (11)',
        //     end_prod: '2024-03-09, 08 - 20 (6.0)',
        //     state: 'ACTIVE',
        //     activity: 0
        // },
        // {
        //     plant: 'Puducherry',
        //     shopfloor: 'Metal Shop',
        //     assemblyline: 'PB Walkway Line 2',
        //     machine_id: 'MC - 3',
        //     start_prod: '2024-01-11, 08 - 20 (11)',
        //     end_prod: '2024-03-09, 08 - 20 (6.0)',
        //     state: 'ACTIVE',
        //     activity: 0
        // },
        // {
        //     plant: 'Puducherry',
        //     shopfloor: 'Metal Shop',
        //     assemblyline: 'PB Walkway Line 2',
        //     machine_id: 'MC - 4',
        //     start_prod: '2024-01-11, 08 - 20 (11)',
        //     end_prod: '2024-03-09, 08 - 20 (6.0)',
        //     state: 'ACTIVE',
        //     activity: 0
        // },

        // {
        //     plant: 'Puducherry',
        //     shopfloor: 'Metal Shop',
        //     assemblyline: 'PB Walkway Line 2',
        //     machine_id: 'MC - 5',
        //     start_prod: '2024-01-11, 08 - 20 (11)',
        //     end_prod: '2024-03-09, 08 - 20 (6.0)',
        //     state: 'ACTIVE',
        //     activity: 0
        // },
    ]

    private refreshInterval: any;

    ngOnInit(): void {
        this.refreshProdPlanList();
        this.getMachineStatus();
        this.loadMachineWiseData();

        this.timeFunction();
        this.getMachineDetails();

        // Set up automatic refresh every minute (60000 milliseconds)
        this.refreshInterval = setInterval(() => {
            this.refreshData();
        }, 30000);
    }

    private refreshData(): void {
        this.refreshProdPlanList();
        this.getMachineStatus();
        this.loadMachineWiseData();
        this.getMachineDetails();
    }

    lineMachineList: any[] = [];
    assignedStartDate: string = '';
    expectedEndDate: string = '';


    rows: number = 10;
    currentPage: number = 1;
    totalRecords: number = 0;
    text: string = '';
    results: any[] = [];
    rowsPerPageOptions: number[] = [10, 20, 30];
    loading: boolean = false;

    refreshProdPlanList(){
        this.loading = true;

        const params = {
          page: this.currentPage.toString(),
          page_size: this.rows.toString()
        };

        this.service.getLineMachineConfig(params).subscribe((data: any) => {
          this.lineMachineList = data.results; // Assuming your API response has a 'results' property
          this.assignedStartDate = data.results[0].assigned_start_production;
            this.expectedEndDate = data.results[0].assigned_end_production;
        });
    }

    private subscription: Subscription;

    private machineStatusSubscription: Subscription;

    status: string="No Response";
    averagePerformance: number = 0;

    getStatusClass(status: string): string {
        // Logic to handle 'No Response' and other statuses
        if (status === 'No Response') {
            return 'NoResponse';
        }
        // Add other conditions as needed
        if (status === 'Active') {
            return 'Active';
        }
        if (status === 'Idle') {
            return 'Idle';
        }

        return status; // Default behavior if no match
    }

    getMachineStatus() {
        // Use startWith to trigger an initial HTTP request
        this.machineStatusSubscription = interval(10000).pipe(
          startWith(0), // emit 0 immediately
          // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
          switchMap(() => this.service.getProductionAndon()),
          // Use distinctUntilChanged to filter out repeated values
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        ).subscribe((data: any) => {
        //   this.status = data.map(item => item.r);
        this.status = data.map(item => {
            if (item.r === 'R') {
              return 'Active';
            } else if (item.r === 'I') {
              return 'Idle';
            } else {
              return item.r;
            }
          });
        //   console.log("String",this.status);
        });
    }

    private MachineListSubscription: Subscription;

    loadMachineWiseData() {
        // Use startWith to trigger an initial HTTP request
        this.MachineListSubscription = interval(10000).pipe(
          startWith(0), // emit 0 immediately
          // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
          switchMap(() => this.service.getMachineWiseData()),
          // Use distinctUntilChanged to filter out repeated values
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        ).subscribe((data: any) => {
          this.machineWiseDataList = data;
        //   this.calculateAveragePerformance(); // Call the function to update averagePerformance

          console.log("List",this.machineWiseDataList);
        //   console.log("List",this.AssemblyLineList);
        });
      }

    // calculateAveragePerformance(): void {
    //     const performances = this.machineWiseDataList.map(item => item.performance);

    //     if (performances.length > 0) {
    //       const totalPerformance = performances.reduce((sum, performance) => sum + performance, 0);
    //       this.averagePerformance = parseFloat((totalPerformance / performances.length).toFixed(1));
    //     //   console.log("Average Performance",this.averagePerformance);
    //     } else {
    //       console.error("No performance data available.");
    //       this.averagePerformance = 0; // or any default value
    //     }
    // }


    ngOnDestroy() {
      // Unsubscribe from the observable to avoid memory leaks
    //   this.subscription.unsubscribe();
    if (this.subscription) {
        this.subscription.unsubscribe();
    }

    // Unsubscribe from the interval observable
    if (this.MachineListSubscription) {
        this.MachineListSubscription.unsubscribe();
    }


      // Unsubscribe from the interval observable
      if (this.machineStatusSubscription) {
          this.machineStatusSubscription.unsubscribe();
      }

      this.timesubscription.unsubscribe();
    }

    singleMachineList = [
        {
            plant: 'Puducherry',
            shopfloor: 'ORT Shopfloor',
            assemblyline: 'Line 1 Spindle Production',
            machine_id: 'ORT',
            start_prod: '2025-01-11, 08 - 20 (11)',
            end_prod: '2025-03-31, 08 - 20 (6.0)',
            state: 'ACTIVE',
            currentShift: 'Shift GS, 08:00 - 06:00',
            totalOnTime: '03:00',
            totalIdleTime: '01:00',
            totalGapNumber: 2,
            totalActual: 100,
            totalTarget: 98,
            averagePerformance: 78,
            activity: 78
        },
        {
            plant: 'Puducherry',
            shopfloor: 'ORT Shopfloor',
            assemblyline: 'Line 1 Spindle Production',
            machine_id: 'MS',
            start_prod: '2025-01-11, 08 - 20 (11)',
            end_prod: '2025-03-31, 08 - 20 (6.0)',
            state: 'ACTIVE',
            currentShift: 'Shift GS, 08:00 - 06:00',
            totalOnTime: '03:00',
            totalIdleTime: '01:00',
            totalGapNumber: -2,
            totalActual: 100,
            totalTarget: 102,
            averagePerformance: 78,
            activity: 78
        },
        {
            plant: 'Puducherry',
            shopfloor: 'ORT Shopfloor',
            assemblyline: 'Line 1 Spindle Production',
            machine_id: 'SW',
            start_prod: '2025-01-11, 08 - 20 (11)',
            end_prod: '2025-03-31, 08 - 20 (6.0)',
            state: 'ACTIVE',
            currentShift: 'Shift GS, 08:00 - 06:00',
            totalOnTime: '03:00',
            totalIdleTime: '01:00',
            totalGapNumber: 0,
            totalActual: 100,
            totalTarget: 100,
            averagePerformance: 78,
            activity: 78
        },
        {
            plant: 'Puducherry',
            shopfloor: 'ORT Shopfloor',
            assemblyline: 'Line 1 Spindle Production',
            machine_id: 'UT',
            start_prod: '2025-01-11, 08 - 20 (11)',
            end_prod: '2025-03-31, 08 - 20 (6.0)',
            state: 'ACTIVE',
            currentShift: 'Shift GS, 08:00 - 06:00',
            totalOnTime: '03:00',
            totalIdleTime: '01:00',
            totalGapNumber: 2,
            totalActual: 100,
            totalTarget: 98,
            averagePerformance: 78,
            activity: 78
        },
        {
            plant: 'Puducherry',
            shopfloor: 'ORT Shopfloor',
            assemblyline: 'Line 1 Spindle Production',
            machine_id: 'KTT',
            start_prod: '2025-01-11, 08 - 20 (11)',
            end_prod: '2025-03-31, 08 - 20 (6.0)',
            state: 'ACTIVE',
            currentShift: 'Shift GS, 08:00 - 06:00',
            totalOnTime: '03:00',
            totalIdleTime: '01:00',
            totalGapNumber: 2,
            totalActual: 100,
            totalTarget: 98,
            averagePerformance: 78,
            activity: 78
        },
    ]

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

    totalGapNumber: number = 0;
    totalOnTime: number = 0;
    totalIdleTime: number = 0;
    totalActual: number = 0;
    totalTarget: number = 0;

    // calculateTotalGap(): void {
    //     const gaps = this.machineWiseDataList.map(item => item.gap);

    //     // Create a function to add all the gap values from above
    //     const totalGap = gaps.reduce((sum, gap) => sum + gap, 0);
    //     this.totalGapNumber = totalGap;
    //     // console.log("Total Gap",totalGap);

    // }

    // calculateTotalOnTime(): void {
    //     const gaps = this.machineWiseDataList.map(item => item.on_time);

    //     // Create a function to add all the gap values from above
    //     const totalOnTime = gaps.reduce((sum, on_time) => sum + on_time, 0);
    //     this.totalOnTime = Math.round(totalOnTime);

    // }

    // calculateTotalIdleTime(): void {
    //     const gaps = this.machineWiseDataList.map(item => item.idle_time);

    //     // Create a function to add all the gap values from above
    //     const totalIdleTime = gaps.reduce((sum, idle_time) => sum + idle_time, 0);
    //     // this.totalIdleTime = totalIdleTime;
    //     // Round off the total idle time to up to two decimal places
    //     this.totalIdleTime = parseFloat(totalIdleTime.toFixed(2));

    // }

    // calculateActual(): void {
    //     const gaps = this.machineWiseDataList.map(item => item.actual);

    //     // Create a function to add all the gap values from above
    //     const totalActual = gaps.reduce((sum, actual) => sum + actual, 0);
    //     this.totalActual = totalActual;

    // }

    // calculateTarget(): void {
    //     const gaps = this.machineWiseDataList.map(item => item.target);

    //     // Create a function to add all the gap values from above
    //     const totalTarget = gaps.reduce((sum, target) => sum + target, 0);
    //     this.totalTarget = totalTarget;

    // }

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

    currentDate$: Observable<Date>;
    private timesubscription: Subscription;

    // Declare the currentDate property to hold the current date
    currentDate: Date;

    timeFunction() {
        // Create an observable that emits the current date every second
      this.currentDate$ = interval(1000).pipe(
        // Use the map operator to transform the emitted value to the current date
        map(() => new Date())
      );

      // Subscribe to the observable and update the current date property
      this.timesubscription = this.currentDate$.subscribe(date => {
        this.currentDate = date;
      });
    }

    // getMachineDetails() {

    //     this.service.getAllMachineDetails().subscribe((data: any) => {
    //         this.machine1List = data;
    //         this.totalOnTime = this.machine1List[0].total_on_time;
    //         this.totalIdleTime = this.machine1List[0].total_idle_time;
    //         this.totalActual = this.machine1List[0].production_count;
    //         this.totalTarget = this.machine1List[0].production_target;
    //     });

    //     this.totalGapNumber = this.totalActual - this.totalTarget;

    //     this.averagePerformance = (this.totalActual / this.totalTarget) * 100;

    // }

    getMachineDetails() {
        this.service.getAllMachineDetails().subscribe(
            (data: any) => {
                this.machine1List = data;
                this.totalOnTime = this.machine1List[0].total_on_time;
                this.totalIdleTime = this.machine1List[0].total_idle_time;
                this.totalActual = this.machine1List[0].production_count;
                this.totalTarget = this.machine1List[0].production_target;

                // Perform calculations after data is fetched
                this.totalGapNumber = this.totalActual - this.totalTarget;
                this.averagePerformance = this.totalTarget !== 0 ? (this.totalActual / this.totalTarget) * 100 : 0;
            },
            (error) => {
                console.error('Error fetching machine details:', error);
                // Handle error (e.g., show a message to the user)
            }
        );
    }

}
