import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleCreateComponent } from './create/role-create/role-create.component';
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TreeModule} from "primeng/tree";
import {CheckboxModule} from "primeng/checkbox";
import {AccordionModule} from "primeng/accordion";
import { RoleEditComponent } from './edit/role-edit/role-edit.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { RoleListComponent } from './list/role-list/role-list.component';
import {DatatableModule} from "../../modules/datatable/datatable.module";


@NgModule({
  declarations: [
    RoleCreateComponent,
    RoleEditComponent,
    RoleListComponent
  ],
    imports: [
        CommonModule,
        RoleRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        TreeModule,
        CheckboxModule,
        AccordionModule,
        ProgressSpinnerModule,
        DatatableModule
    ]
})
export class RoleModule { }
