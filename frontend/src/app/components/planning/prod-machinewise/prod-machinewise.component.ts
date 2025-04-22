import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { map, switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-prod-machinewise',
  templateUrl: './prod-machinewise.component.html',
  styleUrls: ['./prod-machinewise.component.scss']
})
export class ProdMachinewiseComponent implements OnInit{

    constructor(private service:SharedService, private cdr: ChangeDetectorRef) { }


    machineWiseDataList: any[] = [];
    selectedMachine: string = '';
    machineList: any=[];
    rows: number = 10;
    currentPage: number = 1;
    totalRecords: number = 0;
    text: string = '';
    results: any[] = [];
    rowsPerPageOptions: number[] = [10, 20, 30];



    ModalTitle:string="";
    ActivateAddEditProductionMachineComp:boolean=false;
    prodmach:any;
    items: MenuItem[] = [];




    dummyList: any[] = [
      {
         id: 1,
          jobWork: 'JW001',
          employeeId: 'EMP001',
          productId: 'Casseroles',
          drawingNo: 'DRAW001',
          customer: 'CUSTOMER A',
          poNoAndDate: 'TEST',
          batchNo: 'BATCH001',
          orderQuantity: 24000,
          assigned: '30-09-2023',
          expected: '1-11-2023',
          planned: '01-10-2023',
          processing: '',
          completed: '07-10-2023'
      }
    ];


    jobwork: any;
    plant: any;
    shopfloor: any;
    assembly_line: any;
    machine_id: any;
    product_id: any;

    display: boolean = false;
    loading: boolean = true;


    barChart: any;

    barOptions: any;

    bar2Chart: any;

    bar2Options: any;

    stateOptions: any[] = [
        { label: 'Show', value: 'true' },
        { label: 'Hide', value: 'false' }
    ];

    showElements: string = 'false';

    // showElements = true;


    // toggleElements() {
    //     this.showElements = !this.showElements;
    // }


    ngOnInit(): void {
      this.loadMachineWiseData();
    //   this.getMachineList();
      this.initCharts();
      this.getMachineStatus();

      this.refreshProdPlanList();

      this.timeFunction();

      // Set an interval to refresh the machineList every 1 minute
      setInterval(() => {
        this.currentTime = new Date();
        // this.cdr.detectChanges();
      }, 15000);

      this.jobwork = [
        { name: 'JW-12345678-54'}
      ],
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
      this.product_id = [
        { name: 'CASSEROLES' },
      ],

      this.items = [
        { label: 'Import', icon: 'fas fa-file-import' },
        { label: 'Export', icon: 'fas fa-download', command: ()=> this.downloadMachineWiseData() },
        // { separator: true },
    ];

    }

    // currentDate: Date = new Date();
    currentTime: Date = new Date();

    getShiftText(): string {
      const currentHour = new Date().getHours();
      let shiftText = '';

      if (currentHour >= 6 && currentHour < 14) {
        shiftText = 'Shift FS : 06:00 to 14:00';
      } else if (currentHour >= 14 && currentHour < 22) {
        shiftText = 'Shift SS : 14:00 to 22:00';
      } else {
        shiftText = 'Shift NS : 22:00 to 06:00';
      }

      return shiftText;
    }


    closeClick(){
      this.ActivateAddEditProductionMachineComp=false;
      this.loadMachineWiseData();
    }

    editClick(dataItem: any){
      this.prodmach=dataItem;
      this.ModalTitle="Edit";
      this.ActivateAddEditProductionMachineComp=true;
    }

    onprodMachAdded() {
      this.loadMachineWiseData();
    }


    // loadMachineWiseData() {
    //   const params = {
    //     page: this.currentPage.toString(),
    //     page_size: this.rows.toString(),
    //   };

    //   this.service.getMachineWiseData(params).subscribe((data: any) => {
    //     this.machineWiseDataList = data; // Assuming your API response has a 'results' property

    //     this.totalRecords = data.count;   // Assuming your API response has a 'count' property

    //     console.log(this.machineWiseDataList);
    //   });
    // }

    // onMachineChange() {
    //   const params = {
    //     machine_id: this.selectedMachine,
    //   }
    //   this.service.getMachineWiseData(params).subscribe((data: any) => {
    //     this.machineWiseDataList = data;
    //     // this.machineWiseDataList = this.machineWiseDataList.filter((item: any) => item.machine_id === this.selectedMachine);
    //   });
    //   // this.machineWiseDataList = this.machineWiseDataList.filter((item: any) => item.machine_id === this.selectedMachine);
    // }


    getMachineList() {
      this.service.getMachineList().subscribe((data: any) => {
        this.machineList = data;
      }
      );
    }

    // loadMachineWiseData() {
    //   this.service.getMachineWiseData().subscribe((data: any) => {
    //     this.machineWiseDataList = data;
    //   });
    // }

    // getBackgroundColorStyle(performance: number): any {
    //   let backgroundColor = '';

    //   if (performance > 90) {
    //     backgroundColor = 'green';
    //   } else if (performance >= 80 && performance <= 90) {
    //     backgroundColor = 'yellow';
    //   } else if (performance < 80) {
    //     backgroundColor = 'red';
    //   }

    //   return { 'background-color': backgroundColor };
    // }

    private MachineListSubscription: Subscription;

    private machineStatusSubscription: Subscription;

    loadMachineWiseData() {
        // Use startWith to trigger an initial HTTP request
        this.MachineListSubscription = interval(10000).pipe(
          startWith(0), // emit 0 immediately
          // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
          switchMap(() => this.service.getMachineWiseData()),
          // Use distinctUntilChanged to filter out repeated values
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        ).subscribe((data: any) => {
          this.machineWiseDataList = data;
          this.calculateAveragePerformance(); // Call the function to update averagePerformance
          this.calculateTotalGap();

          this.calculateTotalOnTime();
          this.calculateTotalIdleTime();
          this.calculateActual();
          this.calculateTarget();

          console.log("List",this.machineWiseDataList);
        //   console.log("List",this.AssemblyLineList);
        });
      }

      getStatusClass(status: string): string {
        // Logic to handle 'No Response' and other statuses
        if (status === null || status === undefined) {
            return 'NoResponse';
        }
        if (status === 'No Response') {
            return 'NoResponse';
        }
        // Add other conditions as needed
        if (status === 'Active') {
            return 'Active';
        }
        if (status === 'Idle') {
            return 'Idle';
        }

        return status; // Default behavior if no match
    }


      status: string="";

      getMachineStatus() {
        // Use startWith to trigger an initial HTTP request
        this.machineStatusSubscription = interval(10000).pipe(
          startWith(0), // emit 0 immediately
          // Use switchMap to switch to a new observable (HTTP request) each time the interval emits
          switchMap(() => this.service.getProductionAndon()),
          // Use distinctUntilChanged to filter out repeated values
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
        ).subscribe({
            next: (data: any) => {
                // Handle received data
                this.status = data.map(item => {
                    if (item.r === 'R') {
                        return 'Active';
                    } else if (item.r === 'I') {
                        return 'Idle';
                    } else {
                        return 'No Response';
                    }
                });
                console.log("String", this.status);
            },
            error: (error) => {
                // Handle errors
                console.error('Error fetching machine status:', error);
                // Set status to 'No Response' in case of error
                this.status = 'No Response';
            }
        });
    }


    getBackgroundColorStyle(performance: number): any {
        let backgroundColor = '';

        if (performance > 90) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), green)';
        }
        else if (performance >= 80 && performance <= 90) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), yellow)';
        }
        else if (performance < 80) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), red)';
        }

        return { 'background': backgroundColor };
      }

      getBackgroundColorStyleForGap(gap: number): any {
        let backgroundColor = '';

        if (gap > 0) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), green)';
        }
        else if (gap === 0) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), yellow)';
        }
        else if (gap < 0) {
          backgroundColor = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), red)';
        }

        return { 'background': backgroundColor };
      }


      initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barChart = {
            labels: [''],
            datasets: [
                {
                    label: 'Running',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [65]
                },
                {
                    label: 'Breakdown',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [35]
                }
            ]
        };

        this.barOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 3.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
                    },
                datalabels: {
                    display: true,
                    color: textColor
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
                        color: surfaceBorder,
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
                }
            }
        };

        this.bar2Chart = {
            labels: [''],
            datasets: [
                {
                    label: 'Resetting',
                    backgroundColor: documentStyle.getPropertyValue('--indigo-500'),
                    borderColor: documentStyle.getPropertyValue('--indigo-500'),
                    data: [25]
                },
                {
                    label: 'Engineering',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-400'),
                    borderColor: documentStyle.getPropertyValue('--yellow-400'),
                    data: [15]
                },
                {
                    label: 'Elect Maint',
                    backgroundColor: documentStyle.getPropertyValue('--blue-400'),
                    borderColor: documentStyle.getPropertyValue('--blue-400'),
                    data: [20]
                },
                {
                    label: 'Quality',
                    backgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [10]
                },
                {
                    label: 'Mech Maint',
                    backgroundColor: documentStyle.getPropertyValue('--pink-400'),
                    borderColor: documentStyle.getPropertyValue('--pink-400'),
                    data: [30]
                }
            ]
        };

        this.bar2Options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 3.5,
            plugins: {
                legend: {
                    // display: false,
                    labels: {
                        color: textColor
                    },
                datalabels: {
                    display: true,
                    color: textColor
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
                        color: surfaceBorder,
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
                }
            }
        };
    }



    downloadMachineWiseData() {
        this.service.downloadMachineWiseData().subscribe({
          next: (data) => {
            // Create a Blob object from the response data
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a URL for the Blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element and trigger a click event to download the file
            const a = document.createElement('a');
            a.href = url;

            // Get the current date
            const currentDate = new Date();

            // Format the date as a string (e.g., "2023-09-01")
            const formattedDate = currentDate.toISOString().split('T')[0];

            // Define the filename based on the formatted date
            const filename = `Machine_Data_${formattedDate}.xlsx`;

            // Set the download attribute with the filename
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          },
          error: (error) => {
            // Handle any error that might occur during the download
            console.error('Error downloading employee data:', error);
          }
        });
    }


    currentDate$: Observable<Date>;
    private subscription: Subscription;

    // Declare the currentDate property to hold the current date
    currentDate: Date;

    timeFunction() {
        // Create an observable that emits the current date every second
      this.currentDate$ = interval(1000).pipe(
        // Use the map operator to transform the emitted value to the current date
        map(() => new Date())
      );

      // Subscribe to the observable and update the current date property
      this.subscription = this.currentDate$.subscribe(date => {
        this.currentDate = date;
      });
    }

    // ngOnDestroy() {
    //     // Unsubscribe from the observable to avoid memory leaks
    //     this.subscription.unsubscribe();
    // }

    activityValues: number[] = [0, 100];

    singleMachineList = [
        {
            plant: 'Puducherry',
            shopfloor: 'ORT Shopfloor',
            assemblyline: 'Line 1 Spindle Production',
            machine_id: 'MC - 1',
            start_prod: '2025-01-11, 08 - 20 (11)',
            end_prod: '2025-03-31, 08 - 20 (6.0)',
            state: 'ACTIVE',
            activity: 78
        },
    ]

    lineMachineList: any[] = [];
    assignedStartDate: string = '';
    expectedEndDate: string = '';

    refreshProdPlanList(){
        this.loading = true;

        const params = {
          page: this.currentPage.toString(),
          page_size: this.rows.toString()
        };

        this.service.getLineMachineConfig(params).subscribe((data: any) => {
          this.lineMachineList = data.results; // Assuming your API response has a 'results' property
          this.assignedStartDate = data.results[0].assigned_start_production;
            this.expectedEndDate = data.results[0].assigned_end_production;
        });
      }


      ngOnDestroy() {
        // Unsubscribe from the observable to avoid memory leaks
        this.subscription.unsubscribe();

        // Unsubscribe from the interval observable
        if (this.MachineListSubscription) {
            this.MachineListSubscription.unsubscribe();
        }

        // Unsubscribe from the interval observable
        if (this.machineStatusSubscription) {
            this.machineStatusSubscription.unsubscribe();
        }
    }

    averagePerformance: number = 0;
    totalGapNumber: number = 0;
    totalOnTime: number = 0;
    totalIdleTime: number = 0;
    totalActual: number = 0;
    totalTarget: number = 0;

    calculateAveragePerformance(): void {
        const performances = this.machineWiseDataList.map(item => item.performance);

        if (performances.length > 0) {
          const totalPerformance = performances.reduce((sum, performance) => sum + performance, 0);
          this.averagePerformance = parseFloat((totalPerformance / performances.length).toFixed(1));
        //   console.log("Average Performance",this.averagePerformance);
        } else {
          console.error("No performance data available.");
          this.averagePerformance = 0; // or any default value
        }
    }

    calculateTotalGap(): void {
        const gaps = this.machineWiseDataList.map(item => item.gap);

        // Create a function to add all the gap values from above
        const totalGap = gaps.reduce((sum, gap) => sum + gap, 0);
        this.totalGapNumber = totalGap;
        // console.log("Total Gap",totalGap);

    }

    calculateTotalOnTime(): void {
        const gaps = this.machineWiseDataList.map(item => item.on_time);

        // Create a function to add all the gap values from above
        const totalOnTime = gaps.reduce((sum, on_time) => sum + on_time, 0);
        this.totalOnTime = Math.round(totalOnTime);
        // console.log("Total Gap",totalGap);

    }

    calculateTotalIdleTime(): void {
        const gaps = this.machineWiseDataList.map(item => item.idle_time);

        // Create a function to add all the gap values from above
        const totalIdleTime = gaps.reduce((sum, idle_time) => sum + idle_time, 0);
        // this.totalIdleTime = totalIdleTime;
        // Round off the total idle time to up to two decimal places
        this.totalIdleTime = parseFloat(totalIdleTime.toFixed(2));

    }

    calculateActual(): void {
        const gaps = this.machineWiseDataList.map(item => item.actual);

        // Create a function to add all the gap values from above
        const totalActual = gaps.reduce((sum, actual) => sum + actual, 0);
        this.totalActual = totalActual;

    }

    calculateTarget(): void {
        const gaps = this.machineWiseDataList.map(item => item.target);

        // Create a function to add all the gap values from above
        const totalTarget = gaps.reduce((sum, target) => sum + target, 0);
        this.totalTarget = totalTarget;

    }

    getShift(): string {
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();

        // Check if the current hour is between 8 and 20 (8:00 AM to 8:00 PM)
        switch (true) {
            case currentHour >= 8 && currentHour < 14:
                return 'Shift A, 06 - 14 (7)';
            case currentHour >= 14 || currentHour < 22:
                return 'Shift B, 14 - 22 (7)';
            case currentHour >= 22 && currentHour < 6:
                return 'Shift C, 22 - 06 (7)';
            default:
                // Add your additional case statements here
                return 'Shift A, 06 - 14 (7)';
        }

    }

    currentShift = this.getShift();

  }
