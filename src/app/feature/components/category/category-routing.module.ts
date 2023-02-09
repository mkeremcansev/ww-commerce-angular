import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PermissionGuard} from "../../../guard/permission/permission.guard";
import {CategoryCreateComponent} from "./create/category-create/category-create.component";
import {CategoryEditComponent} from "./edit/category-edit/category-edit.component";
import {CategoryListComponent} from "./list/category-list/category-list.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
      {
          path: 'create',
          component: CategoryCreateComponent,
          canActivate: [PermissionGuard],
          data: {
              permission: {
                  group: 'Category',
                  name: 'category.create'
              }
          }
      },
      {
          path: 'list',
          component: CategoryListComponent,
          canActivate: [PermissionGuard],
          data: {
              permission: {
                  group: 'Category',
                  name: 'category.index'
              }
          }
      },
      {
          path: 'edit/:id',
          component: CategoryEditComponent,
          canActivate: [PermissionGuard],
          data: {
              permission: {
                  group: 'Category',
                  name: 'category.edit'
              }
          }
      }
  ])],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
