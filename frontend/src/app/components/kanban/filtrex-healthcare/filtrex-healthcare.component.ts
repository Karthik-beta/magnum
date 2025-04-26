import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filtrex-healthcare',
  templateUrl: './filtrex-healthcare.component.html',
  styleUrls: ['./filtrex-healthcare.component.scss']
})
export class FiltrexHealthcareComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        this.timeFunction();
    }

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
