import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductCreateComponent } from './create/product-create/product-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {InputTextModule} from "primeng/inputtext";
import {EditorModule} from "primeng/editor";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {TreeSelectModule} from "primeng/treeselect";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputSwitchModule} from "primeng/inputswitch";
import { ProductEditComponent } from './edit/product-edit/product-edit.component';
import {MediaModule} from "../media/media.module";
import { ProductListComponent } from './list/product-list/product-list.component';
import {DatatableModule} from "../../modules/datatable/datatable.module";
import {TabViewModule} from "primeng/tabview";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {DialogModule} from "primeng/dialog";


@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductEditComponent,
    ProductListComponent
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        TranslateModule,
        InputTextModule,
        EditorModule,
        FormsModule,
        InputNumberModule,
        DropdownModule,
        MultiSelectModule,
        TreeSelectModule,
        ProgressSpinnerModule,
        InputSwitchModule,
        MediaModule,
        DatatableModule,
        TabViewModule,
        EditorComponent,
        OverlayPanelModule,
        DialogModule
    ]
})
export class ProductModule { }
