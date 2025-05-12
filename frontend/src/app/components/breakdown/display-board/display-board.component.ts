import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-display-board',
  templateUrl: './display-board.component.html',
  styleUrls: ['./display-board.component.scss']
})
export class DisplayBoardComponent implements OnInit {

    constructor (
        private service: SharedService
    ) {}

    ngOnInit (): void {
        // this.refreshAndList();
    }

    andonList: any[] = [];

    // statuses = [
    //     { label: 'OK', count: 81, color: 'green' },
    //     { label: 'Acknowledge', count: 1, color: 'indigo' },
    //     { label: 'Alert', count: 2, color: 'red' },
    //     { label: 'Idle', count: 3, color: 'blue' }
    //   ];

    statuses: any[] = [];

    labels = [
        'Equipment down',
        'Part unavailable',
        'Missing SWS',
        'Fit issue',
        'Part Damage',
        'Safety issue'
    ];

    stations = Array.from({ length: 5 }, (_, i) => `WS-00${i + 1}`); // Stations from 1 to 12

    // Example dynamic data (replace with your actual data source)
    // gridData = [
    //     { category: 'Equipment down', status: ['green', 'green', 'red', 'green', 'indigo'] },
    //     { category: 'Part unavailable', status: ['green', 'green', 'green', 'indigo', 'green'] },
    //     { category: 'Missing SWS', status: ['blue', 'blue', 'green', 'green', 'green'] },
    //     { category: 'Fit issue', status: ['green', 'blue', 'green', 'green', 'green'] },
    //     { category: 'Part Damage', status: ['green', 'green', 'green', 'green', 'green'] },
    //     { category: 'Safety issue', status: ['green', 'green', 'green', 'green', 'green'] }
    // ];

    gridData: any[] = [];

    refreshAndList(): void {

      const params = {
        page: 1,
        page_size: 100,
      };

      this.service.getAndList(params).subscribe((data: any) => {
        this.andonList = data.results;
        console.log(this.andonList);

        // Calculate counts based on your rules
        const acknowledgeCount = this.andonList.filter(
        item => item.andon_acknowledge != null && item.andon_resolved == null
        ).length;

        const alertCount = this.andonList.filter(
        item => item.raise_alert != null && item.andon_acknowledge == null
        ).length;

        const idleCount = this.andonList.filter(
        item => item.raise_alert != null && item.andon_resolved == null
        ).length;

        const okCount = 5 - idleCount; // 5 is the total number of stations

        this.statuses = [
        { label: 'OK', count: okCount, color: 'green' },
        { label: 'Acknowledge', count: acknowledgeCount, color: 'indigo' },
        { label: 'Alert', count: alertCount, color: 'red' },
        { label: 'Idle', count: idleCount, color: 'blue' }
        ];

        // Build gridData dynamically
        this.gridData = this.labels.map(category => {
            // For each station, determine the status
            const status = this.stations.map(station => {
                // Find an active alert for this category and station
                const alert = this.andonList.find(
                    item =>
                        (item.category?.toLowerCase() === category.toLowerCase()) &&
                        (item.machineId === station) &&
                        item.raise_alert != null &&
                        item.andon_acknowledge == null
                );
                const acknowledge = this.andonList.find(
                    item =>
                        (item.category?.toLowerCase() === category.toLowerCase()) &&
                        (item.machineId === station) &&
                        item.andon_acknowledge != null &&
                        item.andon_resolved == null
                );
                if (acknowledge) {
                    return 'indigo'; // show indigo if acknowledged and not resolved
                } else if (alert) {
                    return 'red'; // show red if alert and not acknowledged
                } else {
                    return 'green'; // show green if no alert
                }
            });
            return { category, status };
        });
      });
    }
}
