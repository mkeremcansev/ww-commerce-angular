import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './list/user-list/user-list.component';
import {DatatableModule} from "../../modules/datatable/datatable.module";
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";


@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        DatatableModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        InputTextModule,
        TranslateModule,
        ButtonModule,
        MultiSelectModule
    ]
})
export class UserModule { }
