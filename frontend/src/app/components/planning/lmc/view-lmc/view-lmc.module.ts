import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ViewLmcComponent } from './view-lmc.component';
import { ViewLmcRoutingModule } from './view-lmc-routing.module';
import { DetailsLmcComponent } from '../details-lmc/details-lmc.component';


import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { InputDemoModule } from 'src/app/demo/components/uikit/input/inputdemo.module';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';




@NgModule({
    imports: [
        CommonModule,
        ViewLmcRoutingModule,
        ButtonModule,
        SplitButtonModule,
        TableModule,
        InputDemoModule,
        InputTextModule,
        DialogModule,
    ],
    declarations: [
        ViewLmcComponent,
    ],
    // exports: [ViewLmcComponent]
})
export class ViewLmcModule { }
