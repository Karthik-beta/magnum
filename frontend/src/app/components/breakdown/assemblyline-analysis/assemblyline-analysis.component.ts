import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-assemblyline-analysis',
  templateUrl: './assemblyline-analysis.component.html',
  styleUrls: ['./assemblyline-analysis.component.scss']
})
export class AssemblylineAnalysisComponent implements OnInit {

    pieDayData: any;
    pieDayOptions: any;
    noBreakdownToday: boolean = false;

    pieWeekData: any;
    pieWeekOptions: any;
    noBreakdownThisWeek: boolean = false;

    pieMonthData: any;
    pieMonthOptions: any;
    noBreakdownThisMonth: boolean = false;

    barMonthlyBreakdown: any;
    barMonthlyBreakdownOptions: any;

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
            this.pieDayData.datasets[0].data = Object.values(daily);
            this.pieDayData = { ...this.pieDayData }

            // Set the flag based on data
            this.noBreakdownToday = this.pieDayData.labels.length === 0;

            const weekly = data.Weekly || {};
            this.pieWeekData.labels = Object.keys(weekly);
            this.pieWeekData.datasets[0].data = Object.values(weekly);
            this.pieWeekData = { ...this.pieWeekData }

            // Set the flag based on data
            this.noBreakdownThisWeek = this.pieWeekData.labels.length === 0;

            const currentMonth = data.current_month || {};
            this.pieMonthData.labels = Object.keys(currentMonth);
            this.pieMonthData.datasets[0].data = Object.values(currentMonth);
            this.pieMonthData = { ...this.pieMonthData }

            // Set the flag based on data
            this.noBreakdownThisMonth = this.pieMonthData.labels.length === 0;

            // Prepare barMonthlyBreakdown for monthly breakdown
            const monthly = data.Monthly || {};
            const months = Object.keys(monthly); // ['Jan', 'Feb', ...]
            const categorySet = new Set<string>();

            // Collect all categories across months
            months.forEach(month => {
                const catObj = monthly[month];
                if (catObj) {
                    Object.keys(catObj).forEach(cat => categorySet.add(cat));
                }
            });

            const categories = Array.from(categorySet);

            // Build datasets for each category
            const datasets = categories.map(category => ({
                label: category,
                backgroundColor: this.getCategoryColor(category), // helper for color
                data: months.map(month => monthly[month]?.[category] ?? 0)
            }));

            this.barMonthlyBreakdown = {
                labels: months,
                datasets: datasets
            };
            this.barMonthlyBreakdown = { ...this.barMonthlyBreakdown }; // trigger change detection


            const runningBreakdown = data.running_breakdown || {};
            const monthsRB = Object.keys(runningBreakdown); // ['Jan', 'Feb', ...]
            const runningData = monthsRB.map(month => runningBreakdown[month]?.running ?? 0);
            const breakdownData = monthsRB.map(month => runningBreakdown[month]?.breakdown ?? 0);

            this.barData = {
                labels: monthsRB,
                datasets: [
                    {
                        label: 'Running',
                        backgroundColor: '#22c55e',
                        borderColor: '#22c55e',
                        data: runningData
                    },
                    {
                        label: 'Breakdown',
                        backgroundColor: '#ef4444',
                        borderColor: '#ef4444',
                        data: breakdownData
                    }
                ]
            };
            this.barData = { ...this.barData }; // trigger change detection

        })
    }

    // Helper to assign colors per category (customize as needed)
    getCategoryColor(category: string): string {
        const colorMap: { [key: string]: string } = {
            'Equipment Down': '#22c55e',
            'Fit issue': '#a21caf',
            'Missing SWS': '#6366f1',
            'Part Damage': '#fbbf24',
            'Part Unavailable': '#ef4444',
            'Safety Issue': '#f97316',
            'Other': '#f59e42',
            'Idle': '#3b82f6',
            'Alert': '#ef4444',
            'Acknowledge': '#6366f1',
            'OK': '#22c55e',
            'Running': '#3b82f6',
            'Breakdown': '#ef4444',
            // Add more mappings as needed
        };
        return colorMap[category] || '#f59e42'; // default color
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

        this.pieMonthData = {
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

        this.pieMonthOptions = {
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

        this.barMonthlyBreakdown = {
            labels: [],
            datasets: []
        }

        this.barMonthlyBreakdownOptions = {
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

        this.barData = {
            labels: [],
            datasets: []
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
                    stacked: false,
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
                    stacked: false,
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
