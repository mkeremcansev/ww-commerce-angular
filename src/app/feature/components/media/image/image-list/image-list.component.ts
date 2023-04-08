import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "../service/image.service";
import {AlertService} from "../../../../../service/alert/alert.service";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent extends AlertService {
    @Input() public multiple: boolean = true
    @Input() public deselect: boolean = true;
    @Input() public deleteSelections: boolean = true;
    @Input() public upload: boolean = true;
    @Output() public selectedImagesEmitter = new EventEmitter<string[]>();
    @Input() public selectedImages: string[] = [];
    public images = [];
    public isSpinner: boolean = true;

    /**
     * @method constructor
     * @param imageService
     * @param messageService
     */
    constructor(
        public imageService: ImageService,
        public messageService: MessageService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {
        this.index();
    }

    /**
     * @method index
     */
    index() {
        this.imageService.index().subscribe((data: any) => {
            this.isSpinner = false;
            this.images = data;
        });
    }

    /**
     * @method selectAndDelete
     * @param path
     */
    selectAndDelete(path: string) {
        if (this.multiple) {
            this.selectedImages = this.selectedImages.includes(path)
                ? this.selectedImages.filter(item => item !== path)
                : [...this.selectedImages, path];
        } else {
            this.selectedImages.includes(path)
                ? this.selectedImages = []
                : this.selectedImages = [path];
        }
        this.selectedImagesEmitter.emit(this.selectedImages);
    }

    /**
     * @method deselectImages
     */
    deselectImages() {
        this.selectedImages = [];
    }

    reloadImages() {
        this.index();
    }

    /**
     * @method deleteSelectedImages
     */
    deleteSelectedImages() {
        this.imageService.destroy({paths: this.selectedImages}).subscribe((response: any) => {
                this.images = this.images.filter(item => !this.selectedImages.includes(item));
                this.selectedImages = [];
                this.messageService.add(this.success(response.message));
            },
            (error: any) => {
                this.messageService.add(this.error(error.error.message));
            });
    }
}
