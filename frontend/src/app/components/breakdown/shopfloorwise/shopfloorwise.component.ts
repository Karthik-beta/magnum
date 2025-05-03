import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-shopfloorwise',
  templateUrl: './shopfloorwise.component.html',
  styleUrls: ['./shopfloorwise.component.scss']
})
export class ShopfloorwiseComponent implements OnInit{

    constructor(private service: SharedService) { }



  ShopfloorList: any[] = [];

  category: string='';
  andon_alerts: string='';
  results: any[] = [];


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
    jobwork: any;
    product_id: any;

    ngOnInit(): void {
        this.getAndonList();
        this.startAutoRefresh();

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
          this.jobwork = [
            { name: 'JW-12345678-54'}
          ],
          this.product_id = [
            { name: 'CASSEROLES' },
          ]
    }

    ngOnDestroy(): void {
        this.stopAutoRefresh(); // Clear interval when component is destroyed
    }

    cardColors: string[] = [
        'burlywood',
        '#ccc',
        'rgb(133, 124, 190)',
        'rgb(195, 223, 195)',
        'rgb(202, 202, 180)',
        '#ff9999', // Light Red
        '#99ccff', // Light Blue
        '#ffcc99', // Light Orange
        '#ccffcc', // Light Green
        '#ffccff', // Light Pink
        '#d9d9d9', // Light Gray
        '#ffff99', // Light Yellow
        '#c2c2f0', // Light Purple
        '#ffb3e6', // Light Magenta
        '#c2f0c2'  // Light Mint Green
    ];

    andonList: any[] = [];
    private previousAndonList: any[] = [];
    private refreshInterval: any;

    getAndonList() {
        const params = {
            page: 1,
            page_size: 100,
            andon_resolved_isnull: true
        };

        this.service.getAndList(params).subscribe((data: any) => {
            const newAndonList = data.results;

            // Compare new data with the previous data
            if (JSON.stringify(newAndonList) !== JSON.stringify(this.previousAndonList)) {
                this.andonList = newAndonList; // Update UI only if data changes
                this.previousAndonList = [...newAndonList]; // Save the new data for future comparison
                console.log('Andon List updated:', this.andonList);
            } else {
                console.log('No changes in Andon List');
            }
        });
    }

    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            this.getAndonList();
        }, 10000); // Refresh every 30 seconds
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }

    dummyList = [
        {
            shopfloor: 'SSL MAIN LINE',
            machine_id: 'WS01',
            category: 'Missing SWS',
            alert: 'April 11, 2025, 01:03:34'
        },
        {
            shopfloor: 'SSL MAIN LINE',
            machine_id: 'WS02',
            category: 'Fit Issue',
            alert: 'April 11, 2025, 01:26:34'
        },
        {
            shopfloor: 'SSL MAIN LINE',
            machine_id: 'WS03',
            category: 'Part Damage',
            alert: 'April 11, 2025, 12:26:34'
        },
    ]


}
