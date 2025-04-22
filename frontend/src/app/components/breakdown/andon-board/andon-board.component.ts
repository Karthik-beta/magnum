import { Component, OnInit } from '@angular/core';

interface TimeSegmentDataPoint {
    x: [number, number]; // [startMinutes, endMinutes] on the X-axis
    y: string;          // Workstation label on the Y-axis
  }

@Component({
  selector: 'app-andon-board',
  templateUrl: './andon-board.component.html',
  styleUrls: ['./andon-board.component.scss']
})
export class AndonBoardComponent implements OnInit {

    timelineData: any = null;
    timelineOptions: any;
    // workstations = ['WS-001', 'WS-002', 'WS-003', 'WS-004', 'WS-005'];
    workstations: string[] = [];

    totalMinutes = (18 - 8) * 60; // 600 minutes

    ngOnInit() {
        this.generateWorkstations()
        this.generateTimelineData();
        this.configureChartOptions();
    }

    generateWorkstations() {
        // const workstations: string[] = [];
          // Generate workstation labels from WS-001 to WS-035
          // Adjust the range as needed
          for (let i = 1; i <= 20; i++) {
            const formattedNumber = i.toString().padStart(3, '0'); // Pad with leading zeros
              this.workstations.push(`WS-${formattedNumber}`);
            }

        console.log(this.workstations);

        // for (let i = 1; i <= 35; i++) {
        //     const formattedNumber = i.toString().padStart(3, '0'); // Pad with leading zeros
        //     workstations.push(`WS-${formattedNumber}`);
        //   }
    }

    generateTimelineData() {
      const runningSegments: TimeSegmentDataPoint[] = [];
      const breakdownSegments: TimeSegmentDataPoint[] = [];

      this.workstations.forEach(wsLabel => {
        let currentTime = 0;
        const intervalMinutes = 1;

        while (currentTime < this.totalMinutes) {
          const duration = Math.min(
            (Math.floor(Math.random() * 6) + 1) * intervalMinutes,
            this.totalMinutes - currentTime
          );
          const endTime = currentTime + duration;
          const isRunning = Math.random() < 0.8; // Keep generating both types

          const segment: TimeSegmentDataPoint = {
            x: [currentTime, endTime],
            y: wsLabel
          };

          if (isRunning) {
            runningSegments.push(segment);
          } else {
            breakdownSegments.push(segment);
          }

          currentTime = endTime;
        }
      });

      this.timelineData = {
        datasets: [
          {
            label: 'Running',
            backgroundColor: 'green',
            borderColor: 'green',
            data: runningSegments,
            barPercentage: 0.8,
            categoryPercentage: 0.7,
            stack: 'timeline' // Assign to stack group 'timeline'
          },
          {
            label: 'Breakdown',
            backgroundColor: 'red',
            borderColor: 'red',
            data: breakdownSegments,
            barPercentage: 0.8,
            categoryPercentage: 0.7,
            stack: 'timeline' // Assign to the SAME stack group 'timeline'
          }
        ]
      };
    }

    configureChartOptions() {
      this.timelineOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
             enabled: true, // Ensure tooltips are on
             mode: 'nearest', // Or 'index', 'point', 'dataset'
             intersect: true,
             callbacks: {
              label: (context: any) => {
                const datasetLabel = context.dataset.label || '';
                const value = context.raw?.x as number[];
                if (value) {
                  const start = value[0];
                  const end = value[1];
                  const duration = end - start;
                  const startTimeStr = this.formatTime(start);
                  const endTimeStr = this.formatTime(end);
                  // Add workstation label to tooltip for clarity
                  const workstationLabel = context.raw?.y || '';
                  return `${workstationLabel} - ${datasetLabel}: ${duration} min (${startTimeStr} - ${endTimeStr})`;
                }
                return '';
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: this.totalMinutes,
            stacked: false, // KEEP stacked true on the value axis
            title: {
               display: false,
            //    text: 'Time (08:00 to 18:00)'
            },
            ticks: {
              stepSize: 60,
              callback: (value: any) => this.formatTime(value)
            },
            grid: {
               color: '#eee'
            }
          },
          y: {
            type: 'category',
            offset: true,
            title: {
               display: false
            },
             grid: {
               display: false
            }
             // No 'stacked' property needed here
          }
        }
      };
    }

    formatTime(totalMinutes: number): string {
      const hours = Math.floor(totalMinutes / 60) + 8;
      const minutes = totalMinutes % 60;
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}`;
    }
}
