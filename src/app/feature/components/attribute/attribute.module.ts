import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributeCreateComponent } from './create/attribute-create/attribute-create.component';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { AttributeEditComponent } from './edit/attribute-edit/attribute-edit.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { AttributeListComponent } from './list/attribute-list/attribute-list.component';
import {DatatableModule} from "../../modules/datatable/datatable.module";


@NgModule({
  declarations: [
    AttributeCreateComponent,
    AttributeEditComponent,
    AttributeListComponent
  ],
    imports: [
        CommonModule,
        AttributeRoutingModule,
        TranslateModule,
        ButtonModule,
        ReactiveFormsModule,
        InputTextModule,
        ProgressSpinnerModule,
        DatatableModule
    ]
})
export class AttributeModule { }
