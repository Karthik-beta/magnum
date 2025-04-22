import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MessageService } from 'primeng/api';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-spell-assemblyline',
  templateUrl: './spell-assemblyline.component.html',
  styleUrls: ['./spell-assemblyline.component.scss']
})
export class SpellAssemblylineComponent implements OnInit {

    constructor(private service:SharedService, private messageService: MessageService) {}

    AssemblyLineList:any=[];

    AssemblylineWiseData: any[] = [];


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
        this.getSpellAssemblyLineList();
        this.initCharts();
        this.loadAssemblyLineWiseData();

        this.timeFunction();
    }

    getSpellAssemblyLineList() {
        this.service.getSpellAssemblyLineList().subscribe((data: any) => {
          this.AssemblyLineList = data;
        }
        );
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
        this.getSpellAssemblyLineList();

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
    }

}
