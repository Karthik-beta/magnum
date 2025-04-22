import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { map, switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-weekly-target',
  templateUrl: './weekly-target.component.html',
  styleUrls: ['./weekly-target.component.scss']
})
export class WeeklyTargetComponent implements OnInit {

    constructor(private service:SharedService) {}

    data: any;

    options: any;

    ngOnInit() {
        this.getSpellAssemblyLineList();
    }

    ngChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        if (!this.weeklyTargetList || this.weeklyTargetList.length === 0) {
            console.error('Weekly target list is not available or empty.');
            return;
        }

        const actualValues = [
            this.weeklyTargetList[0]?.w1_actual ?? 0,
            this.weeklyTargetList[0]?.w2_actual ?? 0,
            this.weeklyTargetList[0]?.w3_actual ?? 0,
            this.weeklyTargetList[0]?.w4_actual ?? 0
        ];

        const targetValues = [
            this.weeklyTargetList[0]?.w1_target ?? 0,
            this.weeklyTargetList[0]?.w2_target ?? 0,
            this.weeklyTargetList[0]?.w3_target ?? 0,
            this.weeklyTargetList[0]?.w4_target ?? 0
        ];

        // console.log('Actual Values:', actualValues);
        // console.log('Target Values:', targetValues);

        this.data = {
            labels: ['W1 - (1st to 7th.)', 'W2 - (8th to 15th.)', 'W3 - (16th to 23rd.)', 'W4 - (24th to 30th.)'],
            datasets: [
                {
                    label: 'Target',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: targetValues
                },
                {
                    label: 'Production',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: actualValues
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
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

    weeklyTargetList: any = [];

    private subscription: Subscription;
    private WeeklyTargetSubscription: Subscription;


    getSpellAssemblyLineList() {
        // Use startWith to trigger an initial HTTP request
        this.WeeklyTargetSubscription = interval(10000).pipe(
          startWith(0), // emit 0 immediately
          // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
        //   switchMap(() => this.service.getWeeklyTarget()),
          // Use distinctUntilChanged to filter out repeated values
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        ).subscribe((data: any) => {
          this.weeklyTargetList = data;

          // Now call the ngChart method to update the chart with the new data
          this.ngChart();
          console.log("List",this.weeklyTargetList);
        });
      }

    ngOnDestroy() {
        // Unsubscribe from the observable to avoid memory leaks
        this.subscription.unsubscribe();

        // Unsubscribe from the interval observable
        if (this.WeeklyTargetSubscription) {
            this.WeeklyTargetSubscription.unsubscribe();
        }
    }
}
