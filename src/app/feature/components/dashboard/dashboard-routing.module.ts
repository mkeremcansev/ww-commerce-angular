import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {PermissionGuard} from "../../../guard/permission/permission.guard";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: DashboardComponent,
            canActivate: [PermissionGuard],
            data: {
                permission: {
                    group: 'Dashboard',
                    name: 'dashboard.index'
                }
            }
        },
        {
            path: 'kerem',
            component: DashboardComponent,
            canActivate: [PermissionGuard],
            data: {
                permission: {
                    group: 'Kerem',
                    name: 'kerem.index'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {
}
