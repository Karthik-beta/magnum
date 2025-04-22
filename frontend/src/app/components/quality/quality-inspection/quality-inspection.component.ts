import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-quality-inspection',
  templateUrl: './quality-inspection.component.html',
  styleUrls: ['./quality-inspection.component.scss']
})
export class QualityInspectionComponent implements OnInit {

    constructor(private service:SharedService) {}

    loading: boolean = false;
    items: MenuItem[] = [];

    AssemblylineWiseData: any[] = [];

    product_id: string = '';
    inspector: any;
    incharge: any;
    status: any;

    ngOnInit(): void {
        this.loadAssemblyLineWiseData();
        this.getDefectTypeList();

        this.inspector = [
            { name: 'Dhananjay' },
          ],
          this.incharge = [
            { name: 'Raman Singh' },
          ],
        this.status = [
            { name: 'Y' },
            { name: 'N' },
          ],

          this.items = [
            { label: 'Import', icon: 'fas fa-file-import' },
            { label: 'Export', icon: 'fas fa-download' }
        ];
    }

    defectTypeList: any=[];

    getDefectTypeList(){
        this.service.getQcDefectTypes().subscribe(data=>{
            this.defectTypeList=data;
        });
    }

    defect_no: string = '';

    updateSelectedDefectNo() {
    const selectedDefect = this.defectTypeList.find(item => item.defect_name === this.defect_no);

    if (selectedDefect) {
        this.defect_no = selectedDefect.defect_code;
    } else {
        this.defect_no = ''; // Handle the case where the selected defect is not found
    }
    }

    loadAssemblyLineWiseData() {
        this.service.getAssemblyLineWiseData().subscribe(data=>{
        this.AssemblylineWiseData=data;
        this.product_id = this.AssemblylineWiseData[0].product_id;
        });
    }

    getShift(): string {
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();

        // Check if the current hour is between 8 and 20 (8:00 AM to 8:00 PM)
        if (currentHour >= 8 && currentHour < 20) {
          return 'Shift FS, 07 - 19 (11)';
        } else {
          return 'Shift SS, 19 - 07 (11)';
        }

    }

    currentShift = this.getShift();

    getDate(): string {
        const currentDateTime = new Date();

        // Get the current date
        const year = currentDateTime.getFullYear();
        const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = currentDateTime.getDate().toString().padStart(2, '0');

        // Get the current time
        const hours = currentDateTime.getHours().toString().padStart(2, '0');
        const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

        // Combine date and time
        return `${year}-${month}-${day}, ${hours}:${minutes}`;
      }
    currentDate = this.getDate();


    defect_row: boolean = false;

    updateDefectRow() {
        this.defect_row = true;
    }



    selectedOptions = [];
    acceptCount = 0;
    reworkCount = 0;
    rejectCount = 0;
    scrapCount = 0;

    rowNumber = 1;
    rowsArray = [1];

    incrementRowNumber() {
        if (this.selectedOptions[this.rowNumber - 1]) {
            switch (this.selectedOptions[this.rowNumber - 1]) {
                case 'Accept':
                    this.acceptCount++;
                    break;
                case 'Rework':
                    this.reworkCount++;
                    break;
                case 'Reject':
                    this.rejectCount++;
                    break;
                case 'Break':
                    this.scrapCount++;
                    break;
                case 'Scrap':
                    this.scrapCount++;
                    break;
            }
        }

        this.rowNumber++;
        this.selectedOptions.push(null);  // Add a new element to selectedOptions

        // Initialize rowsArray with the required number of elements
        this.rowsArray = Array.from({ length: this.rowNumber }, (_, index) => index + 1);

        console.log(this.rowNumber, this.rowsArray, this.acceptCount, this.reworkCount, this.rejectCount, this.scrapCount);
        console.log(this.selectedOptions);
    }







}
