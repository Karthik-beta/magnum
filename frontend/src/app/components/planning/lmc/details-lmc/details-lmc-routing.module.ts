import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailsLmcComponent } from './details-lmc.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DetailsLmcComponent }
    ])],
    exports: [RouterModule]
})
export class DetailsLmcRoutingModule {

}
