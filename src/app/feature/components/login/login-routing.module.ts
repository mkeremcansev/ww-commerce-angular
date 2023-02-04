import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PermissionGuard} from "../../../guard/permission/permission.guard";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
      {
          path: 'auth',
          component: AuthComponent,
      },
  ])],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
