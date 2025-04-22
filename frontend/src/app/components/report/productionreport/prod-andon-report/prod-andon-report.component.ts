import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-prod-andon-report',
  templateUrl: './prod-andon-report.component.html',
  styleUrls: ['./prod-andon-report.component.scss']
})
export class ProdAndonReportComponent implements OnInit {


    rows: number = 10;
    currentPage: number = 1;
    totalRecords: number = 0;
    text: string = '';
    results: any[] = [];
    rowsPerPageOptions: number[] = [10, 20, 30];

    plant: any;
    shopfloor: any;
    assembly_line: any;
    machine_id: any;

    items: MenuItem[] = [];


    loading: boolean = false;



    barChart: any;

    barOptions: any;


    stateOptions: any[] = [
        { label: 'Show', value: 'true' },
        { label: 'Hide', value: 'false' }
    ];

    showElements: string = 'true';

    ngOnInit(): void {
        this.initCharts();
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
          ],

          this.items = [
            { label: 'Import', icon: 'fas fa-file-import' },
            { label: 'Export', icon: 'fas fa-download' },
            // { separator: true },
        ];
    }

    dummyList: any[] = [
        {
            plant: 'CHENNAI',
            shopfloor: 'XYZ',
            assembly_line: 'TSE',
            machine_id: 'TSE-001',
            product_id: 'CASSEROLES',
            date: '01-10-2023',
            mc_on_hours: 1320,
            mc_idle_hours: 120,
            actual: 1224,
            target: 1440,
            performance: 79,
        },
        {
            plant: 'CHENNAI',
            shopfloor: 'XYZ',
            assembly_line: 'TSE',
            machine_id: 'TSE-002',
            product_id: 'CASSEROLES',
            date: '01-10-2023',
            mc_on_hours: 1440,
            mc_idle_hours: 0,
            actual: 1354,
            target: 1440,
            performance: 94,
        },
        {
            plant: 'CHENNAI',
            shopfloor: 'XYZ',
            assembly_line: 'TSE',
            machine_id: 'TSE-003',
            product_id: 'CASSEROLES',
            date: '01-10-2023',
            mc_on_hours: 1400,
            mc_idle_hours: 76,
            actual: 1324,
            target: 1440,
            performance: 86,
        }
    ];

    // getBackgroundColorStyle(performance: number): any {
    //     let backgroundColor = '';

    //     if (performance > 90) {
    //       backgroundColor = 'green';
    //     } else if (performance >= 80 && performance <= 90) {
    //       backgroundColor = 'yellow';
    //     } else if (performance < 80) {
    //       backgroundColor = 'red';
    //     }

    //     return {'background-color': backgroundColor };
    //   }

    getBackgroundColorStyle(performance: number): any {
        let backgroundColor = '';

        if (performance > 90) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), green)';
        } else if (performance >= 80 && performance <= 90) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), yellow)';
        } else if (performance < 80) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), red)';
        }

        return { 'background': backgroundColor };
      }



      initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barChart = {
            labels: [''],
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

        this.barOptions = {
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

}
