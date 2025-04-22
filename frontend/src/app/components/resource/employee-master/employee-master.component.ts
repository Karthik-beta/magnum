import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.scss']
})
export class EmployeeMasterComponent implements OnInit {

    combinedLogs: any[] = [];
    totalRecords: number = 0;
    rowsPerPageOptions: number[] = [10, 20, 30];
    rows: number = 10;
    currentPage: number = 1;
    loading: boolean = false;
    rangeDates: Date[] | undefined;


    dummyList: any[] = [
        {
            employee_id: 1,
            device_enroll_id: '001',
            employee_name: 'Ramesh',
            company: 'HAMILTON',
            location: 'CHENNAI',
            job_type: 'PERMANENT',
            department: 'XYZ',
            designation: 'Operator',
            category: 'ABC',
            date_of_joining: '30-09-2023',
            status: 'ACTIVE',
            },
            {
            employee_id: 2,
            device_enroll_id: '002',
            employee_name: 'Suresh',
            company: 'HAMILTON',
            location: 'CHENNAI',
            job_type: 'PERMANENT',
            department: 'XYZ',
            designation: 'Operator',
            category: 'ABC',
            date_of_joining: '30-09-2023',
            status: 'ACTIVE',
            },
            {
            employee_id: 3,
            device_enroll_id: '003',
            employee_name: 'Mahesh',
            company: 'HAMILTON',
            location: 'CHENNAI',
            job_type: 'PERMANENT',
            department: 'XYZ',
            designation: 'Operator',
            category: 'ABC',
            date_of_joining: '30-09-2023',
            status: 'ACTIVE',
            },
            {
                employee_id: 4,
                device_enroll_id: '004',
                employee_name: 'Naresh',
                company: 'HAMILTON',
                location: 'CHENNAI',
                job_type: 'PERMANENT',
                department: 'XYZ',
                designation: 'Operator',
                category: 'ABC',
                date_of_joining: '30-09-2023',
                status: 'ACTIVE',
                },
                {
                    employee_id: 5,
                    device_enroll_id: '005',
                    employee_name: 'Umesh',
                    company: 'HAMILTON',
                    location: 'CHENNAI',
                    job_type: 'PERMANENT',
                    department: 'XYZ',
                    designation: 'Operator',
                    category: 'ABC',
                    date_of_joining: '30-09-2023',
                    status: 'ACTIVE',
                    },
                    {
                        employee_id: 6,
                        device_enroll_id: '006',
                        employee_name: 'Dinesh',
                        company: 'HAMILTON',
                        location: 'CHENNAI',
                        job_type: 'PERMANENT',
                        department: 'XYZ',
                        designation: 'Operator',
                        category: 'ABC',
                        date_of_joining: '30-09-2023',
                        status: 'ACTIVE',
                        },
    ];




    text: string = '';
    results: any[] = [];

    selectedEmployee: any = null; // Declare selectedEmployee here

    ModalTitle: string = "";
    ActivateAddEditEmp: boolean = false;
    emp: any;

    visible: boolean = false;

    items: MenuItem[] = [];


    stateOptions: any[] = [
        { label: 'Show', value: 'true' },
        { label: 'Hide', value: 'false' }
    ];

    showElements: string = 'true';



    showDialog() {
      this.visible = true;
    }


    constructor(private service: SharedService, private messageService: MessageService, private confirmationService: ConfirmationService) { }


    addClick() {
      this.emp = {
        employee_id: null,
        device_enroll_id: "",
        employee_name: "",
        company: "",
        location: "",
      };
      this.ModalTitle = "Add New Employee";
      this.ActivateAddEditEmp = true;
    }

    onEmployeeAdded() {
      this.loadData();
    }


    closeClick() {
      this.ActivateAddEditEmp = false;
      this.loadData();
      // window.location.reload();
    }

    editClick(item: any) {
      // console.log(log);
      this.emp = item;
      this.ModalTitle = "Edit Employee Details";
      this.ActivateAddEditEmp = true;
    }

    deleteClick(item: { employee_id: any }) {
      // Extract the employee_id from the log object
      const employeeId = item.employee_id;

      // Display the confirmation dialog before proceeding with deletion
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this employee?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // Call the deleteEmployee method from the service
          this.service.deleteEmployee(employeeId).subscribe({
            next: (response) => {
              // Handle success response if needed
              // console.log('Employee deleted:', response);

              // Show success message
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Employee has been deleted successfully.'
              });

              // Load data
              this.loadData();
            },
            error: (error) => {
              // Handle error if needed
              console.error('Error deleting employee:', error);

              // Show error message
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete employee.'
              });
            }
          });
        },
        reject: () => {
          // User rejected the confirmation, do nothing or handle as needed
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have Cancelled' });
          // console.log('Deletion cancelled by user.');
        }
      });
    }




    ngOnInit(): void {
      this.loadData();

      this.items = [
        { label: 'Import', icon: 'fas fa-file-import' },
        { label: 'Export', icon: 'fas fa-download' },
    ];
    }

    loadData(): void {
      this.loading = true;

      const params = {
        page: this.currentPage.toString(),
        page_size: this.rows.toString(),
        employeeid: this.selectedEmployee ? this.selectedEmployee.employeeid : '',
      };

    //   this.service.getEmployeeList(params).subscribe((data: any) => {
    //     this.combinedLogs = data.results; // Assuming your API response has a 'results' property
    //     this.totalRecords = data.count;   // Assuming your API response has a 'count' property
    //     this.loading = false;
    //   });
    }




    onPageChange(event: any): void {
      this.rows = event.rows;
      this.currentPage = event.page;

      this.loadData();
    }

    loadLogs(event: TableLazyLoadEvent): void {
      this.loading = true;

      const params: any = {
        page: ((event.first || 0) / (event.rows || 10) + 1).toString(),
        page_size: (event.rows || 10).toString(),
        sortField: event.sortField || '',
        sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
        employee_id: this.selectedEmployee ? this.selectedEmployee.employee_id : '',
      };

    //   this.service.getEmployeeList(params).subscribe((data: any) => {
    //     this.combinedLogs = data.results;
    //     this.totalRecords = data.count;
    //     this.loading = false;
    //   });
    }

    getShiftStatusColor(shiftStatus: string): string {
      if (shiftStatus === 'A') {
        return 'red';
      } else if (shiftStatus === 'P') {
        return 'green';
      } else if (shiftStatus === 'A/P' || shiftStatus === 'P/A') {
        return 'orange';
      } else {
        return '';
      }
    }

    search(event: any) {
      // const searchTerm = event.query;
      // this.service.getCombinedAutocompleteSuggestions(searchTerm)
      //   .subscribe(data => {
      //     this.results = data;
      //   });
    }

    onEmployeeSelected(selectedEmployee: any) {
      this.selectedEmployee = selectedEmployee;

      // Update the selected employee details based on the selectedEmployee object
      const params = {
        page: this.currentPage.toString(),
        page_size: this.rows.toString(),
        employee_id: this.selectedEmployee ? this.selectedEmployee.employee_id : '',
      };

      // this.service.getEmployeeDetails(params).subscribe((data: any) => {
      //   this.combinedLogs = data.results;
      //   this.totalRecords = data.count;
      //   this.loading = false;
      // });
    }




    downloadEmployeeData() {
      // this.service.downloadEmployeeData().subscribe({
      //   next: (data) => {
      //     // Create a Blob object from the response data
      //     const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      //     // Create a URL for the Blob
      //     const url = window.URL.createObjectURL(blob);

      //     // Create a link element and trigger a click event to download the file
      //     const a = document.createElement('a');
      //     a.href = url;

      //     // Get the current date
      //     const currentDate = new Date();

      //     // Format the date as a string (e.g., "2023-09-01")
      //     const formattedDate = currentDate.toISOString().split('T')[0];

      //     // Define the filename based on the formatted date
      //     const filename = `employee_data_${formattedDate}.xlsx`;

      //     // Set the download attribute with the filename
      //     a.download = filename;

      //     document.body.appendChild(a);
      //     a.click();

      //     // Clean up
      //     window.URL.revokeObjectURL(url);
      //     document.body.removeChild(a);
      //   },
      //   error: (error) => {
      //     // Handle any error that might occur during the download
      //     console.error('Error downloading employee data:', error);
      //   }
      // });
    }



  }
