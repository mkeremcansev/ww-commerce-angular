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

    /**
     * @constructor
     * @param translateService
     * @param messageService
     */
    constructor(
        public translateService: TranslateService,
        public messageService: MessageService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {

    }

    /**
     * @method onUpload
     * @param event
     */
    onUpload(event: { files: Blob[] }) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add(this.success(this.message()));
    }

    /**
     * @method onSelect
     */
    onSelect() {
        this.isContent = false;
    }

    /**
     * @method onClear
     */
    onClear() {
        this.isContent = true;
    }

    /**
     * @method message
     */
    message() {
        let successMessage = '';
        this.translateService.get('image.successMessage').subscribe((message: string) => {
            successMessage = message;
        });
        return successMessage;
    }
}
