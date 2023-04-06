import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCreateComponent} from "./create/product-create/product-create.component";
import {ProductEditComponent} from "./edit/product-edit/product-edit.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'create',
            component: ProductCreateComponent,
            data: {
                permission: {
                    group: 'Product',
                    name: 'product.create'
                }
            }
        },
        {
            path: 'edit/:id',
            component: ProductEditComponent,
            data: {
                permission: {
                    group: 'Product',
                    name: 'product.edit'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class ProductRoutingModule {
}
