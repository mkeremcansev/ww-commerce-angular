import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrandRoutingModule} from './brand-routing.module';
import {BrandEditComponent} from './edit/brand-edit/brand-edit.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BrandListComponent} from "./list/brand-list/brand-list.component";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {ProgressBarModule} from "primeng/progressbar";
import {RippleModule} from "primeng/ripple";
import {DatatableModule} from "../../modules/datatable/datatable.module";
import {MediaModule} from "../media/media.module";
import {BrandCreateComponent} from "./create/brand-create/brand-create.component";

@NgModule({
    declarations: [
        BrandCreateComponent,
        BrandEditComponent,
        BrandListComponent
    ],
    imports: [
        CommonModule,
        BrandRoutingModule,
        InputTextModule,
        ButtonModule,
        TranslateModule,
        ReactiveFormsModule,
        ProgressSpinnerModule,
        TableModule,
        MultiSelectModule,
        FormsModule,
        DropdownModule,
        SliderModule,
        ProgressBarModule,
        RippleModule,
        DatatableModule,
        MediaModule,
    ]
})
export class BrandModule {
}
