import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './plant-dashboard.component.html',
  styleUrls: ['./plant-dashboard.component.scss']
})
export class PlantDashboardComponent implements OnInit {
    yearlyData: any;

    yearlyOptions: any;

    ProdData: any;

    prodOptions: any;

    Prod2Data: any;

    prod2Options: any;

    Prod3Data: any;

    prod3Options: any;

    barData: any;

    barOptions: any;

    bar2Data: any;

    bar2Options: any;


    ngOnInit() {
        this.yearlyChart();
        this.productionChart();
        this.productionMonthChart();
        this.productionDayChart();
        this.barChart();
        this.bar2Chart();
    }

    yearlyChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.yearlyData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'X',
                    backgroundColor: documentStyle.getPropertyValue('--blue-400'),
                    borderColor: documentStyle.getPropertyValue('--blue-400'),
                    data: [65, 59, 80, 81, 56, 55, 40, 43, 56, 63, 32, 80, 81, 56, 55, 40, 43]
                },
                {
                    label: 'Y',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
                {
                    label: 'Z',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
                // {
                //     type: 'line',
                //     label: 'Total Production',
                //     borderColor: documentStyle.getPropertyValue('--blue-500'),
                //     borderWidth: 2,
                //     fill: false,
                //     tension: 0.4,
                //     data: [50, 25, 12, 48, 56, 76, 42]
                // },
                {
                    type: 'bar',
                    label: 'Breakdown',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: [21, 84, 24, 75, 37, 21, 84, 24, 75, 37, 65, 34],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [41, 52, 24, 74, 23, 41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };

        this.yearlyOptions = {
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
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }



    productionChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.ProdData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Actual',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [65, 59, 80, 65, 81, 59, 80, 65, 81, 56, 55, 10]
                },
                {
                    label: 'Target',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [28, 48, 40, 19, 48, 40, 40, 19, 48, 86, 27, 90]
                }
            ]
        };

        this.prodOptions = {
            stacked: false,
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
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }


    productionMonthChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.Prod2Data = {
            labels: ['2024-03-31', '2024-03-30', '2024-03-29', '2024-03-28', '2024-03-27', '2024-03-26', '2024-03-25', '2024-03-24', '2024-03-23', '2024-03-22', '2024-03-21', '2024-03-20', '2024-03-19', '2024-03-18', '2024-03-17', '2024-03-16', '2024-03-15', '2024-03-14', '2024-03-13', '2024-03-12', '2024-03-11', '2024-03-10', '2024-03-09', '2024-03-08', '2024-03-07', '2024-03-06', '2024-03-05', '2024-03-04', '2024-03-03', '2024-03-02', '2024-03-01'],
            datasets: [
                {
                    label: 'Actual',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [65, 59, 80, 65, 81, 59, 80, 65, 81, 56, 55, 10, 34, 21, 84, 24, 75, 37, 21, 84, 24, 75, 37, 65, 34, 41, 52, 24, 74, 23, 41, 52, 24, 74, 23, 21, 32, 21, 84, 24, 75, 37, 21, 84, 24, 75, 37, 65, 34, 41, 52, 24, 74, 23, 41, 52, 24, 74, 23, 21, 32]
                },
                {
                    label: 'Target',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [28, 48, 40, 19, 48, 40, 40, 19, 48, 86, 27, 75, 37, 65, 34, 41, 52, 24, 74, 23, 41, 52, 84, 24, 59, 80, 65, 81, 56, 55, 10, 34, 21, 84, 24, 75, 37, 21, 84, 24, 75, 37, 65, 34, 41, 52, 24, 74, 23, 41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };

        this.prod2Options = {
            stacked: false,
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
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    productionDayChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.Prod3Data = {
            labels: ['2024-03-31', '2024-03-30', '2024-03-29', '2024-03-28', '2024-03-27', '2024-03-26', '2024-03-25'],
            datasets: [
                {
                    label: 'Actual',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [65, 59, 80, 65, 81, 59, 80]
                },
                {
                    label: 'Target',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [28, 48, 40, 19, 48, 40, 40]
                }
            ]
        };

        this.prod3Options = {
            stacked: false,
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
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }



    barChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Breakdown 1',
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    data: [65, 59, 80, 81, 56, 55, 40, 43, 56, 63, 32, 80, 81, 56, 55, 40, 43]
                },
                {
                    label: 'Breakdown 2',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
                {
                    label: 'Breakdown 3',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
                {
                    label: 'Breakdown 4',
                    backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
                {
                    label: 'Breakdown 5',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [28, 48, 40, 19, 86, 27, 90,  63, 32, 80, 81, 56, 56, 63, 32, 80, 81, 56]
                },
            ]
        };

        this.barOptions = {
            maintainAspectRatio: false,
            aspectRatio: 2,
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



    bar2Chart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.bar2Data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Breakdown ',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [65, 59, 80, 81, 56, 55, 40, 43, 56, 63, 32, 80]
                },
                {
                    label: 'Running',
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    data: [28, 48, 40, 19, 86, 27, 90, 63, 32, 80, 81, 56]
                },
            ]
        };

        this.bar2Options = {
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    // stacked: true,
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
                    // stacked: true,
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
