import { Component } from '@angular/core';

@Component({
  selector: 'app-qc-check-type',
  templateUrl: './qc-check-type.component.html',
  styleUrls: ['./qc-check-type.component.scss']
})
export class QcCheckTypeComponent {


    qcCheckList = [
        {
            gauge: "Screw Gauge",
            thickness: "10 MM"
        }
    ]


}
