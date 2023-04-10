import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponCreateComponent } from './create/coupon-create/coupon-create.component';
import { CouponEditComponent } from './edit/coupon-edit/coupon-edit.component';
import { CouponListComponent } from './list/coupon-list/coupon-list.component';
import {DatatableModule} from "../../modules/datatable/datatable.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    CouponCreateComponent,
    CouponEditComponent,
    CouponListComponent
  ],
    imports: [
        CommonModule,
        CouponRoutingModule,
        DatatableModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        TranslateModule,
        ButtonModule
    ]
})
export class CouponModule { }
