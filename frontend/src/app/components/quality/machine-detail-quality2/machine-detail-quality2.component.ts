import { Component } from '@angular/core';

@Component({
  selector: 'app-machine-detail-quality2',
  templateUrl: './machine-detail-quality2.component.html',
  styleUrls: ['./machine-detail-quality2.component.scss']
})
export class MachineDetailQuality2Component {



    activityValues: number[] = [0, 100];

    machineList = [
        {
            plant: 'Chennai',
            shopfloor: 'Shopfloor - 1',
            assemblyline: 'Assemblyline - 1',
            machine_id: 'SG05-250T',
            start_prod: '2024-01-11, 08 - 20 (11)',
            end_prod: '2024-03-09, 08 - 20 (6.0)',
            state: 'ACTIVE',
            activity: 78
        },
        // {
        //     plant: 'CHENNAI',
        //     shopfloor: 'XYZ',
        //     assemblyline: 'TSE',
        //     machine_id: 'TSE-002',
        //     state: 'IDLE',
        //     activity: 32
        // },
        // {
        //     plant: 'CHENNAI',
        //     shopfloor: 'XYZ',
        //     assemblyline: 'TSE',
        //     machine_id: 'TSE-003',
        //     state: 'BREAKDOWN',
        //     activity: 87
        // }
    ]



}
