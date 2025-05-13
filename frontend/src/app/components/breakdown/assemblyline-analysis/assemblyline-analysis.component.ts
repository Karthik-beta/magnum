import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-assemblyline-analysis',
  templateUrl: './assemblyline-analysis.component.html',
  styleUrls: ['./assemblyline-analysis.component.scss']
})
export class AssemblylineAnalysisComponent implements OnInit{

    pieDayData: any;
    pieDayOptions: any;

    pieWeekData: any;
    pieWeekOptions: any;

    pieMonthData: any;

    pieMonthOptions: any;

    barData: any;

    barOptions: any;

    barData2: any;

    barOptions2: any;

    constructor(
        private service: SharedService
    ) {}

    ngOnInit() {
        this.initCharts();
        this.getAndonCategoryStats();
    }

    getAndonCategoryStats() {
        this.service.getAndonCategoryStats().subscribe((data: any) => {
            const daily = data.Daily || {};
            this.pieDayData.labels = Object.keys(daily);
            this.pieDayOptions.datasets[0].data = Object.values(daily);

            const weekly = data.Weekly || {};
            this.pieWeekData.labels = Object.keys(weekly);
            this.pieWeekOptions.datasets[0].data = Object.values(weekly);
        })
    }


    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.pieDayData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--orange-500')

                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--orange-500')
                    ]
                }]
        };

        this.pieDayOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: false,
                        color: textColor
                    }
                }
            }
        };

        this.pieWeekData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--orange-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--orange-500')
                    ]
                }]
        };

        this.pieWeekOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.2,
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
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November'],
            datasets: [
                {
                    label: 'RUNNING',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81]
                },
                {
                    label: 'BREAKDOWN',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [28, 48, 40, 19, 86, 27, 90, 80, 59, 55, 86]
                }
            ]
        };

        this.barOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    // display: false,
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

        this.barData2 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November'],
            datasets: [
                {
                    label:'Equipment Down',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [54, 32, 22, 32, 44, 12, 86, 27, 90, 80, 59]
                },
                {
                    label: 'Part Unavailable',
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    data: [28, 48, 40, 19, 86, 27, 90, 80, 59, 55, 86]
                },
                {
                    label: 'Missing SWS',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-500'),
                    borderColor: documentStyle.getPropertyValue('--indigo-500'),
                    data: [28, 48, 40, 19, 86, 27, 90, 80, 59, 55, 86]
                },
                {
                    label: 'Fit Issue',
                    backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    data: [28, 48, 40, 19, 86, 27, 90, 80, 59, 55, 86]
                },
                {
                    label: 'Part Damage',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: [28, 48, 40, 19, 86, 27, 90, 80, 59, 55, 86]
                },
                {
                    label: 'Safety Issue',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [28, 48, 40, 19, 86, 27, 90, 80, 59, 55, 86]
                }
            ]
        };

        this.barOptions2 = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
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
