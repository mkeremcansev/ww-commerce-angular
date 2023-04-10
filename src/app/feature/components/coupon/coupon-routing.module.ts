import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CouponCreateComponent} from "./create/coupon-create/coupon-create.component";
import {CouponListComponent} from "./list/coupon-list/coupon-list.component";
import {CouponEditComponent} from "./edit/coupon-edit/coupon-edit.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'create',
            component: CouponCreateComponent,
            data: {
                permission: {
                    group: 'Coupon',
                    name: 'coupon.create'
                }
            }
        },
        {
            path: 'list',
            component: CouponListComponent,
            data: {
                permission: {
                    group: 'Coupon',
                    name: 'coupon.list'
                }
            }
        },
        {
            path: 'edit/:id',
            component: CouponEditComponent,
            data: {
                permission: {
                    group: 'Coupon',
                    name: 'coupon.edit'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class CouponRoutingModule {
}
