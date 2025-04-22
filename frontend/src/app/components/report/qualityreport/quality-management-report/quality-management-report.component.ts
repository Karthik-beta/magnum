import { Component } from '@angular/core';

@Component({
  selector: 'app-quality-management-report',
  templateUrl: './quality-management-report.component.html',
  styleUrls: ['./quality-management-report.component.scss']
})
export class QualityManagementReportComponent {

    rows: number = 10;
    currentPage: number = 1;
    totalRecords: number = 0;
    text: string = '';
    results: any[] = [];
    rowsPerPageOptions: number[] = [10, 20, 30];
    loading: boolean = false;

}
