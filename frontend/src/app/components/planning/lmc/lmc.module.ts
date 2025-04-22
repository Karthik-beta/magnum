import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LmcRoutingModule } from './lmc-routing.module';

import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { SplitButtonModule } from 'primeng/splitbutton';
import { DetailsLmcComponent } from './details-lmc/details-lmc.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';





@NgModule({
    imports: [
        CommonModule,
        LmcRoutingModule,

        InputMaskModule,
        InputNumberModule,
        InputTextModule,
        SplitButtonModule,
        TableModule,
        ToastModule,
        MessagesModule,
    ],
    declarations: [
    //   DetailsLmcComponent
    ]
})
export class LmcModule { }
