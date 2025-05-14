import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-machinewise-analysis',
  templateUrl: './machinewise-analysis.component.html',
  styleUrls: ['./machinewise-analysis.component.scss']
})
export class MachinewiseAnalysisComponent {


    barChart: any;

    barOptions: any;

    bar1Chart: any;

    bar1Options: any;

    bar11Chart: any;

    bar11Options: any;

    noBreakdownToday: boolean = false;



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
        this.getMachineBreakdownToday();

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
    }

    machines = ['WS-001', 'WS-002', 'WS-003', 'WS-004', 'WS-005'];
    machineCharts: any = {};

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

            // Loop for all machines
            this.machineCharts = {};
            this.machines.forEach(machine => {
                const machineData = data[machine];
                if (machineData) {
                    // Asset chart
                    const bar1Chart = {
                        labels: ['Efficiency'],
                        datasets: [
                            {
                                label: 'Running',
                                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
                                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
                                data: [machineData.asset?.running ?? 0]
                            },
                            {
                                label: 'Breakdown',
                                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--red-400'),
                                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--red-400'),
                                data: [machineData.asset?.breakdown ?? 0]
                            }
                        ]
                    };
                    // Category chart
                    const categories = machineData.category || {};
                    const bar11Chart = {
                        labels: ['Category'],
                        datasets: Object.keys(categories).map(cat => ({
                            label: cat,
                            backgroundColor: this.getCategoryColor(cat),
                            borderColor: this.getCategoryColor(cat),
                            data: [categories[cat]]
                        }))
                    };
                    this.machineCharts[machine] = {
                        bar1Chart,
                        bar11Chart,
                        noBreakdownToday: Object.keys(categories).length === 0
                    };
                }
            });
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


        this.bar11Chart = {
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
                    label: 'Fit Issue',
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
                    label: 'Safety Issue',
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    data: []
                }
            ]
        };

        this.bar11Options = {
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
