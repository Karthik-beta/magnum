import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { map, switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-solo-shopfloor',
  templateUrl: './solo-shopfloor.component.html',
  styleUrls: ['./solo-shopfloor.component.scss']
})
export class SoloShopfloorComponent implements OnInit{

    constructor(private service:SharedService, private messageService: MessageService) {}

    AssemblyLineList:any=[];

    AssemblylineWiseData: any[] = [];

    machineWiseDataList: any[] = [];


    ActivateAddEditProductionMachineComp:boolean=false;
    prodassembly:any;

    display: boolean = false;

    barChart: any;

    barOptions: any;

    bar2Chart: any;

    bar2Options: any;

    stateOptions: any[] = [
        { label: 'Show', value: 'true' },
        { label: 'Hide', value: 'false' }
    ];

    showElements: string = 'false';

    ngOnInit(): void {
        this.getSoloAssemblyLineList();
        this.initCharts();
        this.loadAssemblyLineWiseData();
        this.getMachineStatus();

        this.timeFunction();

        this.loadMachineWiseData();
    }

    private AssemblylineListSubscription: Subscription;

    private machineStatusSubscription: Subscription;

    // getSoloAssemblyLineList() {
    //     this.service.getSoloAssemblyLineList().subscribe((data: any) => {
    //       this.AssemblyLineList = data;
    //     }
    //     );
    // }

    getSoloAssemblyLineList() {
        // Use startWith to trigger an initial HTTP request
        this.AssemblylineListSubscription = interval(10000).pipe(
          startWith(0), // emit 0 immediately
          // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
          switchMap(() => this.service.getSoloAssemblyLineList()),
          // Use distinctUntilChanged to filter out repeated values
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        ).subscribe((data: any) => {
          this.AssemblyLineList = data;
        //   console.log("List",this.AssemblyLineList);
        });
      }


      status: string="";

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
          this.calculateAveragePerformance(); // Call the function to update averagePerformance
          this.calculateTotalGap();

          this.calculateTotalOnTime();
          this.calculateTotalIdleTime();
          this.calculateActual();
          this.calculateTarget();

          console.log("List",this.machineWiseDataList);
        //   console.log("List",this.AssemblyLineList);
        });
      }


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

    getShift(): string {
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();

        // Check if the current hour is between 8 and 20 (8:00 AM to 8:00 PM)
        switch (true) {
            case currentHour >= 8 && currentHour < 14:
                return 'Shift A, 06 - 14 (7)';
            case currentHour >= 14 || currentHour < 22:
                return 'Shift B, 14 - 22 (7)';
            case currentHour >= 22 && currentHour < 6:
                return 'Shift C, 22 - 06 (7)';
            default:
                // Add your additional case statements here
                return 'Shift A, 06 - 14 (7)';
        }

    }

    currentShift = this.getShift();




    editClick(dataItem: any){
        this.prodassembly=dataItem;
        this.ActivateAddEditProductionMachineComp=true;
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

        this.bar2Chart = {
            labels: [''],
            datasets: [
                {
                    label: 'Resetting',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-500'),
                    borderColor: documentStyle.getPropertyValue('--indigo-500'),
                    data: [25]
                },
                {
                    label: 'Engineering',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-400'),
                    borderColor: documentStyle.getPropertyValue('--yellow-400'),
                    data: [15]
                },
                {
                    label: 'Elect Maint',
                    backgroundColor: documentStyle.getPropertyValue('--blue-400'),
                    borderColor: documentStyle.getPropertyValue('--blue-400'),
                    data: [20]
                },
                {
                    label: 'Quality',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [10]
                },
                {
                    label: 'Mech Maint',
                    backgroundColor: documentStyle.getPropertyValue('--pink-400'),
                    borderColor: documentStyle.getPropertyValue('--pink-400'),
                    data: [30]
                }
            ]
        };

        this.bar2Options = {
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


    loadAssemblyLineWiseData() {
        this.service.getAssemblyLineWiseData().subscribe(data=>{
        this.AssemblylineWiseData=data;
        });
    }

    prodAssemblyAdded() {
        this.display = false;
        this.getSoloAssemblyLineList();

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Succesfully Updated' });
    }

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

        // Unsubscribe from the interval observable
        if (this.AssemblylineListSubscription) {
            this.AssemblylineListSubscription.unsubscribe();
        }

        // Unsubscribe from the interval observable
        if (this.machineStatusSubscription) {
            this.machineStatusSubscription.unsubscribe();
        }

        // Unsubscribe from the interval observable
        if (this.MachineListSubscription) {
            this.MachineListSubscription.unsubscribe();
        }
    }

    averagePerformance: number = 0;
    totalGapNumber: number = 0;
    totalOnTime: number = 0;
    totalIdleTime: number = 0;
    totalActual: number = 0;
    totalTarget: number = 0;
    performance: number = 0;

    calculateAveragePerformance(): void {
        const performances = this.machineWiseDataList.map(item => item.performance);

        if (performances.length > 0) {
          const totalPerformance = performances.reduce((sum, performance) => sum + performance, 0);
          this.averagePerformance = parseFloat((totalPerformance / performances.length).toFixed(1));
        //   console.log("Average Performance",this.averagePerformance);
        } else {
          console.error("No performance data available.");
          this.averagePerformance = 0; // or any default value
        }
    }

    calculateTotalGap(): void {
        const gaps = this.machineWiseDataList.map(item => item.gap);

        // Create a function to add all the gap values from above
        const totalGap = gaps.reduce((sum, gap) => sum + gap, 0);
        this.totalGapNumber = totalGap;
        // console.log("Total Gap",totalGap);

    }

    calculateTotalOnTime(): void {
        const gaps = this.machineWiseDataList.map(item => item.on_time);

        // Create a function to add all the gap values from above
        const totalOnTime = gaps.reduce((sum, on_time) => sum + on_time, 0);
        this.totalOnTime = totalOnTime;
        // console.log("Total Gap",totalGap);

    }

    calculateTotalIdleTime(): void {
        const gaps = this.machineWiseDataList.map(item => item.idle_time);

        // Create a function to add all the gap values from above
        const totalIdleTime = gaps.reduce((sum, idle_time) => sum + idle_time, 0);
        this.totalIdleTime = totalIdleTime;

    }

    calculateActual(): void {
        const gaps = this.machineWiseDataList.map(item => item.actual);

        // Create a function to add all the gap values from above
        const totalActual = gaps.reduce((sum, actual) => sum + actual, 0);
        this.totalActual = totalActual;

    }

    calculatePerformance(): void {
        const performance = 3300 - this.totalActual;
        this.performance = performance;
    }

    calculateTarget(): void {
        const gaps = this.machineWiseDataList.map(item => item.target);

        // Create a function to add all the gap values from above
        const totalTarget = gaps.reduce((sum, target) => sum + target, 0);
        this.totalTarget = totalTarget;

    }

}
