import { Component } from '@angular/core';

@Component({
  selector: 'app-categorywise',
  templateUrl: './categorywise.component.html',
  styleUrls: ['./categorywise.component.scss']
})
export class CategorywiseComponent {


    plant: any;
    shopfloor: any;
    assembly_line: any;
    machine_id: any;
    jobwork: any;
    product_id: any;
    category: any;

    ngOnInit(): void {

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
          ],
          this.category = [
            { name: 'TEST' },
          ]
    }


    dummyList = [
        {
            shopfloor: 'SSL MAIN LINE',
            machine_id: 'WS01',
            status: 'Active',
            alert: 'April 11, 2025, 01:03:34'
        },
        {
            shopfloor: 'SSL MAIN LINE',
            machine_id: 'WS02',
            status: 'Active',
            alert: 'April 11, 2025, 01:26:37'
        },
        {
            shopfloor: 'SSL MAIN LINE',
            machine_id: 'WS03',
            status: 'Active',
            alert: 'April 11, 2025, 01:03:34'
        },
        {
            shopfloor: 'SSL MAIN LINE',
            machine_id: 'WS04',
            status: 'Active',
            alert: 'April 11, 2025, 01:26:37'
        },
    ]

}
