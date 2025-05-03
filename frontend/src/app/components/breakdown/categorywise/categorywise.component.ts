import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-categorywise',
  templateUrl: './categorywise.component.html',
  styleUrls: ['./categorywise.component.scss']
})
export class CategorywiseComponent implements OnInit {

    constructor(private service: SharedService) { }

    plant: any;
    shopfloor: any;
    assembly_line: any;
    machine_id: any;
    jobwork: any;
    product_id: any;
    category: any;

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
          ],
          this.category = [
            { name: 'TEST' },
          ]
    }

    ngOnDestroy(): void {
        this.stopAutoRefresh(); // Clear interval when component is destroyed
    }

    andonList: any[] = [];
    equipmentDownList: any[] = [];
    partUnavailableList: any[] = [];
    missingSWSList: any[] = [];
    fitIssueList: any[] = [];
    partDamageList: any[] = [];
    safetyIssueList: any[] = [];

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

                // Filter and map 'Equipment Down' category to equipmentDownList
                this.equipmentDownList = this.andonList.filter(item => item.category === 'Equipment Down');
                this.partUnavailableList = this.andonList.filter(item => item.category === 'Part Unavailable');
                this.missingSWSList = this.andonList.filter(item => item.category === 'Missing SWS');
                this.fitIssueList = this.andonList.filter(item => item.category === 'Fit issue');
                this.partDamageList = this.andonList.filter(item => item.category === 'Part Damage');
                this.safetyIssueList = this.andonList.filter(item => item.category === 'Safety issue');

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
