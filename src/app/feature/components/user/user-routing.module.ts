import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from "../../../guard/permission/permission.guard";
import {UserListComponent} from "./list/user-list/user-list.component";
import {UserEditComponent} from "./edit/user-edit/user-edit.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'list',
            component: UserListComponent,
            canActivate: [PermissionGuard],
            data: {
                permission: {
                    group: 'User',
                    name: 'user.index'
                }
            }
        },
        {
            path: 'edit/:id',
            component: UserEditComponent,
            canActivate: [PermissionGuard],
            data: {
                permission: {
                    group: 'User',
                    name: 'user.edit'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
