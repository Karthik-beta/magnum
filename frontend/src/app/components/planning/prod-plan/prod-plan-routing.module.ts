import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: 'add_edit', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },

    ])],
    exports: [RouterModule]
})
export class ProdPlanRoutingModule { }
