import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImageUploadComponent} from "./image/image-upload/image-upload.component";
import {PermissionGuard} from "../../../guard/permission/permission.guard";
import {ImageListComponent} from "./image/image-list/image-list.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'image/upload',
            component: ImageUploadComponent,
            canActivate: [PermissionGuard],
            data: {
                permission: {
                    group: 'Image',
                    name: 'image.upload'
                }
            }
        },
        {
            path: 'image/list',
            component: ImageListComponent,
            canActivate: [PermissionGuard],
            data: {
                permission: {
                    group: 'Image',
                    name: 'image.index'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class MediaRoutingModule {
}
