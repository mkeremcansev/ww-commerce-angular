import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCreateComponent} from "./create/product-create/product-create.component";

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
        }
    ])],
    exports: [RouterModule]
})
export class ProductRoutingModule {
}
