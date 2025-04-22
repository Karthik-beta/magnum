import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewLmcComponent } from './view-lmc.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ViewLmcComponent }
    ])],
    exports: [RouterModule]
})
export class ViewLmcRoutingModule { }
