import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-line-dashboard',
  templateUrl: './line-dashboard.component.html',
  styleUrls: ['./line-dashboard.component.scss']
})
export class LineDashboardComponent implements OnInit {

    constructor(private service: SharedService, private router: Router) { }

    machineList = [
        { channel: 'WS01',
          machine: 'Status',
          status: true,
          total_on_time: '07:30',
          total_idle_time: '00:30',
          breakdown_time: '00:00',
          alert: '00:23:00',
          acknowledge: '00:12:00',
          prodCount: 23,
          prodTarget: 0,
          health: false,
        },
        { channel: 'WS02',
          machine: 'Status',
          status: true,
          total_on_time: '07:30',
          total_idle_time: '00:30',
          breakdown_time: '00:00',
          alert: '00:23:00',
          acknowledge: '00:12:00',
          quality: true,
          vibration: true,
          health: true,
        },
        { channel: 'WS03',
          machine: 'Status',
          status: false,
          total_on_time: '07:30',
          total_idle_time: '00:30',
          breakdown_time: '00:00',
          alert: '00:23:00',
          acknowledge: '00:12:00',
          quality: true,
          vibration: true,
          health: true,
        },
        { channel: 'WS04',
          machine: 'Status',
          status: true,
          total_on_time: '07:30',
          total_idle_time: '00:30',
          breakdown_time: '00:00',
          alert: '00:23:00',
          acknowledge: '00:12:00',
          quality: false,
          vibration: true,
          health: false,
        },
        { channel: 'WS05',
          machine: 'Status',
          status: true,
          total_on_time: '07:30',
          total_idle_time: '00:30',
          breakdown_time: '00:00',
          alert: '00:23:00',
          acknowledge: '00:12:00',
          quality: true,
          vibration: true,
          health: true,
        },
    ]

    machineList1: any[] = [];


    andonList: any[] = [];

    bar1Chart: any;

    bar1Options: any;

    private refreshInterval: any;

    ngOnInit() {
        this.initCharts();
        this.getMachineDetails();
        this.refreshAndList();

        this.timeFunction();

        // Set up automatic refresh every minute (60000 milliseconds)
        this.refreshInterval = setInterval(() => {
            this.refreshData();
        }, 30000);
    }

    private refreshData(): void {
        this.initCharts();
        this.getMachineDetails();
        this.refreshAndList();
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

    refreshAndList(): void {
    const params = {
        page: 1,
        page_size: 100,
    };

    // Define your fixed five machines (adjust IDs as needed)
    const fixedMachines = ['WS-001', 'WS-002', 'WS-003', 'WS-004', 'WS-005'];

    this.service.getAndList(params).subscribe((data: any) => {
        this.andonList = data.results;

        // Get today's 08:00 and 18:00
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const shiftStart = new Date(today.getTime());
        shiftStart.setHours(8, 0, 0, 0);
        const shiftEnd = new Date(today.getTime());
        shiftEnd.setHours(18, 0, 0, 0);
        const currentShiftEnd = now < shiftEnd ? now : shiftEnd;

        this.machineList1 = fixedMachines.map(machineId => {
            // Filter records for this machine and today
            const records = this.andonList.filter(item =>
                item.machineId === machineId &&
                item.raise_alert &&
                new Date(item.raise_alert).setHours(0,0,0,0) === today.getTime()
            );

            // If no records, show only total_on_time, rest as 00:00
            if (records.length === 0) {
                const total_on_time_sec = Math.floor((currentShiftEnd.getTime() - shiftStart.getTime()) / 1000);
                const formatTime = (sec: number) => {
                    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
                    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
                    const s = Math.floor(sec % 60).toString().padStart(2, '0');
                    return `${h}:${m}:${s}`;
                };
                return {
                    channel: machineId,
                    machine: 'Status',
                    status: true,
                    total_on_time: formatTime(total_on_time_sec),
                    total_idle_time: '00:00',
                    breakdown_time: '00:00',
                    alert: '00:00',
                    acknowledge: '00:00',
                };
            }

            // Breakdown time: sum of total_time (assume total_time is in seconds)
            let breakdown_time_sec = records.reduce((sum, rec) => sum + (rec.total_time ? timeStringToSeconds(rec.total_time) : 0), 0);

            // total_on_time: (current time or 18:00) - 08:00 - breakdown_time
            let total_on_time_sec = Math.floor((currentShiftEnd.getTime() - shiftStart.getTime()) / 1000) - breakdown_time_sec;
            if (total_on_time_sec < 0) total_on_time_sec = 0;

            // total_idle_time = total_on_time - breakdown_time
            let total_idle_time_sec = breakdown_time_sec;
            if (total_idle_time_sec < 0) total_idle_time_sec = 0;

            // Alert time: sum of (andon_acknowledge - raise_alert) for today
            let alert_time_sec = records.reduce((sum, rec) => {
                if (rec.raise_alert && rec.andon_acknowledge) {
                    const start = new Date(rec.raise_alert);
                    const end = new Date(rec.andon_acknowledge);
                    if (end > start) {
                        return sum + Math.floor((end.getTime() - start.getTime()) / 1000);
                    }
                }
                return sum;
            }, 0);

            // Acknowledge time: sum of (andon_resolved - andon_acknowledge) for today
            let acknowledge_time_sec = records.reduce((sum, rec) => {
                if (rec.andon_acknowledge && rec.andon_resolved) {
                    const start = new Date(rec.andon_acknowledge);
                    const end = new Date(rec.andon_resolved);
                    if (end > start) {
                        return sum + Math.floor((end.getTime() - start.getTime()) / 1000);
                    }
                }
                return sum;
            }, 0);

            // Helper functions
            function timeStringToSeconds(time: string): number {
                if (!time) return 0;
                const parts = time.split(':').map(Number);
                if (parts.length !== 3) return 0;
                return parts[0] * 3600 + parts[1] * 60 + parts[2];
            }
            const formatTime = (sec: number) => {
                if (!isFinite(sec) || sec < 0) sec = 0;
                const h = Math.floor(sec / 3600).toString().padStart(2, '0');
                const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
                const s = Math.floor(sec % 60).toString().padStart(2, '0');
                return `${h}:${m}:${s}`;
            };

            return {
                channel: machineId,
                machine: 'Status',
                status: true,
                total_on_time: formatTime(total_on_time_sec),
                total_idle_time: formatTime(total_idle_time_sec),
                breakdown_time: formatTime(breakdown_time_sec),
                alert: formatTime(alert_time_sec),
                acknowledge: formatTime(acknowledge_time_sec),
            };
        });
    });
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
