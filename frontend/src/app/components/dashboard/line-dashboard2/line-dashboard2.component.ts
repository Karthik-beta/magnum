import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-line-dashboard2',
  templateUrl: './line-dashboard2.component.html',
  styleUrls: ['./line-dashboard2.component.scss']
})
export class LineDashboard2Component implements OnInit {

    constructor(private service: SharedService, private router: Router) { }

    // machineList = [
    //     { channel: 'WS01',
    //       machine: 'Status',
    //       status: true,
    //       total_on_time: '07:30',
    //       total_idle_time: '00:30',
    //       breakdown_time: '00:00',
    //       alert: '00:23:00',
    //       acknowledge: '00:12:00',
    //       prodCount: 23,
    //       prodTarget: 0,
    //       health: false,
    //     },
    //     { channel: 'WS02',
    //       machine: 'Status',
    //       status: true,
    //       total_on_time: '07:30',
    //       total_idle_time: '00:30',
    //       breakdown_time: '00:00',
    //       alert: '00:23:00',
    //       acknowledge: '00:12:00',
    //       quality: true,
    //       vibration: true,
    //       health: true,
    //     },
    //     { channel: 'WS03',
    //       machine: 'Status',
    //       status: false,
    //       total_on_time: '07:30',
    //       total_idle_time: '00:30',
    //       breakdown_time: '00:00',
    //       alert: '00:23:00',
    //       acknowledge: '00:12:00',
    //       quality: true,
    //       vibration: true,
    //       health: true,
    //     },
    //     { channel: 'WS04',
    //       machine: 'Status',
    //       status: true,
    //       total_on_time: '07:30',
    //       total_idle_time: '00:30',
    //       breakdown_time: '00:00',
    //       alert: '00:23:00',
    //       acknowledge: '00:12:00',
    //       quality: false,
    //       vibration: true,
    //       health: false,
    //     },
    //     { channel: 'WS05',
    //       machine: 'Status',
    //       status: true,
    //       total_on_time: '07:30',
    //       total_idle_time: '00:30',
    //       breakdown_time: '00:00',
    //       alert: '00:23:00',
    //       acknowledge: '00:12:00',
    //       quality: true,
    //       vibration: true,
    //       health: true,
    //     },
    // ]

    machineList: any[] = [];

    generateSampleMachines(count: number) {
        const sampleMachines = [];
        for (let i = 1; i <= count; i++) {
          sampleMachines.push({
            channel: `WS-0${i.toString().padStart(2, '0')}`,
            machine: 'Status',
            ae: (Math.random() * (90 - 50) + 50).toFixed(2),
            pe: (Math.random() * (90 - 50) + 50).toFixed(2),
            qe: (Math.random() * (90 - 50) + 50).toFixed(2),
            oee: +(Math.random() * (90 - 50) + 50).toFixed(2),
            status: Math.random() > 0.3,
            total_on_time: this.getRandomTime(),
            total_idle_time: this.getRandomTime(),
            breakdown_time: '00:00',
            alert: this.getRandomTime(),
            acknowledge: this.getRandomTime(),
            prodCount: Math.floor(Math.random() * 101),
            prodTarget: Math.floor(Math.random() * 101),
            rejection: 0,
            operator: 'Yadav',
            job_work: 'OP-179',
            quality: Math.random() > 0.5,
            vibration: Math.random() > 0.5,
            health: Math.random() > 0.5,
          });
        }
        return sampleMachines;
    }

    getRandomTime(maxHours = 12): string {
        const hours = Math.floor(Math.random() * (maxHours + 1));
        const minutes = Math.floor(Math.random() * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    getOeeStatusClass(oee: number): string {
        if (oee < 75) return 'status-red';
        if (oee < 85) return 'status-yellow';
        return 'status-green';
    }


    bar1Chart: any;

    bar1Options: any;

    private refreshInterval: any;

    ngOnInit() {
        this.initCharts();
        this.getMachineDetails();

        this.timeFunction();

        this.machineList = this.generateSampleMachines(7);

        // Set up automatic refresh every minute (60000 milliseconds)
        this.refreshInterval = setInterval(() => {
            this.refreshData();
        }, 30000);
    }

    private refreshData(): void {
        this.initCharts();
        this.getMachineDetails();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.bar1Chart = {
            labels: [''],
            datasets: [
                {
                    label: 'Running',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [60]
                },
                {
                    label: 'Break Time',
                    backgroundColor: documentStyle.getPropertyValue('--red-400'),
                    borderColor: documentStyle.getPropertyValue('--red-400'),
                    data: [20]
                },
                {
                    label: 'Idle',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: [20]
                }
            ]
        };

        this.bar1Options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 3.5,
            plugins: {
                legend: {
                    display: false,
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
            },
            barPercentage: 0.7,
        };
    }

    machine1List: any[] = [];
    running: number = 0;
    idle: number = 0;
    breaktime: number = 0;
    machineId: string = '';

    navigateToMachineDetails(machineId: number) { // Add parameter here
        this.router.navigate(['/machine_dash'], { queryParams: { machine_id: machineId } });
    }

    getMachineDetails() {

        this.service.getAllMachineDetails().subscribe((data: any) => {
            this.machine1List = data;
            // if (this.machine1List.length > 0) {
            //     this.running = this.machine1List[0].on_time_percentage;
            //     this.idle = this.machine1List[0].idle_time_percentage;
            //     this.breaktime = this.machine1List[0].break_time_percentage;

            //     this.bar1Chart.datasets[0].data = [this.running];
            //     this.bar1Chart.datasets[1].data = [this.breaktime];
            //     this.bar1Chart.datasets[2].data = [this.idle];
            // }
            console.log(this.machine1List);
        });

    }

    ngOnDestroy() {
        clearInterval(this.refreshInterval);
        this.subscription.unsubscribe();
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

    getShift(): string {
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();
        const currentMinute = currentDateTime.getMinutes();
        const currentTime = currentHour + (currentMinute / 60); // Convert to decimal for easier comparison

        // Define shift boundaries
        if (currentTime >= 6.5 && currentTime < 14.5) {
            return 'Shift A, 06:30 - 14:30';
        } else if (currentTime >= 14.5 && currentTime < 22.5) {
            return 'Shift B, 14:30 - 22:30';
        } else {
            return 'Shift C, 22:30 - 06:30';
        }
    }

    currentShift = this.getShift();
}
