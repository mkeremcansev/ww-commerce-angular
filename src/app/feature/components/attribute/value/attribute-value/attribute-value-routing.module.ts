import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AttributeValueCreateComponent} from "./create/attribute-value-create/attribute-value-create.component";
import {AttributeValueEditComponent} from "./edit/attribute-value-edit/attribute-value-edit.component";
import {AttributeValueListComponent} from "./list/attribute-value-list/attribute-value-list.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'create',
            component: AttributeValueCreateComponent,
            data: {
                permission: {
                    group: 'AttributeValue',
                    name: 'attribute_value.create'
                }
            }
        },
        {
            path: 'list',
            component: AttributeValueListComponent,
            data: {
                permission: {
                    group: 'AttributeValue',
                    name: 'attribute_value.index'
                }
            }
        },
        {
            path: 'edit/:id',
            component: AttributeValueEditComponent,
            data: {
                permission: {
                    group: 'AttributeValue',
                    name: 'attribute_value.edit'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class AttributeValueRoutingModule {
}
