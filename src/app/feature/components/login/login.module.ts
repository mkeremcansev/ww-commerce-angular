import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { AuthComponent } from './auth/auth.component';
import {ToastModule} from "primeng/toast";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    AuthComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ToastModule,
        ReactiveFormsModule,
        ButtonModule,
        TranslateModule,
        InputTextModule
    ]
})
export class LoginModule { }
