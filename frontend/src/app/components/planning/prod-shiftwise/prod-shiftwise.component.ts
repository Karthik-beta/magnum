import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-prod-shiftwise',
  templateUrl: './prod-shiftwise.component.html',
  styleUrls: ['./prod-shiftwise.component.scss']
})
export class ProdShiftwiseComponent {


    barChart: any;

    barOptions: any;

    bar1Chart: any;

    bar1Options: any;

    bar2Chart: any;

    bar2Options: any;

    bar3Chart: any;
    bar3Options: any;

    bar4Chart: any;
    bar4Options: any;

    today_open_alerts: number = 0;
    total_open_alerts: number = 0;
    total_acknowledge_alerts: number = 0;
    total_resetting_alerts: number = 0;
    total_engineering_alerts: number = 0;
    total_quality_alerts: number = 0;
    total_mech_maint_alerts: number = 0;
    total_elect_maint_alerts: number = 0;
    total_alerts: number = 0;
    total_closed_alerts: number = 0;

    plant: any;
    shopfloor: any;
    assembly_line: any;
    machine_id: any;

    constructor(
        private service: SharedService
    ) {}

    ngOnInit() {
        this.initCharts();
        this.metricsData();

        this.plant = [
            { name: 'CHENNAI' },
          ],
          this.shopfloor = [
            { name: 'XYZ' },
          ],
          this.assembly_line = [
            { name: 'TSE' },
          ],
          this.machine_id= [
            { name: 'TSE-001' },
            { name: 'TSE-002' },
            { name: 'TSE-003' },
        ]

        this.getMachineBreakdownToday();
    }

    getMachineBreakdownToday() {
        this.service.getMachineBreakdownToday().subscribe((data: any) => {
            // Map "assets" object to barChart
            const assets = data.assets || {};
            this.barChart.labels = ['Assets'];
            this.barChart.datasets = [
                {
                    label: 'Online',
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
                    data: [assets.Online ?? 0]
                },
                {
                    label: 'Offline',
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--red-400'),
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--red-400'),
                    data: [assets.Offline ?? 0]
                }
            ];
            this.barChart = { ...this.barChart };

            const shift = data.shift.efficiency || {};
            this.bar1Chart.labels = ['Running', 'Breakdown'];
            this.bar1Chart.datasets = [
                {
                    label: 'Running',
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
                    data: [shift.Running ?? 0]
                },
                {
                    label: 'Breakdown',
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--red-400'),
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--red-400'),
                    data: [shift.Breakdown ?? 0]
                }
            ];
            this.bar1Chart = { ...this.bar1Chart };

            // Category chart
            const categories = data.shift?.category || {};
            const bar11Chart = {
                labels: ['Category'],
                datasets: Object.keys(categories).map(cat => ({
                    label: cat,
                    backgroundColor: this.getCategoryColor(cat),
                    borderColor: this.getCategoryColor(cat),
                    data: [categories[cat]]
                }))
            };

            this.bar2Chart = { ...bar11Chart };
        });
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

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barChart = {
            labels: [],
            datasets: [
                {
                    label: 'Online',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: []
                },
                {
                    label: 'Offline',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: []
                }
            ]
        };

        this.barOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 2.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
                    },
                datalabels: {
                    display: true,
                    color: textColor
                    },
                tooltip: {
                    enabled: true,

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
                        color: surfaceBorder,
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
                }
            }
        };

        this.bar1Chart = {
            labels: [],
            datasets: [
                {
                    label: 'Running',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: []
                },
                {
                    label: 'Breakdown',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: []
                }
            ]
        };

        this.bar1Options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 3.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
                    },
                datalabels: {
                    display: true,
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
                        color: surfaceBorder,
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
                }
            }
        };


        this.bar2Chart = {
            labels: [],
            datasets: [
                {
                    label: 'Equipment Down',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-500'),
                    borderColor: documentStyle.getPropertyValue('--indigo-500'),
                    data: []
                },
                {
                    label: 'Part Unavailable',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-400'),
                    borderColor: documentStyle.getPropertyValue('--yellow-400'),
                    data: []
                },
                {
                    label: 'Missing SWS',
                    backgroundColor: documentStyle.getPropertyValue('--blue-400'),
                    borderColor: documentStyle.getPropertyValue('--blue-400'),
                    data: []
                },
                {
                    label: 'Fit issue',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: []
                },
                {
                    label: 'Part Damage',
                    backgroundColor: documentStyle.getPropertyValue('--pink-400'),
                    borderColor: documentStyle.getPropertyValue('--pink-400'),
                    data: []
                },
                {
                    label: 'Safety issue',
                    backgroundColor: documentStyle.getPropertyValue('--orange-400'),
                    borderColor: documentStyle.getPropertyValue('--orange-400'),
                    data: []
                }
            ]
        };

        this.bar2Options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 3.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
                    },
                datalabels: {
                    display: true,
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
                        color: surfaceBorder,
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
                }
            }
        };



        this.bar3Chart = {
            labels: ['Efficiency'],
            datasets: [
                {
                    label: 'Running',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [65]
                },
                {
                    label: 'Breakdown',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [35]
                }
            ]
        };

        this.bar3Options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 3.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
                    },
                datalabels: {
                    display: true,
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
                        color: surfaceBorder,
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
                }
            }
        };


        this.bar4Chart = {
            labels: ['Category'],
            datasets: [
                {
                    label: 'Equipment Down',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-500'),
                    borderColor: documentStyle.getPropertyValue('--indigo-500'),
                    data: [25]
                },
                {
                    label: 'Part Unavailable',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-400'),
                    borderColor: documentStyle.getPropertyValue('--yellow-400'),
                    data: [10]
                },
                {
                    label: 'Missing SWS',
                    backgroundColor: documentStyle.getPropertyValue('--blue-400'),
                    borderColor: documentStyle.getPropertyValue('--blue-400'),
                    data: [20]
                },
                {
                    label: 'Fit issue',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [10]
                },
                {
                    label: 'Part Damage',
                    backgroundColor: documentStyle.getPropertyValue('--pink-400'),
                    borderColor: documentStyle.getPropertyValue('--pink-400'),
                    data: [30]
                },
                {
                    label: 'Safety issue',
                    backgroundColor: documentStyle.getPropertyValue('--orange-400'),
                    borderColor: documentStyle.getPropertyValue('--orange-400'),
                    data: [5]
                }
            ]
        };

        this.bar4Options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 3.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
                    },
                datalabels: {
                    display: true,
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
                        color: surfaceBorder,
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
                }
            }
        };
    }



    metricsData() {
        // this.service.getMetricsData().subscribe((data: any) => {
        //   this.results = data;
        //   this.today_open_alerts = data.today_open_alerts;
        //   this.total_open_alerts = data.total_open_alerts;
        //   this.total_acknowledge_alerts = data.total_acknowledge_alerts;
        //   this.total_resetting_alerts = data.total_resetting_alerts;
        //   this.total_engineering_alerts = data.total_engineering_alerts;
        //   this.total_quality_alerts = data.total_quality_alerts;
        //   this.total_mech_maint_alerts = data.total_mech_maint_alerts;
        //   this.total_elect_maint_alerts = data.total_elect_maint_alerts;
        //   this.total_alerts = data.total_alerts;
        //   this.total_closed_alerts = data.total_closed_alerts;
        // });
      }

}

