import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdPlanRoutingModule } from './prod-plan-routing.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        ProdPlanRoutingModule,
        ToastModule,
    ]
})
export class ProdPlanModule { }
