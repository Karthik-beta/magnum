import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-qc-defect-type',
  templateUrl: './qc-defect-type.component.html',
  styleUrls: ['./qc-defect-type.component.scss']
})
export class QcDefectTypeComponent implements OnInit {

    constructor(private service:SharedService) { }

    defectTypeList:any=[];

    productLength: number=0;
    productName: string="Visual Inspection Parameter";
    parameterLength: number=0;

    ngOnInit(): void {
        this.getDefectTypeList();
    }

    // getDefectTypeList() {
    //     this.service.getQcDefectTypes().subscribe(data => {
    //       this.defectTypeList = data;

    //     // Ensure the defectTypeList is not empty
    //     if (this.defectTypeList && this.defectTypeList.length > 0) {
    //         // Extract the first 'product_name' into a variable
    //         const firstProductName = this.defectTypeList[0].product_name;

    //         // Now 'firstProductName' holds the value of the first 'product_name'
    //         console.log('First product_name:', firstProductName);

    //         // Remove 'product_name' from all items except the first one
    //         this.defectTypeList.forEach(item => {
    //         // Check if the current item is not the first one
    //         if (item !== this.defectTypeList[0]) {
    //             // Remove the 'product_name' from the current item
    //             delete item.product_name;
    //         }
    //         });

    //         // Now 'defectTypeList' contains only the first 'product_name' entry
    //         // console.log('List:', this.defectTypeList);
    //         console.log('Length:', this.productLength);
    //     }
    //     });
    //   }

    getDefectTypeList() {
        this.service.getQcDefectTypes().subscribe(data => {
          this.defectTypeList = data;

          // Ensure the defectTypeList is not empty
          if (this.defectTypeList && this.defectTypeList.length > 0) {
            // Extract the first 'product_name' into a variable
            const firstProductName = this.defectTypeList[0].product_name;

            // Now 'firstProductName' holds the value of the first 'product_name'
            console.log('First product_name:', firstProductName);

            // Remove repeated 'parameter_name' except the first occurrence
            const seenParameterNames = new Set<string>();
            this.defectTypeList.forEach(item => {
              // Check if the current 'parameter_name' has been seen before
              if (seenParameterNames.has(item.parameter_name)) {
                // Remove 'parameter_name' from the current item
                delete item.parameter_name;
              } else {
                // Mark 'parameter_name' as seen
                seenParameterNames.add(item.parameter_name);
              }

              // Check if the current item is not the first one
                if (item !== this.defectTypeList[0]) {
                    // Remove the 'product_name' from the current item
                    delete item.product_name;
                }
            });

            // Now 'defectTypeList' contains only the first occurrence of each 'parameter_name'
            console.log('List:', this.defectTypeList);
            console.log('Length:', this.productLength);
          }
        });
      }






}
