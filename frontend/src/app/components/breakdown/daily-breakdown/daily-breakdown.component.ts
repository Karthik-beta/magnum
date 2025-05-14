import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { interval, Subscription } from 'rxjs';
import { switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-daily-breakdown',
  templateUrl: './daily-breakdown.component.html',
  styleUrls: ['./daily-breakdown.component.scss']
})
export class DailyBreakdownComponent implements OnInit {
    pieChartData: any;
    pieChartOptions: any;
    noBreakdownToday: boolean = false;

    distinctCategories: any[] = [];
    andonList: any[] = [];
    private previousAndonList: any[] = [];
    private refreshInterval: any;

    today_open_alerts: number = 0;
    total_open_alerts: number = 0;
    total_acknowledge_alerts: number = 0;
    total_resetting_alerts: number = 0;
    total_engineering_alerts: number = 0;
    total_quality_alerts: number = 0;
    total_mech_maint_alerts: number = 0;
    total_elect_maint_alerts: number = 0;
    total_alerts: number = 0;

    constructor(
        private service: SharedService
    ) {}


    ngOnInit (): void {
        this.initChart();
        this.getAndonCategoryStats();
        this.getAndonList();
        this.metricsData();
    }

    private metricsDataSubscription: Subscription | null = null;

    metricsData() {
            // Use interval to trigger the request every 10 seconds
            this.metricsDataSubscription = interval(10000).pipe(
                startWith(0),
                switchMap(() => this.service.getMetricsData()),
                distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
            ).subscribe((data: any) => {
                this.today_open_alerts = data.today_open_alerts;
                this.total_open_alerts = data.total_open_alerts;
                this.total_acknowledge_alerts = data.total_acknowledge_alerts;
                this.total_resetting_alerts = data.total_resetting_alerts;
                this.total_engineering_alerts = data.total_engineering_alerts;
                this.total_quality_alerts = data.total_quality_alerts;
                this.total_mech_maint_alerts = data.total_mech_maint_alerts;
                this.total_elect_maint_alerts = data.total_elect_maint_alerts;
                this.total_alerts = data.total_alerts;
            });
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

    getAndonList() {
        const params = {
            page: 1,
            page_size: 100,
            andon_resolved_isnull: true
        };

        this.service.getAndList(params).subscribe((data: any) => {
            const newAndonList = data.results;

            // Compare new data with the previous data
            if (JSON.stringify(newAndonList) !== JSON.stringify(this.previousAndonList)) {
                this.andonList = newAndonList; // Update UI only if data changes
                this.getDistinctCategories();
                this.previousAndonList = [...newAndonList]; // Save the new data for future comparison
                console.log('Andon List updated:', this.andonList);
            } else {
                console.log('No changes in Andon List');
            }
        });
    }

    getDistinctCategories() {
        const allCategories = [
            'Equipment Down',
            'Part Unavailable',
            'Missing SWS',
            'Fit issue',
            'Part Damage',
            'Safety issue'
        ];

        this.distinctCategories = allCategories.map(category => ({
            title: category,
            count: this.andonList.filter(item => item.category === category).length || 0,
            bgColor: this.getCategoryColor(category) // Assign colors dynamically
        }));
    }

    getCategoryColor(category: string): string {
        const colors: { [key: string]: string } = {
            'Equipment Down': '#CD5C5D',
            'Part Unavailable': '#62CD37',
            'Missing SWS': '#A7B289',
            'Fit issue': '#7F8000',
            'Part Damage': '#088F8F',
            'Safety issue': '#115c45'
        };
        return colors[category] || '#CCCCCC'; // Default color
    }

    metrics = [
      { label: 'ALERT TODAY', value: this.today_open_alerts, backgroundColor: '#673AB7' },
      { label: 'ALERT OPEN', value: this.total_open_alerts, backgroundColor: '#9C27B0' },
      { label: 'ALERT ACK/CLOSURE', value: this.total_acknowledge_alerts, backgroundColor: '#FFB300' },
      { label: 'BREAKDOWN ALERT', value: this.total_alerts, backgroundColor: '#007ad9' },
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

    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            this.getAndonList();
        }, 10000); // Refresh every 30 seconds
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        if (this.metricsDataSubscription) {
            this.metricsDataSubscription.unsubscribe();
            this.metricsDataSubscription = null;
        }
    }
}
