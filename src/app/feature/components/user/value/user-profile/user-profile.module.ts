import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileEditComponent } from './edit/user-profile-edit/user-profile-edit.component';
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    UserProfileEditComponent
  ],
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ProgressSpinnerModule
    ]
})
export class UserProfileModule { }
