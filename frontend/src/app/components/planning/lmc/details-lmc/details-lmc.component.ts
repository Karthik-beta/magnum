import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-details-lmc',
  templateUrl: './details-lmc.component.html',
  styleUrls: ['./details-lmc.component.scss']
})
export class DetailsLmcComponent {

    productionPlanList:any=[];
    slotList: any[] = [];


    constructor(private service: SharedService) {}

    ngOnInit(): void {
        this.getSlotList();
    }

    getSlotList() {
        this.service.getAllMachineSlotConfig().subscribe((data: any) => {
            this.slotList = data;
        });
    }

}
