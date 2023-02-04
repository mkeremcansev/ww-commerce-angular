import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PermissionGuard} from "../../../guard/permission/permission.guard";
import {BrandCreateComponent} from "./create/brand-create/brand-create.component";
import {BrandEditComponent} from "./edit/brand-edit/brand-edit.component";
import {BrandListComponent} from "./list/brand-list.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
      {
          path: 'create',
          component: BrandCreateComponent,
          canActivate: [PermissionGuard],
          data: {
              permission: {
                  group: 'Brand',
                  name: 'brand.create'
              }
          }
      },
      {
          path: 'list',
          component: BrandListComponent,
          canActivate: [PermissionGuard],
          data: {
              permission: {
                  group: 'Brand',
                  name: 'brand.index'
              }
          }
      },
      {
          path: 'edit/:id',
          component: BrandEditComponent,
          canActivate: [PermissionGuard],
          data: {
              permission: {
                  group: 'Brand',
                  name: 'brand.edit'
              }
          }
      }
  ])],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
