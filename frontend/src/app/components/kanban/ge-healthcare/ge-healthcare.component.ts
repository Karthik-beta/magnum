import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ge-healthcare',
  templateUrl: './ge-healthcare.component.html',
  styleUrls: ['./ge-healthcare.component.scss']
})
export class GeHealthcareComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        this.timeFunction();
    }

    jcList = [
        { jc: 'JC-001', cycleTime: '02:30', actual: '34', gap: '2' },
        { jc: 'JC-002', cycleTime: '02:30', actual: '34', gap: '2' },
        { jc: 'JC-003', cycleTime: '02:30', actual: '34', gap: '2' },
        { jc: 'JC-004', cycleTime: '02:30', actual: '34', gap: '2' },
        { jc: 'JC-005', cycleTime: '02:30', actual: '34', gap: '2' },
    ];

    currentDate$: Observable<Date>;
        private subscription: Subscription;

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

}
