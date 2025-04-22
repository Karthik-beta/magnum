import { Component, OnInit, OnDestroy  } from '@angular/core';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {


    // 3 Shift Per Day
    // getShiftText(): string {
    //     const currentHour = new Date().getHours();
    //     let shiftText = '';

    //     if (currentHour >= 6 && currentHour < 14) {
    //       shiftText = 'Shift FS : 06:00 to 14:00';
    //     } else if (currentHour >= 14 && currentHour < 22) {
    //       shiftText = 'Shift SS : 14:00 to 22:00';
    //     } else {
    //       shiftText = 'Shift NS : 22:00 to 06:00';
    //     }

    //     return shiftText;
    // }


    getShiftText(): string {
        const currentHour = new Date().getHours();
        let shiftText = '';

        if (currentHour >= 8 && currentHour < 20) {
          shiftText = 'Shift FS : 08:00 to 20:00';
        }
        else {
          shiftText = 'Shift NS : 20:00 to 08:00';
        }

        return shiftText;
    }
}
