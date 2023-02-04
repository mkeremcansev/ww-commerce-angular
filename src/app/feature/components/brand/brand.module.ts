import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandEditComponent } from './edit/brand-edit/brand-edit.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
@NgModule({
  declarations: [
    BrandEditComponent
  ],
    imports: [
        CommonModule,
        BrandRoutingModule,
        InputTextModule,
        ButtonModule,
        TranslateModule,
        ReactiveFormsModule,
        ToastModule,
        ProgressSpinnerModule
    ]
})
export class BrandModule { }
