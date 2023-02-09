import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AttributeCreateComponent} from "./create/attribute-create/attribute-create.component";
import {AttributeEditComponent} from "./edit/attribute-edit/attribute-edit.component";
import {AttributeListComponent} from "./list/attribute-list/attribute-list.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
      {
            path: 'create',
            component: AttributeCreateComponent,
            data: {
                permission: {
                    group: 'Attribute',
                    name: 'attribute.create'
                }
            }
      },
      {
          path: 'list',
          component: AttributeListComponent,
          data: {
              permission: {
                  group: 'Attribute',
                  name: 'attribute.index'
              }
          }
      },
      {
            path: 'edit/:id',
            component: AttributeEditComponent,
            data: {
                permission: {
                    group: 'Attribute',
                    name: 'attribute.edit'
                }
            }
      }
  ])],
  exports: [RouterModule]
})
export class AttributeRoutingModule { }
