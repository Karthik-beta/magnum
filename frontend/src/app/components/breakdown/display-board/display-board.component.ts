import { Component } from '@angular/core';

@Component({
  selector: 'app-display-board',
  templateUrl: './display-board.component.html',
  styleUrls: ['./display-board.component.scss']
})
export class DisplayBoardComponent {
    statuses = [
        { label: 'OK', count: 81, color: 'green' },
        { label: 'Acknowledge', count: 1, color: 'indigo' },
        { label: 'Alert', count: 2, color: 'red' },
        { label: 'Idle', count: 3, color: 'blue' }
      ];

      labels = [
        'Equipment down',
        'Part unavailable',
        'Missing SWS',
        'Fit issue',
        'Part Damage',
        'Safety issue'
      ];

      stations = Array.from({ length: 12 }, (_, i) => `WS-00${i + 1}`); // Stations from 1 to 12

      // Example dynamic data (replace with your actual data source)
      gridData = [
        { category: 'Equipment down', status: ['green', 'green', 'red', 'green', 'indigo', 'green', 'green', 'green', 'green', 'green', 'green', 'green'] },
        { category: 'Part unavailable', status: ['green', 'green', 'green', 'indigo', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'] },
        { category: 'Missing SWS', status: ['blue', 'blue', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'] },
        { category: 'Fit issue', status: ['green', 'blue', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'blue'] },
        { category: 'Part Damage', status: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'] },
        { category: 'Safety issue', status: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'] }
      ];
    }
