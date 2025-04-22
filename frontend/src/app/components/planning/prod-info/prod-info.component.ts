import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-prod-info',
  templateUrl: './prod-info.component.html',
  styleUrls: ['./prod-info.component.scss']
})
export class ProdInfoComponent {

    constructor(private service:SharedService) {}


    rows: number = 10;
    currentPage: number = 1;
    totalRecords: number = 0;
    text: string = '';
    results: any[] = [];
    rowsPerPageOptions: number[] = [10, 20, 30];
    loading: boolean = false;

    chartOEEData: any;

    chartOEEOptions: any;

    items: MenuItem[] = [];

    stateOptions: any[] = [
        { label: 'Show', value: 'true' },
        { label: 'Hide', value: 'false' }
    ];

    showElements: string = 'true';

    ngOnInit(): void {
        this.initChart();
        this.loadProductionReport();

        this.items = [
            { label: 'Import', icon: 'fas fa-file-import' },
            { label: 'Export', icon: 'fas fa-download', command: ()=> this.downloadProductionReport() },
        ]
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartOEEData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
            datasets: [
                {
                    label: 'Plant 1',
                    data: [65, 69, 80, 81, 82, 85, 87, 89, 91, 92, 95],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-700'),
                    borderColor: documentStyle.getPropertyValue('--green-700'),
                    tension: .4
                }
            ]
        };

        this.chartOEEOptions = {
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
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
    }

    productionReportList: any = [] = [];


    loadProductionReport() {
        this.service.getProductionReport().subscribe((data: any) =>{
            this.productionReportList = data.results;
            console.log(this.productionReportList);
        });
    }

    // Download Production Report
    downloadProductionReport() {
        this.service.downloadProductionReport().subscribe({
          next: (data) => {
            // Create a Blob object from the response data
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a URL for the Blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element and trigger a click event to download the file
            const a = document.createElement('a');
            a.href = url;

            // Get the current date
            const currentDate = new Date();

            // Format the date as a string (e.g., "2023-09-01")
            const formattedDate = currentDate.toISOString().split('T')[0];

            // Define the filename based on the formatted date
            const filename = `Production_Report_${formattedDate}.xlsx`;

            // Set the download attribute with the filename
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          },
          error: (error) => {
            // Handle any error that might occur during the download
            console.error('Error downloading Production Report: ', error);
          }
        });
    }


}
