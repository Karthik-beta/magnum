import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { map, switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-monthly-target',
  templateUrl: './monthly-target.component.html',
  styleUrls: ['./monthly-target.component.scss']
})
export class MonthlyTargetComponent {


    constructor(private service:SharedService) {}

    data: any;

    options: any;

    data2: any;

    options2: any;

    ngOnInit() {
        this.ngChart();
        this.ngChart2();
        this.getSpellAssemblyLineList();
    }

    testList = [
        {
            test1: 'Layup',
            test2: '123',
            test3: 'Test 3',
            test4: 'Test 4',
            test5: 'Test 5',
            test6: 'Test 6',
        },
        // {
        //     test1: 'Cell Break',
        //     test2: '123',
        //     test3: 'Test 3',
        //     test4: 'Test 4',
        //     test5: 'Test 5',
        //     test6: 'Test 6',
        // }
    ];


    ngChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        if (!this.monthlyTargetList || this.monthlyTargetList.length === 0) {
            console.error('Monthly target list is not available or empty.');
            return;
        }

        const targetValues = [
            this.monthlyTargetList[0]?.w1_target ?? 0,
            this.monthlyTargetList[0]?.w2_target ?? 0,
            this.monthlyTargetList[0]?.w3_target ?? 0,
            this.monthlyTargetList[0]?.w4_target ?? 0
        ];

        const productionValues = [
            this.monthlyTargetList[0]?.w1_production ?? 0,
            this.monthlyTargetList[0]?.w2_production ?? 0,
            this.monthlyTargetList[0]?.w3_production ?? 0,
            this.monthlyTargetList[0]?.w4_production ?? 0
        ];

        this.data = {
            labels: ['W1 - (1st to 7th.)', 'W2 - (8th to 15th.)', 'W3 - (16th to 23rd.)', 'W4 - (24th to 30th.)'],
            datasets: [
                {
                    label: 'Target',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: targetValues
                },
                {
                    label: 'Production',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: productionValues
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 1.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
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

    ngChart2() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        if (!this.monthlyTargetList || this.monthlyTargetList.length === 0) {
            console.error('Monthly target list is not available or empty.');
            return;
        }

        const shiftValues = [
            this.monthlyTargetList[0]?.w1_shift ?? 0,
            this.monthlyTargetList[0]?.w2_shift ?? 0,
            this.monthlyTargetList[0]?.w3_shift ?? 0,
            this.monthlyTargetList[0]?.w4_shift ?? 0
        ];

        this.data2 = {
            labels: ['W1 - (1st to 7th.)', 'W2 - (8th to 15th.)', 'W3 - (16th to 23rd.)', 'W4 - (24th to 30th.)'],
            datasets: [
                {
                    label: 'Hours',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    data: shiftValues
                }
            ]
        };

        this.options2 = {
            maintainAspectRatio: false,
            aspectRatio: 1.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
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

    totalTarget!: number;
    totalProduction!: number;
    totalWorkingHours!: number;
    todayRate!: number;
    daysCompleted!: number;
    holidays!: number;

    monthlyTargetList: any = [];

    private subscription: Subscription;
    private MonthlyTargetSubscription: Subscription;


    getSpellAssemblyLineList() {
        // Use startWith to trigger an initial HTTP request
        this.MonthlyTargetSubscription = interval(10000).pipe(
          startWith(0), // emit 0 immediately
          // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
        //   switchMap(() => this.service.getMonthlyTarget()),
          // Use distinctUntilChanged to filter out repeated values
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        ).subscribe((data: any) => {
          this.monthlyTargetList = data;

          // Extract 'production_total' and assign it to 'totalProduction'
        this.totalProduction = this.monthlyTargetList?.[0]?.production_total || 0;

        // Extract 'Total_Target' and assign it to 'totalTarget'
        this.totalTarget = this.monthlyTargetList?.[0]?.target_total || 0;

        // Extract 'Total_Working_Hours' and assign it to 'totalWorkingHours'
        this.totalWorkingHours = this.monthlyTargetList?.[0]?.shift_total || 0;

        // Calculate the today's rate
        this.todayRate = this.monthlyTargetList?.[0]?.today_rate || 0;

        // Calculate the days completed
        this.daysCompleted = this.monthlyTargetList?.[0]?.days_completed || 0;

        // Extract 'holidays' and assign it to 'holidays'
        this.holidays = this.monthlyTargetList?.[0]?.holidays || 0;

          // Now call the ngChart method to update the chart with the new data
          this.ngChart();
          this.ngChart2();
          console.log("List",this.monthlyTargetList);
        });
      }

    ngOnDestroy() {
        // Unsubscribe from the observable to avoid memory leaks
        this.subscription.unsubscribe();

        // Unsubscribe from the interval observable
        if (this.MonthlyTargetSubscription) {
            this.MonthlyTargetSubscription.unsubscribe();
        }
    }

}
