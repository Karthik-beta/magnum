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
        this.shopfloorwiseData();
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
          ],
          this.jobwork = [
            { name: 'JW-12345678-54'}
          ],
          this.product_id = [
            { name: 'CASSEROLES' },
          ]
    }


    cardColors: string[] = [
        'burlywood',
        '#ccc',
        'rgb(133, 124, 190)',
        'rgb(195, 223, 195)',
        'rgb(202, 202, 180)'
      ];

      shopfloorwiseData() {
        // this.service.getShopfloorwiseData().subscribe((data: any) => {
        //   this.ShopfloorList = data;
        //   // this.shopfloor = data.shopfloor;
        //   // this.machineId = data.machineId;
        //   // this.category = data.category;
        //   // this.andon_alerts = data.andon_alerts;
        // });
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
