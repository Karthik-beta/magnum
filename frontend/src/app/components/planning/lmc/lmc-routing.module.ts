import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: 'view_lmc', loadChildren: () => import('./view-lmc/view-lmc.module').then(m => m.ViewLmcModule) },
        { path: 'view_lmc', data: { breadcrumb: 'view_lmc' }, loadChildren: () => import('./view-lmc/view-lmc.module').then(m => m.ViewLmcModule) },
        { path: 'add_edit_lmc', data: { breadcrumb: 'add_edit_lmc' }, loadChildren: () => import('./add-edit-lmc/add-edit-lmc.module').then(m => m.AddEditLmcModule) },
        // { path: 'add_edit_lmc', loadChildren: () => import('./add-edit-lmc/add-edit-lmc.module').then(m => m.AddEditLmcModule) },
        { path: 'details_lmc_table', data: { breadcrumb: 'details_lmc_table' }, loadChildren: () => import('./details-lmc/details-lmc.module').then(m => m.DetailsLmcModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class LmcRoutingModule { }
