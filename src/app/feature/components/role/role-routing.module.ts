import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleCreateComponent} from "./create/role-create/role-create.component";
import {RoleEditComponent} from "./edit/role-edit/role-edit.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'create',
            component: RoleCreateComponent,
            data: {
                permission: {
                    group: 'Role',
                    name: 'role.create'
                }
            }
        },
        {
            path: 'edit/:id',
            component: RoleEditComponent,
            data: {
                permission: {
                    group: 'Role',
                    name: 'role.edit'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class RoleRoutingModule {
}
