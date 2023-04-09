import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileEditComponent} from "./edit/user-profile-edit/user-profile-edit.component";
import {PermissionGuard} from "../../../../../guard/permission/permission.guard";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: UserProfileEditComponent,
            canActivate: [PermissionGuard],
            data: {
                permission: {
                    group: 'User',
                    name: 'user.profile.edit'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
