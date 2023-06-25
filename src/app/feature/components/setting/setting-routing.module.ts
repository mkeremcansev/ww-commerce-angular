import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingUpdateComponent} from "./update/setting-update/setting-update.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
      {
          path: 'update',
          component: SettingUpdateComponent,
          data: {
              permission: {
                  group: 'Setting',
                  name: 'setting.update'
              }
          }
      },
  ])],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
