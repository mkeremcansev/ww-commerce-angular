import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductCreateComponent } from './create/product-create/product-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {InputTextModule} from "primeng/inputtext";
import {EditorModule} from "primeng/editor";
import {ToastModule} from "primeng/toast";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {TreeSelectModule} from "primeng/treeselect";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputSwitchModule} from "primeng/inputswitch";
import { ProductEditComponent } from './edit/product-edit/product-edit.component';
import {MediaModule} from "../media/media.module";


@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductEditComponent
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ReactiveFormsModule,
        ToastModule,
        ButtonModule,
        TranslateModule,
        InputTextModule,
        EditorModule,
        ToastModule,
        FormsModule,
        InputNumberModule,
        DropdownModule,
        MultiSelectModule,
        TreeSelectModule,
        ProgressSpinnerModule,
        InputSwitchModule,
        MediaModule
    ]
})
export class ProductModule { }
