import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { SharedService } from 'src/app/shared.service';
import { timer } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    barData: any;

    barOptions: any;

    chartOEEData: any;

    chartOEEOptions: any;

    barQualityData: any;

    barQualityOptions: any;

    plantCount: number;
    shopfloorCount: number;
    assemblylineCount: number;
    machineCount: number;

    subscription!: Subscription;

    constructor(private productService: ProductService, public layoutService: LayoutService, private service:SharedService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();

        this.dashCardsCount();

        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.refreshProdPlanList();
        this.mostOrderedProductsList();

        this.statuses = [
            { label: 'New', value: 'New' },
            { label: 'Planned', value: 'Planned' },
            { label: 'Processing', value: 'Processing' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
            datasets: [
                {
                    label: 'Shopfloor 1',
                    data: [65, 59, 80, 81, 56, 55, 40, 45, 35, 50, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Shopfloor 2',
                    data: [28, 48, 40, 19, 86, 27, 90, 80, 81, 56, 55],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
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


        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
            datasets: [
                {
                    label: 'Shopfloor 1',
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56]
                },
                {
                    label: 'Shopfloor 2',
                    backgroundColor: documentStyle.getPropertyValue('--red-300'),
                    borderColor: documentStyle.getPropertyValue('--red-300'),
                    data: [28, 48, 40, 19, 86, 27, 90,48, 40, 19, 86]
                }
            ]
        };

        this.barOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
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

        // OEE Chart
        this.chartOEEData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
            datasets: [
                {
                    label: 'Plant 1',
                    data: [65, 69, 80, 81, 76, 75, 80, 85, 85, 80, 80],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-700'),
                    borderColor: documentStyle.getPropertyValue('--green-700'),
                    tension: .4
                }
            ]
        };

        this.chartOEEOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
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

        // Quality Chart
        this.barQualityData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
            datasets: [
                {
                    label: 'Accepted',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56]
                },
                {
                    label: 'Rework',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [28, 48, 40, 19, 86, 27, 90,48, 40, 19, 86]
                },
                {
                    label: 'Reject',
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    data: [28, 43, 46, 29, 66, 17, 91, 41, 47, 25, 76]
                }
            ]
        };

        this.barQualityOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loading: boolean = false;
    currentPage: number = 1;
    totalRecords: number = 0;
    rows: number = 5;

    productionPlanList: any[] = [];
    statuses: any[] = [];

    refreshProdPlanList() {
        this.loading = true;

        const params = {
          page: this.currentPage.toString(),
          page_size: this.rows.toString()
        };

        this.service.getRecentOrders(params).subscribe((data: any) => {
          this.productionPlanList = data.results; // Assuming your API response has a 'results' property
          this.totalRecords = data.count;   // Assuming your API response has a 'count' property
          this.loading = false;
        });
      }

    mostOrderedProducts: Array<any> = [];

    mostOrderedProductsList() {
        this.service.getMostOrderedProducts().subscribe((data: any) => {
            this.mostOrderedProducts = data.most_ordered_products; // Assuming your API response has a 'most_ordered_products' property
        });
    }

    // dashCardsCount() {
    //     this.service.getDashCardCount().subscribe((data: any) => {
    //         this.plantCount = data.plant_count;
    //         this.shopfloorCount = data.shopfloor_count;
    //         this.assemblylineCount = data.assemblyline_count;
    //         this.machineCount = data.machine_count;
    //     })
    // }

    dashCardsCount() {
        timer(0, 10000)  // Emit an initial value immediately and then every 10 seconds
            .pipe(
                switchMap(() => this.service.getDashCardCount()),  // Switch to the new observable every 10 seconds
                distinctUntilChanged()  // Only emit when the data changes
            )
            .subscribe((data: any) => {
                this.plantCount = data.plant_count;
                this.shopfloorCount = data.shopfloor_count;
                this.assemblylineCount = data.assemblyline_count;
                this.machineCount = data.machine_count;
            });
    }

}
