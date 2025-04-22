import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machine-dashboard',
  templateUrl: './machine-dashboard.component.html',
  styleUrls: ['./machine-dashboard.component.scss']
})
export class MachineDashboardComponent implements OnInit {
    data: any;

    options: any;

    data2: any;

    options2: any;

    data3: any;

    options3: any;

    barData: any;

    barOptions: any;

    barData2: any;

    barOptions2: any;

    barData3: any;

    barOptions3: any;

    barData4: any;

    barOptions4: any;

    breakdownData: any;

    breakdownOptions: any;

    plant: any;
    shopfloor: any;
    assembly_line: any;
    machine_id: any;
    jobwork: any;
    product_id: any;


    items: MenuItem[] = [];


    constructor(
        private service: SharedService,
        private route: ActivatedRoute
    ) { }


    lineList = [
        {
            machine: 'MC - 1',
            oee: 85,
        }
    ]

    // Inside your component class
    getStatusClass(oee: number): string {
        if (oee > 90) {
            return 'status-good';
        } else if (oee < 80) {
            return 'status-bad';
        } else {
            return 'status-ok';
        }
    }


    details = [
        {
            jobwork: 'JW-20240327-2',
            batch: `TEST`
        }
    ]

    job: string = 'JW-20240327-2';
    batch: string = 'TEST';
    pending: 1234;

    id: string | null = null;


    ngOnInit() {
        this.piechart();
        this.barChart();
        this.bar2Chart();
        this.bar3Chart();
        this.healthChart();
        this.qualityChart();
        this.breakdownChart();
        this.productionChart();

        this.plant = [
            { name: 'Bangalore' },
          ],
          this.shopfloor = [
            { name: 'Production' },
          ],
          this.assembly_line = [
            { name: 'Line - 1' },
          ],
          this.machine_id= [
            { name: 'SMT LINE 6' }
          ]

          this.items = [
            { label: 'Import', icon: 'fas fa-file-import' },
            { label: 'Export', icon: 'fas fa-download' },
          ];


        // Set default selections
        this.selectedPlant = this.plant[0];
        this.selectedShopfloor = this.shopfloor[0];
        this.selectedAssemblyLine = this.assembly_line[0];
        this.selectedMachine = this.machine_id[0];

        this.route.queryParams.subscribe(params => {
            this.id = params['machine_id'];
            if (this.id) {
                this.getMachineDetails(); // Fetch machine details
            }
          });
    }

    selectedPlant: any;
    selectedShopfloor: any;
    selectedAssemblyLine: any;
    selectedMachine: any;

    piechart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options = {
            maintainAspectRatio: true,
            aspectRatio: 3,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    basicData: any;

    basicOptions: any;

    barChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        this.barData = {
            labels: [''],
            datasets: [
                {
                    label: 'Breakdown 1',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [65]
                },
                {
                    label: 'Breakdown 2',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [48]
                },
                {
                    label: 'Breakdown 3',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [18]
                },
                {
                    label: 'Breakdown 4',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [25]
                },
                {
                    label: 'Breakdown 5',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [33]
                }
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
    }


    bar2Chart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        this.barData2 = {
            labels: ['Running', 'Idle', 'Break Time'],
            datasets: [
                {
                    data: [this.running, this.idle, this.breaktime],
                    backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--yellow-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--yellow-400')]
                }
            ]
        };


        this.barOptions2 = {
            cutout: '70%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            radius: '60%'
        };
    }



    bar3Chart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');



        this.barData4 = {
            labels: [''],
            datasets: [
            {
                label: 'Breakdown 1',
                backgroundColor: documentStyle.getPropertyValue('--red-400'),
                borderColor: documentStyle.getPropertyValue('--red-400'),
                data: [48]
            },
            {
                label: 'Breakdown 2',
                backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                borderColor: documentStyle.getPropertyValue('--indigo-400'),
                data: [18]
            },
            {
                label: 'Breakdown 3',
                backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                borderColor: documentStyle.getPropertyValue('--teal-400'),
                data: [25]
            },
            {
                label: 'Breakdown 4',
                backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                borderColor: documentStyle.getPropertyValue('--purple-400'),
                data: [33]
            },
            {
                label: 'Breakdown 5',
                backgroundColor: documentStyle.getPropertyValue('--orange-400'),
                borderColor: documentStyle.getPropertyValue('--orange-400'),
                data: [33]
            }
        ]
    };



        this.barOptions4 = {
            maintainAspectRatio: false,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    display: false,
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
                        display: true,
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
            },
            barPercentage: 0.7,
        };
    }


    healthChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data2 = {
            labels: ['Alert', 'Adequate', 'Reliable'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options2 = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    qualityChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data3 = {
            labels: ['Accept', 'Rework', 'Reject'],
            datasets: [
                {
                    data: [54, 32, 37],
                    backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--red-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--red-400')]
                }
            ]
        };

        this.options3 = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            },
            radius: '60%'
        };
    }

    breakdownChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.breakdownData = {
            labels: ['2024-03-31', '2024-03-30', '2024-03-29', '2024-03-28', '2024-03-27', '2024-03-26', '2024-03-25', '2024-03-24', '2024-03-23', '2024-03-22', '2024-03-21', '2024-03-20', '2024-03-19', '2024-03-18', '2024-03-17', '2024-03-16', '2024-03-15', '2024-03-14', '2024-03-13', '2024-03-12', '2024-03-11', '2024-03-10', '2024-03-09', '2024-03-08', '2024-03-07', '2024-03-06', '2024-03-05', '2024-03-04', '2024-03-03', '2024-03-02', '2024-03-01'],
            datasets: [
                {
                    label: 'Breakdown 1',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [65, 59, 80, 81, 56, 55, 40, 43, 56, 63, 32, 80, 81, 56, 55, 40, 43, 56, 63, 32, 80, 81, 56, 55, 40, 43, 56, 63, 32, 80, 81, 56]
                },
                {
                    label: 'Breakdown 2',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56, 63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56, 63, 32, 80]
                },
                {
                    label: 'Breakdown 3',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56, 63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56, 63, 32, 80]
                },
                {
                    label: 'Breakdown 4',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56, 63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56, 63, 32, 80]
                },
                {
                    label: 'Breakdown 5',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56, 63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56, 63, 32, 80]
                },
            ]
        };

        this.breakdownOptions = {
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





    productionChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData3 = {
            labels: [''],
            datasets: [
                {
                    label: 'Production Count',
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    data: [0]
                },
                {
                    label: 'Production Target',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [0]
                }
            ]
        };

        this.barOptions3 = {
            maintainAspectRatio: false,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
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
            },
            barPercentage: 0.7,
        };
    }

    machine1List: any[] = [];
    running: number = 0;
    idle: number = 0;
    breaktime: number = 0;
    prodCount: number = 0;
    prodTarget: number = 0;

    machine_name: string = '';

    getMachineDetails() {
        if (!this.id) {
            console.error("Machine ID is missing!");
            return; // or handle the missing ID appropriately
        }

        const params: any = { machine_id: this.id }

        this.service.getSingleMachineDetails(params).subscribe((data: any[]) => {
            this.machine1List = data;
            // console.log("Machine details:", this.machine1List);

            if (this.machine1List.length > 0) {
                this.machine_name = this.machine1List[0].machine_id;
                this.running = this.machine1List[0].on_time_percentage;
                this.idle = this.machine1List[0].idle_time_percentage;
                this.breaktime = this.machine1List[0].break_time_percentage;
                this.prodCount = this.machine1List[0].production_count;
                this.prodTarget = this.machine1List[0].production_target;

                if (this.barData3 && this.barData3.datasets) {
                    this.barData3.datasets[0].data = [this.prodCount];
                    this.barData3.datasets[1].data = [this.prodTarget];
                }

                if (this.barData2 && this.barData2.datasets) {
                    this.barData2.datasets[0].data = [this.running, this.idle, this.breaktime];
                }
                console.log("fshdufhskdf", this.barData2, this.barData3);
            }
            else {
                // Handle the case where no machine data is returned (e.g., invalid ID)
                console.warn("No data found for machine ID:", this.id);
                // Optionally, reset chart data to defaults or show a "no data" message
            }
        });
    }
}

