import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { timer } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-prod-stats',
  templateUrl: './prod-stats.component.html',
  styleUrls: ['./prod-stats.component.scss']
})
export class ProdStatsComponent implements OnInit{

    planned: number;

    processing: number;

    completed: number;

    transaction_today: number;

    constructor(private service:SharedService) {}

    ngOnInit(): void  {
        this.statsview();
    }

    statsview() {
        timer(0, 10000)  // Emit an initial value immediately and then every 10 seconds
            .pipe(
                switchMap(() => this.service.getProductionStats()),  // Switch to the new observable every 10 seconds
                distinctUntilChanged()  // Only emit when the data changes
            )
            .subscribe((data: any) => {
                this.planned = data.planned;
                this.processing = data.order_in_process;
                this.completed = data.completed;
                this.transaction_today = data.transactions_today;
            });
    }


}
