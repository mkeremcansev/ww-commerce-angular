import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { ImageListComponent } from './image/image-list/image-list.component';
import { ImageUploadComponent } from './image/image-upload/image-upload.component';
import {FileUploadModule} from "primeng/fileupload";
import {TranslateModule} from "@ngx-translate/core";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    ImageListComponent,
    ImageUploadComponent
  ],
    imports: [
        CommonModule,
        MediaRoutingModule,
        FileUploadModule,
        TranslateModule,
        ToastModule
    ]
})
export class MediaModule { }
