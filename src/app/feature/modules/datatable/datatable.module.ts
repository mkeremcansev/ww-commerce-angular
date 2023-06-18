import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableRoutingModule } from './datatable-routing.module';
import { DatatableComponent } from './datatable/datatable.component';
import {TranslateModule} from "@ngx-translate/core";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {ChipsModule} from "primeng/chips";


@NgModule({
    declarations: [
        DatatableComponent
    ],
    exports: [
        DatatableComponent
    ],
    imports: [
        CommonModule,
        DatatableRoutingModule,
        TranslateModule,
        TableModule,
        ButtonModule,
        RippleModule,
        TableModule,
        ConfirmDialogModule,
        CheckboxModule,
        FormsModule,
        ToolbarModule,
        FileUploadModule,
        ChipsModule
    ]
})
export class DatatableModule { }
