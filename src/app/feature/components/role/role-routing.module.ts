import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleCreateComponent} from "./create/role-create/role-create.component";

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
        }
    ])],
    exports: [RouterModule]
})
export class RoleRoutingModule {
}
