import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-info',
  templateUrl: './monthly-info.component.html',
  styleUrls: ['./monthly-info.component.scss']
})
export class MonthlyInfoComponent implements OnInit {

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


    ngOnInit() {
        this.initCharts();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: ['2023-11-1', '2023-11-2', '2023-11-3', '2023-11-4', '2023-11-5', '2023-11-6', '2023-11-7', '2023-11-8', '2023-11-9', '2023-11-10', '2023-11-11', '2023-11-12', '2023-11-13', '2023-11-14', '2023-11-15', '2023-11-16', '2023-11-17'],
            datasets: [
                {
                    label: 'Present',
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    data: [65, 59, 80, 81, 56, 55, 40, 43, 56, 63, 32, 80, 81, 56, 55, 40, 43]
                },
                {
                    label: 'Absent',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
                {
                    label: 'Late Entry',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
                {
                    label: 'Early Exit',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
                {
                    label: 'Overtime',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
            ]
        };

        this.barOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
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
                        display: false,
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
                },
            }
        };
    }
}
