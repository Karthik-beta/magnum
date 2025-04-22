import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLmcComponent } from './add-edit-lmc.component';
import { ButtonModule } from 'primeng/button';
import { AddEditLmcRoutingModule } from './add-edit-lmc-routing.module';


import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { InputDemoModule } from 'src/app/demo/components/uikit/input/inputdemo.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';


@NgModule({
    imports: [
        CommonModule,
        AddEditLmcRoutingModule,
        ButtonModule,

        SplitButtonModule,
        TableModule,
        InputDemoModule,
        InputTextModule,
        FormsModule,
        DropdownModule,
        CalendarModule,
        ToastModule,
        ConfirmDialogModule,
        MessagesModule,
    ],
    declarations: [AddEditLmcComponent],
    // exports: [AddEditLmcComponent]
})
export class AddEditLmcModule {

}
