import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { ImageListComponent } from './image/image-list/image-list.component';
import { ImageUploadComponent } from './image/image-upload/image-upload.component';
import {FileUploadModule} from "primeng/fileupload";
import {TranslateModule} from "@ngx-translate/core";
import {ImageModule} from "primeng/image";
import {RatingModule} from "primeng/rating";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TooltipModule} from "primeng/tooltip";
import {OverlayPanelModule} from "primeng/overlaypanel";


@NgModule({
    declarations: [
        ImageListComponent,
        ImageUploadComponent
    ],
    exports: [
        ImageListComponent
    ],
    imports: [
        CommonModule,
        MediaRoutingModule,
        FileUploadModule,
        TranslateModule,
        ImageModule,
        RatingModule,
        DataViewModule,
        DropdownModule,
        InputTextModule,
        FormsModule,
        RippleModule,
        ProgressSpinnerModule,
        TooltipModule,
        OverlayPanelModule
    ]
})
export class MediaModule { }
