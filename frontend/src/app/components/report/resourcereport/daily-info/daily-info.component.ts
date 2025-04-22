import { Component , OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-daily-info',
  templateUrl: './daily-info.component.html',
  styleUrls: ['./daily-info.component.scss']
})
export class DailyInfoComponent implements OnInit {


    pieData: any;

    pieOptions: any;

    barData: any;

    barOptions: any;

    combinedLogs: any[] = []; // Initialize as an array
    totalRecords: number = 0;
    rowsPerPageOptions: number[] = [10, 20, 30];
    rows: number = 10;
    currentPage: number = 1;
    loading: boolean = false;

    date: Date | undefined;
    text: string = '';
    results: any[] = [];

    stateOptions: any[] = [
        { label: 'Show', value: 'true' },
        { label: 'Hide', value: 'false' }
    ];

    showElements: string = 'true';

    items: MenuItem[] = [];


    ngOnInit() {
        this.initCharts();

        this.items = [
            { label: 'Import', icon: 'fas fa-file-import' },
            { label: 'Export', icon: 'fas fa-download' },
            // { separator: true },
        ];
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.pieData = {
            labels: ['Present', 'Absent', 'Late Entry', 'Early Exit', 'Overtime'],
            datasets: [
                {
                    data: [54, 32, 70, 43, 22],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                    ]
                }]
        };

        this.pieOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.3,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: false,
                        color: textColor
                    }
                }
            }
        };

        this.barData = {
            labels: [''],
            datasets: [
                {
                    label: 'Present',
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    data: [65]
                },
                {
                    label: 'Absent',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [48]
                },
                {
                    label: 'Late Entry',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [18]
                },
                {
                    label: 'Early Exit',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [25]
                },
                {
                    label: 'Overtime',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [33]
                }
            ]
        };

        this.barOptions = {
            maintainAspectRatio: false,
            aspectRatio: 3,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: true,
                        fontColor: textColor
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
                        display: false,
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
                },
            }
        };
    }

    loadData(): void {
        this.loading = true;
        // const selectedDate = this.date ? this.formatDate(this.date) : '';

        // console.log('Selected Date:', selectedDate); // Check the selected date in the console

        const params: any = {
          page: this.currentPage.toString(),
          page_size: this.rows.toString(),
          search: this.text,
        //   date: selectedDate,
          // Add other filter parameters here if needed
        };
    }

}
