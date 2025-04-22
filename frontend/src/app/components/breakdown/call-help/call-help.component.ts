import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-call-help',
  templateUrl: './call-help.component.html',
  styleUrls: ['./call-help.component.scss']
})
export class CallHelpComponent implements OnInit {



    bar1Chart: any;

    bar1Options: any;


    bar2Chart: any;

    bar2Options: any;

    display: boolean = false;

    stateOptions: any[] = [
        { label: 'Show', value: 'true' },
        { label: 'Hide', value: 'false' }
    ];

    showElements: string = 'false';


    dummyList: any[] = [
        {
            company: 'HAMILTON',
            location: 'CHENNAI',
            shopfloor: 'XYZ',
            assemblyline: 'TSE',
            machine_id: 'TSE-001',
            category: 'RESETTING',
            sub_category: '',
            alert_shift: 'SS',
            employee: '[EMPNAME, ID]',
            andon_alert: '22-11-2023 14:06',
            andon_acknowledge: '22-11-2023 15:06',
            andon_resolved: '22-11-2023 16:06',
            total_breakdown: '00:02:00'
        }
    ];

    currentTime: Date = new Date();


    ngOnInit() {
        this.initCharts();

        this.getCurrentTime();
        setInterval(() => {
        this.getCurrentTime();
        }, 1000);

        this.addRow();
    }

    getCurrentTime(): void {
        this.currentTime = new Date();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.bar1Chart = {
            labels: ['Efficiency'],
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

        this.bar1Options = {
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
            labels: ['Category'],
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

    login: string = "";
    machineId: string = "";
    ticket: string = "";
    category: string = "";
    sub_category: string = "";
    alert_shift: string = "";
    andon_alerts: string = "";
    andon_acknowledge: string = "";
    andon_resolved: string = "";

    categoryCompleted: boolean = false;
    subCategoryCompleted: boolean = false;
    selectedCategory: string="";

    getShiftText(): string {
        const currentHour = new Date().getHours();
        let shiftText = '';

        if (currentHour >= 6 && currentHour < 14) {
          shiftText = 'Shift FS : 06:00 to 14:00';
          this.alert_shift = 'FS';
        } else if (currentHour >= 14 && currentHour < 22) {
          shiftText = 'Shift SS : 14:00 to 22:00';
          this.alert_shift = 'SS';
        } else {
          shiftText = 'Shift NS : 22:00 to 06:00';
          this.alert_shift = 'NS';
        }

        return shiftText;
      }


      alertRows: number[] = [];

      rows: any[] = [];

      startTimer(row) {
        row.timer = setInterval(() => {
          const currentTime = new Date().getTime();
          const startTime = row.alertStartTime?.getTime() || 0;
          const elapsedMilliseconds = currentTime - startTime;
          row.counter = this.formatTotalBreakdownTime(Math.floor(elapsedMilliseconds / 1000));
        }, 1000);
        console.log('Timer started:', row.timer);
      }


      stopTimer(row) {
        console.log('Stopping timer for row:', row);
        clearInterval(row.timer);
        console.log('Timer stopped for row:', row);
      }

      addRow() {
        const newRow = {
          andonAlertCompleted: false,
          andonAlertTimestamp: null,
          alertStartTime: null,
          acknowledgeButton: false,
          counterDisplay: false,
          andonAcknowledgeCompleted: false,
          andonAcknowledgeTimestamp: null,
          resolvedButton: false,
          andonResolvedCompleted: false,
          andonResolvedTimestamp: null,
        //   timer: null
        };
        this.rows.push(newRow);
        // this.startTimer(newRow);
      }

  onNewAlert() {
    this.addRow();
  }

  onAndonAlert(row) {
    row.andonAlertCompleted = true;
    row.andonAlertTimestamp = new Date();
    row.alertStartTime = new Date();
    this.startTimer(row);
    // this.startTimer(); // You might need to modify this to work with multiple rows
    row.acknowledgeButton = true;
    row.counterDisplay = true;
    this.onNewAlert();
  }

  onAndonAcknowledge(row) {
    row.andonAcknowledgeCompleted = true;
    row.andonAcknowledgeTimestamp = new Date();
    row.resolvedButton = true;
  }

  onAndonResolved(row) {
    row.andonResolvedCompleted = true;
    row.andonResolvedTimestamp = new Date();
    this.stopTimer(row);
    console.log('Resolving:', row);
    // this.stopTimer(); // You might need to modify this to work with multiple rows
  }



    andonAlertCompleted = false;
    andonAcknowledgeCompleted = false;
    andonResolvedCompleted = false;
    andonAlertTimestamp: Date | null = null;
    andonAcknowledgeTimestamp: Date | null = null;
    andonResolvedTimestamp: Date | null = null;

    acknowledgeButton = false;
    resolvedButton = false;

    counterDisplay = false;


//Old but working
    // onAndonAlert(): void {
    //   this.andonAlertCompleted = true;
    //   this.andonAlertTimestamp = new Date();
    //   this.alertStartTime = new Date();
    //   this.startTimer();
    //   this.acknowledgeButton = true;
    //   this.counterDisplay = true;
    // }

    // onAndonAcknowledge(): void {
    //   this.andonAcknowledgeCompleted = true;
    //   this.andonAcknowledgeTimestamp = new Date();
    //   this.resolvedButton = true;
    // }

    // onAndonResolved(): void {
    //   this.andonResolvedCompleted = true;
    //   this.andonResolvedTimestamp = new Date();
    //   this.stopTimer();
    // }

    // getFormattedTimestamp(timestamp: Date | null): string {
    //   if (!timestamp) {
    //     return '';
    //   }

    //   return timestamp.toLocaleString();
    // }

    getFormattedTimestamp(timestamp: Date | null): string {
      if (!timestamp) {
        return '';
      }

      const datePipe = new DatePipe('en-US');
      const formattedTimestamp = datePipe.transform(timestamp, 'dd-MM-yyyy HH:mm');

      return formattedTimestamp || ''; // Ensure it returns an empty string if formattedTimestamp is null
    }



    alertStartTime: Date | null = null;
    timerInterval: any;
    counter: string = '00:00:00';

    //old but working
    // startTimer(): void {
    //   this.timerInterval = setInterval(() => {
    //     const currentTime = new Date().getTime();
    //     const startTime = this.alertStartTime?.getTime() || 0;
    //     const elapsedMilliseconds = currentTime - startTime;
    //     this.counter = this.formatTotalBreakdownTime(Math.floor(elapsedMilliseconds / 1000));
    //   }, 1000);
    // }

    // stopTimer(): void {
    //   clearInterval(this.timerInterval);
    // //   this.counter = '00:00';
    // }


    formatTotalBreakdownTime(time: number): string {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      return formattedTime;
    }

    padZero(num: number): string {
      return num.toString().padStart(2, '0');
    }

    calculateTotalMinutes(andonList: any[]): number {
      let totalMinutes = 0;
      for (const dataItem of andonList) {
        const timeParts = dataItem.total_time.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const timeInMinutes = hours * 60 + minutes;
        totalMinutes += timeInMinutes;
      }
      return totalMinutes;
    }


    calculateTotalResettingMinutes(andonList: any[]): number {
      let totalMechanicalMinutes = 0;
      for (const dataItem of andonList) {
        if (dataItem.category === 'RESETTING') {
          const timeParts = dataItem.total_time.split(':');
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          const timeInMinutes = hours * 60 + minutes;
          totalMechanicalMinutes += timeInMinutes;
        }
      }
      return totalMechanicalMinutes;
    }


    calculateTotalEngineeringMinutes(andonList: any[]): number {
      let totalEngineeringMinutes = 0;
      for (const dataItem of andonList) {
        if (dataItem.category === 'ENGINEERING') {
          const timeParts = dataItem.total_time.split(':');
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          const timeInMinutes = hours * 60 + minutes;
          totalEngineeringMinutes += timeInMinutes;
        }
      }
      return totalEngineeringMinutes;
    }


    calculateTotalElectMinutes(andonList: any[]): number {
      let totalElectMinutes = 0;
      for (const dataItem of andonList) {
        if (dataItem.category === 'ELECT MAINT') {
          const timeParts = dataItem.total_time.split(':');
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          const timeInMinutes = hours * 60 + minutes;
          totalElectMinutes += timeInMinutes;
        }
      }
      return totalElectMinutes;
    }

    calculateTotalQualityMinutes(andonList: any[]): number {
      let totalQualityMinutes = 0;
      for (const dataItem of andonList) {
        if (dataItem.category === 'QUALITY') {
          const timeParts = dataItem.total_time.split(':');
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          const timeInMinutes = hours * 60 + minutes;
          totalQualityMinutes += timeInMinutes;
        }
      }
      return totalQualityMinutes;
    }

    calculateTotalMechMinutes(andonList: any[]): number {
      let totalMechMinutes = 0;
      for (const dataItem of andonList) {
        if (dataItem.category === 'MECH MAINT') {
          const timeParts = dataItem.total_time.split(':');
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          const timeInMinutes = hours * 60 + minutes;
          totalMechMinutes += timeInMinutes;
        }
      }
      return totalMechMinutes;
    }


}
