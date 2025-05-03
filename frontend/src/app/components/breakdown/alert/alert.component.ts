import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { interval, Subscription } from 'rxjs';
import { switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    constructor(private service: SharedService) { }



    AndonOpenAlertsList: any[] = [];
    results: any[] = [];

    // Set a default interval value
    private refreshIntervalSeconds = 10;


    today_open_alerts: number = 0;
    total_open_alerts: number = 0;
    total_acknowledge_alerts: number = 0;
    total_resetting_alerts: number = 0;
    total_engineering_alerts: number = 0;
    total_quality_alerts: number = 0;
    total_mech_maint_alerts: number = 0;
    total_elect_maint_alerts: number = 0;
    total_alerts: number = 0;


    databaseStatus: string = '';



    ngOnInit(): void {
        this.metricsData();
        this.getAndonList();
        this.startAutoRefresh();
    //   this.AndonOpenAlerts();

      // Call the calculateTotalTime function every 30 seconds
    // setInterval(() => {
    //   this.calculateTotalTime('2022-01-01T00:00:00Z');
    //   this.AndonOpenAlerts();
    //   this.metricsData();
    // }, 30000);

    }

    ngOnDestroy(): void {
        this.stopAutoRefresh(); // Clear interval when component is destroyed
    }



    // metricsData() {
    //   this.service.getMetricsData().subscribe((data: any) => {
    //     // this.results = data;
    //     this.today_open_alerts = data.today_open_alerts;
    //     this.total_open_alerts = data.total_open_alerts;
    //     this.total_acknowledge_alerts = data.total_acknowledge_alerts;
    //     this.total_resetting_alerts = data.total_resetting_alerts;
    //     this.total_engineering_alerts = data.total_engineering_alerts;
    //     this.total_quality_alerts = data.total_quality_alerts;
    //     this.total_mech_maint_alerts = data.total_mech_maint_alerts;
    //     this.total_elect_maint_alerts = data.total_elect_maint_alerts;
    //     this.total_alerts = data.total_alerts;
    //   });
    // }

    alertCards = [
        {
          title: 'Equipment Down',
          count: 1,
          bgColor: '#CD5C5D'
        },
        {
          title: 'Part Unavailable',
          count: 0,
          bgColor: '#62CD37',
        },
        {
            title: 'Missing SWS',
            count: 1,
            bgColor: '#A7B289'
        },
        {
            title: 'Fit Issue',
            count: 0,
            bgColor: '#7F8000'
        },
        {
            title: 'Part Damage',
            count: 0,
            bgColor: '#088F8F'
        },
        {
            title: 'Safety Issue',
            count: 0,
            bgColor: '#115c45'
        },
    ];

    private metricsDataSubscription: Subscription | null = null; // Store the subscription

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

    // checkDatabaseConnection() {
    //   this.service.getDatabaseStatus().subscribe((data: any) => {
    //     this.databaseStatus = data.message;
    //   }
    //   );
    // }


    // AndonOpenAlerts() {
    //   this.service.getAndonOpenAlerts().subscribe((data: any) => {
    //     this.AndonOpenAlertsList = data;
    //   }
    //   );
    // }

    // AndonOpenAlerts() {
    //     // Use interval to trigger the request every 10 second
    //     interval(10000).pipe(
    //         startWith(0), // emit 0 immediately
    //       // Use switchMap to switch to a new observable (HTTP request) each time interval emits
    //       switchMap(() => this.service.getAndonOpenAlerts()),
    //       // Use distinctUntilChanged to filter out repeated values
    //       distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    //     ).subscribe((data: any) => {
    //       this.AndonOpenAlertsList = data;
    //     });
    //   }


    calculateTotalTime(andonAlerts: string): string {
      const andonAlertsTime = new Date(andonAlerts); // Convert the string to a Date object
      const currentTime = new Date(); // Get the current time

      // Calculate the time difference in milliseconds
      const timeDifference = currentTime.getTime() - andonAlertsTime.getTime();

      // Calculate hours, minutes, and seconds
      const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
      const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
      const seconds = Math.floor((timeDifference % 60000) / 1000); // 1 second = 1000 milliseconds

      // Create a formatted string for the total time
      // const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
      const formattedTime = `${hours}h ${minutes}m`;

      return formattedTime;
    }

    andonList: any[] = [];
    private previousAndonList: any[] = [];
    private refreshInterval: any;

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

    distinctCategories: any[] = [];

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
