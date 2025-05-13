import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-daily-breakdown',
  templateUrl: './daily-breakdown.component.html',
  styleUrls: ['./daily-breakdown.component.scss']
})
export class DailyBreakdownComponent implements OnInit {
    pieChartData: any;
    pieChartOptions: any;
    noBreakdownToday: boolean = false;

    constructor(
        private service: SharedService
    ) {}


    ngOnInit (): void {
        this.initChart();
        this.getAndonCategoryStats();

    }

    getAndonCategoryStats() {
        this.service.getAndonCategoryStats().subscribe((data: any) => {
            const daily = data.Daily || {};
            this.pieChartData.labels = Object.keys(daily);
            this.pieChartData.datasets[0].data = Object.values(daily);
            this.pieChartData = { ...this.pieChartData }

            // Set the flag based on data
            this.noBreakdownToday = this.pieChartData.labels.length === 0;
        });
    }

    metrics = [
      { label: 'ALERT TODAY', value: '0', backgroundColor: '#673AB7' },
      { label: 'ALERT OPEN', value: '0', backgroundColor: '#9C27B0' },
      { label: 'ALERT ACK/CLOSURE', value: '0', backgroundColor: '#FFB300' },
      { label: 'BREAKDOWN ALERT', value: '0', backgroundColor: '#007ad9' },
    //   { label: 'EQUIPMENT DOWN', value: '1', backgroundColor: '#00a368' },
    //   { label: 'PART UNAVAILABLE', value: '1', backgroundColor: '#ffc63b' },
    //   { label: 'MISSING SWS', value: '1', backgroundColor: '#ff5959' },
    //   { label: 'FIT ISSUE', value: '1', backgroundColor: '#8e44ad' },
    //   { label: 'PART DAMAGE', value: '1', backgroundColor: '#3498db' },
    //   { label: 'SAFETY ISSUE', value: '1', backgroundColor: '#2ecc71' }
    ];

    breakdowns = [
        { label: 'EQUIPMENT DOWN', value: '0', backgroundColor: '#00a368' },
        { label: 'PART UNAVAILABLE', value: '0', backgroundColor: '#ffc63b' },
        { label: 'MISSING SWS', value: '0', backgroundColor: '#ff5959' },
        { label: 'FIT ISSUE', value: '0', backgroundColor: '#8e44ad' },
        { label: 'PART DAMAGE', value: '0', backgroundColor: '#3498db' },
        { label: 'SAFETY ISSUE', value: '0', backgroundColor: '#2ecc71' }
    ];

    breakdownCategories = [
      'Equipment down',
      'Part unavailable',
      'Missing SWS',
      'Fit issue',
      'Part Damage',
      'Safety issue'
    ];

    initChart() {
      this.pieChartData = {
        aspectRatio: 1.5,
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#007ad9', // Running - Blue
              '#00a368', // Breakdown - Green
              '#ffc63b', // RESETTING - Yellow
              '#ff5959', // ENGINEERING - Red
              '#8e44ad', // ELECT MAINT - Purple
              '#3498db', // QUALITY - Light Blue
              '#2ecc71'  // MECH MAINT - Light Green
            ],
            hoverBackgroundColor: [
              '#007ad9',
              '#00a368',
              '#ffc63b',
              '#ff5959',
              '#8e44ad',
              '#3498db',
              '#2ecc71'
            ]
          }]
      };

      this.pieChartOptions = {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      };
    }
  }
