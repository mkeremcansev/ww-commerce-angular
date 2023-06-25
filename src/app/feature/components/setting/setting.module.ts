import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingUpdateComponent } from './update/setting-update/setting-update.component';
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {MediaModule} from "../media/media.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    SettingUpdateComponent
  ],
    imports: [
        CommonModule,
        SettingRoutingModule,
        DropdownModule,
        ReactiveFormsModule,
        TranslateModule,
        ButtonModule,
        InputTextModule,
        MediaModule,
        InputTextareaModule,
        ProgressSpinnerModule
    ]
})
export class SettingModule { }
