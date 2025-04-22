import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-breakdown',
  templateUrl: './daily-breakdown.component.html',
  styleUrls: ['./daily-breakdown.component.scss']
})
export class DailyBreakdownComponent {
    pieChartData: any;
    pieChartOptions: any;

    metrics = [
      { label: 'ALERT TODAY', value: '0', backgroundColor: '#673AB7' },
      { label: 'ALERT OPEN', value: '0', backgroundColor: '#9C27B0' },
      { label: 'ALERT ACK/CLOSURE', value: '5', backgroundColor: '#FFB300' },
      { label: 'BREAKDOWN ALERT', value: '5', backgroundColor: '#007ad9' },
    //   { label: 'EQUIPMENT DOWN', value: '1', backgroundColor: '#00a368' },
    //   { label: 'PART UNAVAILABLE', value: '1', backgroundColor: '#ffc63b' },
    //   { label: 'MISSING SWS', value: '1', backgroundColor: '#ff5959' },
    //   { label: 'FIT ISSUE', value: '1', backgroundColor: '#8e44ad' },
    //   { label: 'PART DAMAGE', value: '1', backgroundColor: '#3498db' },
    //   { label: 'SAFETY ISSUE', value: '1', backgroundColor: '#2ecc71' }
    ];

    breakdowns = [
        { label: 'EQUIPMENT DOWN', value: '1', backgroundColor: '#00a368' },
        { label: 'PART UNAVAILABLE', value: '1', backgroundColor: '#ffc63b' },
        { label: 'MISSING SWS', value: '1', backgroundColor: '#ff5959' },
        { label: 'FIT ISSUE', value: '1', backgroundColor: '#8e44ad' },
        { label: 'PART DAMAGE', value: '1', backgroundColor: '#3498db' },
        { label: 'SAFETY ISSUE', value: '1', backgroundColor: '#2ecc71' }
    ];

    breakdownCategories = [
      'Equipment down',
      'Part unavailable',
      'Missing SWS',
      'Fit issue',
      'Part Damage',
      'Safety issue'
    ];

    constructor() {
      this.pieChartData = {
        aspectRatio: 1.5,
        labels: ['Equipment down', 'Part unavailable', 'Missing SWS', 'Fit issue', 'Part Damage', 'Safety issue'],
        datasets: [
          {
            data: [37.5, 31.3, 6.3, 6.3, 6.3, 6.3],
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
