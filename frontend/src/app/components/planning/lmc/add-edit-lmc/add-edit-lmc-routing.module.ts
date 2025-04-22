import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEditLmcComponent } from './add-edit-lmc.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AddEditLmcComponent }
    ])],
    exports: [RouterModule]
})
export class AddEditLmcRoutingModule {

}
