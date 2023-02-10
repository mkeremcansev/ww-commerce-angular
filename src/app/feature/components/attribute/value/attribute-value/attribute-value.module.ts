import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeValueRoutingModule } from './attribute-value-routing.module';
import { AttributeValueCreateComponent } from './create/attribute-value-create/attribute-value-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {DropdownModule} from "primeng/dropdown";
import {MediaModule} from "../../../media/media.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { AttributeValueEditComponent } from './edit/attribute-value-edit/attribute-value-edit.component';
import { AttributeValueListComponent } from './list/attribute-value-list/attribute-value-list.component';
import {DatatableModule} from "../../../../modules/datatable/datatable.module";


@NgModule({
  declarations: [
    AttributeValueCreateComponent,
    AttributeValueEditComponent,
    AttributeValueListComponent
  ],
    imports: [
        CommonModule,
        AttributeValueRoutingModule,
        ReactiveFormsModule,
        TranslateModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        DropdownModule,
        MediaModule,
        ProgressSpinnerModule,
        DatatableModule
    ]
})
export class AttributeValueModule { }
