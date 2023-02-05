import {Component} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {AlertService} from "../../../../../service/alert/alert.service";

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    providers: [MessageService]
})
export class ImageUploadComponent extends AlertService {
    public uploadedFiles: any[] = [];
    public url: string = environment.api + '/image/upload';
    public isContent: boolean = true;

    constructor(
        public translateService: TranslateService,
        public messageService: MessageService
    ) {
        super();
    }

    ngOnInit() {

    }

    onUpload(event: { files: Blob[] }) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add(this.success(this.message()));
    }

    onSelect(){
        this.isContent = false;
    }

    onClear(){
        this.isContent = true;
    }

    message() {
        let successMessage = '';
        this.translateService.get('image.successMessage').subscribe((message: string) => {
            successMessage = message;
        });
        return successMessage;
    }
}
